
import type { CollectionConfig } from 'payload'

const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'full_name',
  },
  fields: [
    {
      name: 'full_name',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      required: true,
    },
    {
      name: 'lga',
      label: 'Local Government Area',
      type: 'text',
      required: true,
    },
    {
      name: 'membership_fee',
      label: 'Membership Fee',
      type: 'number',
      required: true,
      min: 0,
    },
  ],
};

export default Members;
