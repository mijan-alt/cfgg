"use server"

import { getPayload } from "payload"
import config from '@/payload.config'
 
type MembershipFormState = {
  type: "success" | "error"
  text: string
} | null

export async function addMember(prevState: MembershipFormState, formData: FormData): Promise<MembershipFormState> {
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const state = formData.get("state") as string
  const lga = formData.get("lga") as string
  const membershipFee = Number.parseFloat(formData.get("membershipFee") as string) // Get fee from form data

console.log(fullName, email, state, lga, membershipFee)  
console.log(typeof membershipFee)
  if (!fullName || !email || !state || !lga || isNaN(membershipFee) || membershipFee <= 0) {
    return { type: "error", text: "Please fill in all required fields and ensure the fee is valid." }
  }

 

 try {
const payload = await getPayload({ config })
    
    const members = await payload.create({
      collection: 'members',
      data: {
        full_name: fullName,
        email: email,
        state: state,
        lga: lga,
        membership_fee: membershipFee,
      },
    })
  
    return { type: "success", text: `Congratulations, ${fullName}! You are now a member of CfGG.` }
  } catch (error:any) {
   console.error("PayloadCMS creation error:", error)
    return { 
      type: "error", 
      text: `Failed to add memeber: ${error.message || 'Unknown error occurred'}` 
    }
  }
}
