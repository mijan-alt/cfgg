// blocks/Carousel1/config.ts
import { Block } from "payload"

export const Carousel1: Block = {
  slug: 'carousel1',
  interfaceName:'carousel1',
  labels: {
    singular: 'Carousel 1',
    plural: 'Carousels 1',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
    },
    {
      name: 'caseStudies',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                { label: 'Custom URL', value: 'custom' },
                { label: 'Reference', value: 'reference' },
              ],
              defaultValue: 'custom',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'custom',
              },
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: ['pages', 'posts'],
              admin: {
                condition: (_, siblingData) => siblingData.type === 'reference',
              },
            },
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'newTab',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
  ],
}
