import type { CollectionConfig } from 'payload';
import { seoFields } from '../fields/seo';

export const Shorts: CollectionConfig = {
  slug: 'shorts',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'videoType',
      type: 'select',
      defaultValue: 'upload',
      options: ['upload', 'embed'],
    },
    {
      name: 'videoUpload',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'upload',
      },
    },
    {
      name: 'videoEmbedUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'embed',
      },
    },
    { name: 'caption', type: 'textarea' },
    { name: 'transcript', type: 'richText' },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
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
