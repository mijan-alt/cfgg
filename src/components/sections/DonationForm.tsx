'use client'

import React from 'react'
import { useState, useActionState, useTransition, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  MapPin,
  Users,
  BookOpen,
  Vote,
  Search,
  Heart,
  Globe,
  Repeat,
} from 'lucide-react'
import { addDonation } from '@/app/(frontend)/serverActions/donation/action'
import { usePaystackPayment } from 'react-paystack'

export default function DonationForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<string>('5000')
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('test')
  const [donationType, setDonationType] = useState('one-time')
  const [selectedProgram, setSelectedProgram] = useState('general')
  const [stayInformed, setStayInformed] = useState(false)
  const [volunteerInterest, setVolunteerInterest] = useState(false)
  
  // ✅ Add state to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)
  const [publicKey, setPublicKey] = useState<string>('')

  // Add useTransition for handling async calls outside form submission
  const [isPendingTransition, startTransition] = useTransition()

  const primaryColor = '#AF7C0F'
  const secondaryColor = '#331401'

  const [state, formAction, isPending] = useActionState(addDonation, null)

  // ✅ Use useEffect to safely access environment variables and window object
  useEffect(() => {
    setIsMounted(true)
    setPublicKey(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '')
  }, [])

  const programs = [
    {
      id: 'civic-education',
      name: 'Civic Education',
      icon: BookOpen,
      description: 'Educate citizens on rights and electoral processes',
      impact: '₦5,000 sponsors one youth in civic workshop',
    },
    {
      id: 'youth-empowerment',
      name: 'Youth Leadership',
      icon: Users,
      description: 'Mentor young Nigerians for political inclusion',
      impact: '₦10,000 supports one month of mentorship program',
    },
    {
      id: 'election-monitoring',
      name: 'Electoral Monitoring',
      icon: Vote,
      description: 'Ensure transparent and fair elections',
      impact: '₦15,000 trains one election observer',
    },
    {
      id: 'policy-research',
      name: 'Policy Research',
      icon: Search,
      description: 'Research governance and anti-corruption policies',
      impact: '₦20,000 funds one policy research report',
    },
    {
      id: 'general',
      name: 'Where Needed Most',
      icon: Heart,
      description: 'Support all CfGG programs flexibly',
      impact: 'Maximum impact across all initiatives',
    },
  ]

  const handleAmountChange = (amount: string) => {
    setSelectedAmount(amount)
    if (amount !== 'Custom Amount') {
      setCustomAmount('')
    }
  }

  const getDonationAmount = () => {
    if (selectedAmount === 'Custom Amount') {
      return Number.parseFloat(customAmount)
    }
    return Number.parseFloat(selectedAmount || '0')
  }

  const selectedProgramData = programs.find((p) => p.id === selectedProgram)

  React.useEffect(() => {
    if (state?.type === 'success') {
      setFullName('')
      setEmail('')
      setSelectedAmount('5000')
      setCustomAmount('')
      setPaymentMethod('test')
      setSelectedProgram('general')
      setStayInformed(false)
      setVolunteerInterest(false)
    }
  }, [state])

  // ✅ Only create paystack config if component is mounted and we have publicKey
  const paystackConfig = isMounted ? {
    reference: new Date().getTime().toString(),
    email: email,
    amount: getDonationAmount() * 100,
    publicKey,
    currency: 'NGN' as const,
    metadata: {
      custom_fields: [
        {
          display_name: 'Full Name',
          variable_name: 'full_name',
          value: fullName,
        },
        {
          display_name: 'Selected Program',
          variable_name: 'selected_program',
          value: selectedProgram,
        },
        {
          display_name: 'Donation Type',
          variable_name: 'donation_type',
          value: donationType,
        },
        {
          display_name: 'Stay Informed',
          variable_name: 'stay_informed',
          value: stayInformed ? 'Yes' : 'No',
        },
        {
          display_name: 'Volunteer Interest',
          variable_name: 'volunteer_interest',
          value: volunteerInterest ? 'Yes' : 'No',
        },
      ],
    },
  } : null

  // ✅ Only initialize Paystack hook if we have valid config
  const initializePayment = usePaystackPayment(paystackConfig || {
    reference: '',
    email: '',
    amount: 0,
    publicKey: '',
    currency: 'NGN' as const,
  })

  const onSuccess = (response: any) => {
    console.log('Paystack Success:', response)

    if (!response || !response.reference) {
      console.error('No reference received from Paystack')
      return
    }

    const formData = new FormData()
    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('amount', getDonationAmount().toString())
    formData.append('paystackReference', response.reference)
    formData.append('paymentMethod', 'paystack')
    formData.append('program', selectedProgram)
    formData.append('donationType', donationType)
    formData.append('stayInformed', stayInformed ? 'true' : 'false')
    formData.append('volunteerInterest', volunteerInterest ? 'true' : 'false')

    // Use startTransition to properly handle the async call
    startTransition(() => {
      formAction(formData)
    })
  }

  const onClose = () => {
    console.log('Paystack Closed.')
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const amountToDonate = getDonationAmount()
    if (!fullName || !email || amountToDonate <= 0 || isNaN(amountToDonate)) {
      // For validation errors, we can call formAction directly since it's in form submission
      return formAction(new FormData(event.currentTarget))
    }

    if (paymentMethod === 'paystack') {
      if (!publicKey) {
        alert('Paystack public key is not configured. Please contact support.')
        return
      }

      try {
        initializePayment({
          onSuccess,
          onClose,
        })
      } catch (error) {
        console.error('Paystack initialization error:', error)
        alert('Payment initialization failed. Please try again.')
      }
    } else {
      // For 'test' and 'offline' methods, proceed with direct server action submission
      formAction(new FormData(event.currentTarget))
    }
  }

  // Combine both pending states for UI
  const isFormPending = isPending || isPendingTransition

  // ✅ Show loading state while component is mounting
  if (!isMounted) {
    return (
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Mission Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Democracy in Action</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Champion for Good Governance (CfGG) is empowering Nigerian youth and citizens to build an
          accountable, transparent, and inclusive society. Your donation directly supports civic
          education, electoral integrity, and democratic participation.
        </p>
      </div>

      {/* Test Mode Alert */}
      <Alert className="mb-8 bg-yellow-50 border-yellow-200 text-yellow-800">
        <AlertTriangle size={20} className="text-yellow-600" />
        <AlertTitle>Test Mode Active</AlertTitle>
        <AlertDescription>
          This is a demonstration. No real payments will be processed.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Donation Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Globe className="text-primary" size={24} />
                Make Your Impact
              </CardTitle>
              <CardDescription>
                Choose how you want to support good governance and democratic participation in
                Nigeria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Hidden inputs for server action */}
                <input type="hidden" name="amount" value={getDonationAmount()} />
                <input type="hidden" name="program" value={selectedProgram} />
                <input type="hidden" name="donationType" value={donationType} />
                <input type="hidden" name="stayInformed" value={stayInformed ? 'true' : 'false'} />
                <input
                  type="hidden"
                  name="volunteerInterest"
                  value={volunteerInterest ? 'true' : 'false'}
                />

                {/* Donation Type */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Donation Type</Label>
                  <Tabs value={donationType} onValueChange={setDonationType}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="one-time">One-Time</TabsTrigger>
                      <TabsTrigger value="monthly" className="flex items-center gap-2">
                        <Repeat size={16} />
                        Monthly
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Program Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Choose Your Program</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programs.map((program) => {
                      const Icon = program.icon
                      return (
                        <div
                          key={program.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedProgram === program.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedProgram(program.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Icon
                              size={20}
                              className={
                                selectedProgram === program.id ? 'text-primary' : 'text-gray-600'
                              }
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{program.name}</h3>
                              <p className="text-xs text-gray-600 mt-1">{program.description}</p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {program.impact}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Donation Amount {donationType === 'monthly' && '(Monthly)'}
                  </Label>
                  <div className="">
                    <Input
                      type="number"
                      value={
                        selectedAmount === 'Custom Amount' ? customAmount : selectedAmount || ''
                      }
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount('Custom Amount')
                      }}
                      className="w-full text-right text-2xl font-bold bg-transparent border border-yellow-800 focus:outline-none"
                      style={{ color: 'black' }}
                      min="1"
                      step="any"
                      name="amount"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['2500', '5000', '10000', '25000'].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        className={`py-3 rounded-md font-semibold ${
                          selectedAmount === amount
                            ? 'text-white'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                        style={selectedAmount === amount ? { backgroundColor: primaryColor } : {}}
                        onClick={() => handleAmountChange(amount)}
                      >
                        ₦{Number.parseInt(amount).toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full py-3 rounded-md font-semibold ${
                      selectedAmount === 'Custom Amount'
                        ? 'text-white'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                    style={
                      selectedAmount === 'Custom Amount' ? { backgroundColor: primaryColor } : {}
                    }
                    onClick={() => handleAmountChange('Custom Amount')}
                  >
                    Custom Amount
                  </Button>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Personal Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailAddress">Email Address *</Label>
                      <Input
                        id="emailAddress"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="test" id="test-donation" />
                      <Label htmlFor="test-donation" className="flex-1">
                        Test Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="offline" id="offline-donation" />
                      <Label htmlFor="offline-donation" className="flex-1">
                        Bank Transfer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="paystack" id="paystack-donation" />
                      <Label htmlFor="paystack-donation" className="flex-1">
                        Paystack
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Stay Connected</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={stayInformed}
                        onCheckedChange={(checked) => setStayInformed(checked as boolean)}
                        name="stayInformed"
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Send me updates about CfGGs impact and programs
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="volunteer"
                        checked={volunteerInterest}
                        onCheckedChange={(checked) => setVolunteerInterest(checked as boolean)}
                        name="volunteerInterest"
                      />
                      <Label htmlFor="volunteer" className="text-sm">
                        I am interested in volunteering with CfGG
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Status Message */}
                {state && (
                  <Alert
                    className={
                      state.type === 'success'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }
                  >
                    {state.type === 'success' ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <AlertTriangle className="text-red-600" size={20} />
                    )}
                    <AlertDescription
                      className={state.type === 'success' ? 'text-green-700' : 'text-red-700'}
                    >
                      {state.text}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
                  style={{ backgroundColor: primaryColor, color: 'white' }}
                  disabled={isFormPending}
                >
                  <span>
                    {isFormPending
                      ? 'Processing...'
                      : paymentMethod === 'monthly'
                        ? 'Start Monthly Donation'
                        : paymentMethod === 'paystack'
                          ? 'Pay with Paystack'
                          : 'Donate Now'}
                  </span>
                  <ArrowRight size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Impact & Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Program Impact */}
          {selectedProgramData && (
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <selectedProgramData.icon className="text-primary" size={24} />
                  <CardTitle className="text-lg">{selectedProgramData.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{selectedProgramData.description}</p>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    Your Impact: {selectedProgramData.impact}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Impact Stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Our Recent Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">2,500+</div>
                  <div className="text-xs text-gray-600">Youth Trained</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-xs text-gray-600">Communities Reached</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-gray-600">Elections Monitored</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-xs text-gray-600">Policy Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About CfGG */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">About CfGG</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Champion for Good Governance is a non-partisan civic organization dedicated to
                promoting democratic values and youth participation in governance across Nigeria and
                Africa.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Non-partisan approach</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Youth-focused programs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Transparent operations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="text-sm text-gray-600">info@championforgoodgovernance.org</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}