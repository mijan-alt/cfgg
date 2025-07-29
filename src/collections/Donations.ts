
import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'donorName',
    defaultColumns: ['donorName', 'amount', 'program', 'paymentStatus', 'donatedAt'],
    group: 'Fundraising',
  },
  access: {
    create: () => true, 
    read: () => true,
    update: () => true,
    delete: () => true,
   
  },
  fields: [
    {
      name: 'donorName',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        readOnly: true,
        step: 0.01,
      },
    },
    {
      name: 'currency',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'program',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'donationType',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'paymentStatus',
      type: 'text',
      required: true,
      admin: {
        readOnly: true, // Allow admins to update payment status
      },
    },
    {
      name: 'paymentMethod',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'transactionId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Paystack reference or other payment processor transaction ID',
      },
    },
    {
      name: 'stayInformed',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Donor wants to stay informed about our work',
      },
    },
    {
      name: 'volunteerInterest',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        description: 'Donor is interested in volunteering',
      },
    },
    {
      name: 'donatedAt',
      type: 'date',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'IP address of the donor (for fraud prevention)',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Browser/device information',
      },
    },
 
    {
      name: 'isAnonymous',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as anonymous donation for public displays',
      },
    },
    {
      name: 'taxDeductible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this donation is tax deductible',
      },
    },
    {
      name: 'receiptSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Receipt has been sent to donor',
      },
    },
    {
      name: 'thankYouSent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Thank you email has been sent',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this donation',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-set donatedAt if not provided
        if (operation === 'create' && !data.donatedAt) {
          data.donatedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        // Send notifications after successful creation
        if (operation === 'create') {
          console.log(`New donation created: ${doc.id}`)
        }
      },
    ],
  },
}