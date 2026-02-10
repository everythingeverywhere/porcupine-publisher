import type { CollectionConfig } from 'payload';

export const Disclosures: CollectionConfig = {
  slug: 'disclosures',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'richText', required: true },
    { name: 'effectiveFrom', type: 'date' },
  ],
};
