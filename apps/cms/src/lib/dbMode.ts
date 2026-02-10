export type DBMode = 'postgres' | 'sqlite'

export function getDBMode(env: NodeJS.ProcessEnv): DBMode {
  const url = env.DATABASE_URL
  if (url && url.startsWith('postgres')) return 'postgres'
  return 'sqlite'
}
