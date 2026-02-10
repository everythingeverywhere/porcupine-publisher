import type { CollectionConfig } from 'payload';

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'provider', type: 'text' },
    { name: 'baseUrl', type: 'text', required: true },
    {
      name: 'utmDefaults',
      type: 'json',
      admin: {
        description: 'Default UTM params merged into outbound links.',
      },
    },
    {
      name: 'disclosures',
      type: 'relationship',
      relationTo: 'disclosures',
      hasMany: true,
    },
  ],
};
