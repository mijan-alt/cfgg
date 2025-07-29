'use client'

import React from 'react'
import { usePaystackPayment } from 'react-paystack'

interface PaystackPaymentProps {
  amount: number
  email: string
  fullName: string
  selectedProgram: string
  donationType: string
  stayInformed: boolean
  volunteerInterest: boolean
  onSuccess: (reference: string) => void
  onClose: () => void
  children: React.ReactNode
}

export default function PaystackPayment({
  amount,
  email,
  fullName,
  selectedProgram,
  donationType,
  stayInformed,
  volunteerInterest,
  onSuccess,
  onClose,
  children,
}: PaystackPaymentProps) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100, // Convert to kobo
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
  }

  const initializePayment = usePaystackPayment(paystackConfig)

  const handlePayment = () => {
    if (!publicKey) {
      alert('Paystack public key is not configured. Please contact support.')
      return
    }

    try {
      initializePayment({
        onSuccess: (response: any) => {
          console.log('Paystack Success:', response)
          if (response?.reference) {
            onSuccess(response.reference)
          }
        },
        onClose,
      })
    } catch (error) {
      console.error('Paystack initialization error:', error)
      alert('Payment initialization failed. Please try again.')
    }
  }

  return (
    <div onClick={handlePayment}>
      {children}
    </div>
  )
}