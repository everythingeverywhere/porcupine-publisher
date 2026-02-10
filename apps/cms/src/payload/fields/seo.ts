import type { Field } from 'payload';

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'canonicalUrl', type: 'text' },
    { name: 'noIndex', type: 'checkbox', defaultValue: false },
    {
      name: 'openGraph',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'relationship', relationTo: 'media' },
      ],
    },
  ],
};
