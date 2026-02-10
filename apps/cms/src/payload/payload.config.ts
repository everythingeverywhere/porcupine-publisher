import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Disclosures } from './collections/Disclosures'
import { Media } from './collections/Media'
import { Offers } from './collections/Offers'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Shorts } from './collections/Shorts'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET || 'change-me',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/porcupine',
    },
  }),
  collections: [Users, Media, Pages, Posts, Shorts, Offers, Disclosures],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
