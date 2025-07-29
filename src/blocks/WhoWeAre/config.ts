import type { Block } from 'payload'

export const WhoWeAreBlock: Block = {
  slug: 'whoWeAre',
  interfaceName: 'WhoWeAreBlock',
  labels: {
    singular: 'Who We Are',
    plural: 'Who We Are Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Who we are',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Image',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: false,
    },
    {
      name: 'organizationName',
      type: 'text',
      label: 'Organization Name',
      defaultValue: 'Champion for Good Governance (CfGG)',
      required: true,
    },
    {
      name: 'organizationDescription',
      type: 'textarea',
      label: 'Organization Description',
      defaultValue:
        'is a non-partisan platform committed to fostering good governance, democratic participation, and civic awareness in Nigeria and across Africa.',
      required: true,
    },
    {
      name: 'empowermentText',
      type: 'textarea',
      label: 'Empowerment Text',
      defaultValue:
        'We empower citizens—especially the youth and marginalized groups—to take part in building an accountable, transparent, and inclusive society.',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Feature Description',
          required: true,
        },
      ],
    },
  ],
}
