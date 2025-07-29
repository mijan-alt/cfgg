'use client'

import React from 'react'
import { useState, useMemo, useActionState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  BookOpen,
  Award,
  Globe,
  Vote,
  Calendar,
  Star,
  Clock,
  Gift,
  Zap,
  Heart,
  MessageCircle,
  TrendingUp,
  UserCheck,
} from 'lucide-react'

// Import the Nigerian states and LGAs data
import nigerianStatesAndLGAs from '@/lib/nigerian-states-lgas.json'
import { addMember } from '@/app/(frontend)/serverActions/membership/action'

export default function MembershipForm() {
  const primaryColor = '#AF7C0F'
  const secondaryColor = '#331401'

  const MEMBERSHIP_FEE = 200 // Example fee in NGN

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedLGA, setSelectedLGA] = useState<string>('')

  // useActionState hook for form submission
  const [state, formAction, pending] = useActionState(addMember, null)

  const states = useMemo(() => Object.keys(nigerianStatesAndLGAs), [])
  const lgas = useMemo(() => {
    return selectedState
      ? nigerianStatesAndLGAs[selectedState as keyof typeof nigerianStatesAndLGAs] || []
      : []
  }, [selectedState])

  // Member benefits data
  const memberBenefits = [
    {
      icon: BookOpen,
      title: 'Exclusive Training Programs',
      description: 'Access to advanced civic education workshops and leadership training sessions',
    },
    {
      icon: Users,
      title: 'Network with Leaders',
      description: 'Connect with policy makers, activists, and change-makers across Nigeria',
    },
    {
      icon: Award,
      title: 'Certification Programs',
      description: 'Earn certificates in governance, policy analysis, and civic leadership',
    },
    {
      icon: Vote,
      title: 'Election Observer Priority',
      description: 'Priority selection for election monitoring and governance oversight roles',
    },
    {
      icon: Globe,
      title: 'Policy Research Access',
      description: 'First access to CfGG research reports and policy recommendations',
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Invitations to member-only forums, town halls, and networking events',
    },
  ]

  // Testimonials
  const testimonials = [
    {
      name: 'Adebayo Okonkwo',
      role: 'Youth Leader, Lagos',
      content:
        'CfGG membership opened doors I never imagined. The training programs are world-class!',
      rating: 5,
    },
    {
      name: 'Fatima Ibrahim',
      role: 'Civil Society Activist',
      content: 'Being part of CfGG has amplified my voice in governance. Worth every kobo!',
      rating: 5,
    },
    {
      name: 'Dr. Chidi Eze',
      role: 'Policy Researcher',
      content:
        'The network and resources available to members are invaluable for anyone serious about change.',
      rating: 5,
    },
  ]

  // Progress toward membership goal (mock data)
  const membershipProgress = {
    current: 847,
    target: 1000,
    percentage: 84.7,
  }

  // Reset form fields after successful submission
  React.useEffect(() => {
    if (state?.type === 'success') {
      setFullName('')
      setEmail('')
      setSelectedState('')
      setSelectedLGA('')
    }
  }, [state])

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Value Proposition Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Badge variant="outline" className="border-green-500 text-green-600">
            <TrendingUp size={14} className="mr-1" />
            847 Members Joined
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join the Movement for Change</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Become part of Nigeria`s most active civic community. Your membership directly supports
          democratic participation and good governance initiatives across the country.
        </p>

        {/* Progress toward membership goal */}
        <Card className="max-w-md mx-auto mb-8">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Members this month</span>
              <span className="text-sm text-gray-600">
                {membershipProgress.current}/{membershipProgress.target}
              </span>
            </div>
            <Progress value={membershipProgress.percentage} className="h-2 mb-2" />
            <p className="text-xs text-gray-500 text-center">
              Join {membershipProgress.target - membershipProgress.current} others to reach our
              community goal!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notice Alert */}
      <Alert className="mb-8 bg-yellow-50 border-yellow-200 text-yellow-800">
        <AlertTriangle size={20} className="text-yellow-600" />
        <AlertTitle>Test Mode Active</AlertTitle>
        <AlertDescription>
          This is a demonstration. No real payments will be processed.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center bg-gradient-to-r from-primary to-[#D4A94A] text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <Shield size={28} />
                Become a CfGG Member
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Join 800+ active citizens championing good governance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form action={formAction} className="space-y-6">
                {/* Hidden input for membership fee */}
                <input type="hidden" name="membershipFee" value={MEMBERSHIP_FEE} />

                {/* Membership Value Highlight */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">One-Time Investment</h3>
                      <p className="text-gray-600">Lifetime access to all member benefits</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        ₦{MEMBERSHIP_FEE.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 line-through">₦8,000</div>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <UserCheck className="text-primary" size={20} />
                    <Label className="text-xl font-semibold">Personal Information</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="text-primary" size={20} />
                    <Label className="text-xl font-semibold">Location Information</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State of Residence *</Label>
                      <Select
                        value={selectedState}
                        onValueChange={(value) => {
                          setSelectedState(value)
                          setSelectedLGA('')
                        }}
                        name="state"
                        required
                      >
                        <SelectTrigger id="state" className="h-12">
                          <SelectValue placeholder="Select your State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lga">Local Government Area *</Label>
                      <Select
                        value={selectedLGA}
                        onValueChange={setSelectedLGA}
                        disabled={!selectedState}
                        name="lga"
                        required
                      >
                        <SelectTrigger id="lga" className="h-12">
                          <SelectValue placeholder="Select your LGA" />
                        </SelectTrigger>
                        <SelectContent>
                          {lgas.length > 0
                            ? lgas.map((lga) => (
                                <SelectItem key={lga} value={lga}>
                                  {lga}
                                </SelectItem>
                              ))
                            : null}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Message display */}
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
                  className="w-full py-6 text-lg font-bold flex items-center justify-center space-x-3 bg-gradient-to-r from-primary to-[#D4A94A] hover:from-[#8B6209] hover:to-primary transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
                  disabled={pending}
                >
                  <Shield size={20} />
                  <span>
                    {pending
                      ? 'Processing...'
                      : `Secure My Membership - ₦${MEMBERSHIP_FEE.toLocaleString()}`}
                  </span>
                  <ArrowRight size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Benefits and Social Proof */}
        <div className="lg:col-span-1 space-y-6">
          {/* Member Benefits */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Award className="text-primary" size={24} />
                Member Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {memberBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <benefit.icon className="text-primary mt-1" size={18} />
                  <div>
                    <h4 className="font-semibold text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Proof - Testimonials */}
          {/* <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <MessageCircle className="text-primary" size={24} />
                What Members Say
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" size={14} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">"{testimonial.content}"</p>
                  <div className="text-xs text-gray-500">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div>{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card> */}

          {/* Trust Indicators */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Heart className="text-primary" size={24} />
                Why Members Trust Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={16} />
                </div>
                <span className="text-sm">Non-partisan approach</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="text-blue-600" size={16} />
                </div>
                <span className="text-sm">Transparent operations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="text-purple-600" size={16} />
                </div>
                <span className="text-sm">Recognized impact</span>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-xs text-gray-600">Member satisfaction rate</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
