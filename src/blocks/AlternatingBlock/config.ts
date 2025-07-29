import type { Block } from 'payload'


export const missionAndVisionBlock: Block = {
  slug: 'missionAndVision',
  interfaceName:"missionAndVisionBlock",
  labels: {
    singular: 'Mission/Vision Section',
    plural: 'Mission/Vision Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our Mission',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      required: true,
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        description: 'Choose whether the image appears on the left or right on desktop.',
      },
    },
    {
      name: 'points',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
