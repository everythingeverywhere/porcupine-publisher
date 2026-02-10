import type { CollectionConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: ['draft', 'scheduled', 'published'],
    },
    { name: 'publishAt', type: 'date' },
    { name: 'publishedAt', type: 'date', admin: { readOnly: true } },
    seoFields,
  ],
};
