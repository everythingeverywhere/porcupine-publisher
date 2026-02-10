import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';

import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Shorts } from './collections/Shorts';
import { Offers } from './collections/Offers';
import { Disclosures } from './collections/Disclosures';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET || 'change-me',
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/porcupine',
    },
  }),
  collections: [Media, Pages, Posts, Shorts, Offers, Disclosures],
});
