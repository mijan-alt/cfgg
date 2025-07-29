"use server"

import { getPayload } from 'payload'
import config from '@/payload.config' // Adjust path to your payload config

// Define the expected state type for useActionState
type DonationFormState = {
  type: "success" | "error"
  text: string
} | null

export async function addDonation(prevState: DonationFormState, formData: FormData): Promise<DonationFormState> {
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const amountStr = formData.get("amount") as string
  const amount = Number.parseFloat(amountStr)
  const paystackReference = formData.get("paystackReference") as string | null 
  const paymentMethod = formData.get("paymentMethod") as string 
  const program = formData.get("program") as string
  const donationType = formData.get("donationType") as string
  const stayInformed = formData.get("stayInformed") === "true"
  const volunteerInterest = formData.get("volunteerInterest") === "true"

  if (!fullName || !email || isNaN(amount) || amount <= 0) {
    return { type: "error", text: "Please fill in all required fields and enter a valid donation amount." }
  }

  let paymentStatus = "pending" 

  if (paymentMethod === "paystack" && paystackReference) {
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
    if (!PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not set in environment variables.")
      return { type: "error", text: "Payment gateway not configured. Please contact support." }
    }

    try {
      const verificationResponse = await fetch(`https://api.paystack.co/transaction/verify/${paystackReference}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      })

      const verificationData = await verificationResponse.json()

      if (verificationData.status && verificationData.data.status === "success") {
        // Verify amount matches to prevent tampering
        const verifiedAmountInKobo = verificationData.data.amount
        const expectedAmountInKobo = amount * 100

        if (verifiedAmountInKobo === expectedAmountInKobo) {
          paymentStatus = "completed"
        } else {
          paymentStatus = "failed"
          console.warn(
            `Amount mismatch for reference ${paystackReference}: Expected ${expectedAmountInKobo}, Got ${verifiedAmountInKobo}`,
          )
          return { type: "error", text: "Payment verification failed: Amount mismatch." }
        }
      } else {
        paymentStatus = "failed"
        console.error("Paystack verification failed:", verificationData)
        return { type: "error", text: `Payment verification failed: ${verificationData.message || "Unknown error"}` }
      }
    } catch (error) {
      console.error("Error verifying Paystack transaction:", error)
      return { type: "error", text: "An error occurred during payment verification." }
    }
  } else if (paymentMethod === "offline") {
    paymentStatus = "pending" 
  } else if (paymentMethod === "test") {
    paymentStatus = "completed" 
  }

  try {
    // Get payload instance properly initialized with config
    const payload = await getPayload({ config })
    
    // Submit to PayloadCMS
    const donation = await payload.create({
      collection: 'donations',
      data: {
        donorName: fullName,
        email: email,
        amount: amount,
        currency: 'NGN', // Assuming NGN based on your original code
        donationType: donationType,
        paymentStatus: paymentStatus,
        paymentMethod: paymentMethod === 'paystack' ? 'paystack' : paymentMethod,
        transactionId: paystackReference,
        program: program,
        stayInformed: stayInformed, 
        volunteerInterest: volunteerInterest, 
        donatedAt: new Date().toISOString(),
      },
    })

    console.log("New donation added to PayloadCMS:", donation)
    
    // Send success response based on payment status
    if (paymentStatus === "completed") {
      return { 
        type: "success", 
        text: `Thank you for your generous donation of NGN ${amount.toLocaleString()}! Your donation ID is ${donation.id}.` 
      }
    } else if (paymentStatus === "pending") {
      return { 
        type: "success", 
        text: "Thank you! Your donation request has been received and is being processed." 
      }
    } else {
      return { 
        type: "success", 
        text: "Test donation processed successfully!" 
      }
    }
  } catch (error: any) {
    console.error("PayloadCMS creation error:", error)
    return { 
      type: "error", 
      text: `Failed to process donation: ${error.message || 'Unknown error occurred'}` 
    }
  }
}