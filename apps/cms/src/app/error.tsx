'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Something went wrong</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
    </main>
  )
}
