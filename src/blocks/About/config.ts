import { Block } from "payload";

const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName:"aboutBlock",
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
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
      name: 'missionText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Items',
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
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Building', value: 'building' },
            { label: 'Users', value: 'users' },
            { label: 'Graduation Cap', value: 'graduationCap' },
          
          ],
          required: true,
        },
      ],
    },
  ],
};

export default AboutBlock;
