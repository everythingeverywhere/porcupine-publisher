export type CMSHealth = {
  ok: boolean
  status: number
}

export async function checkCMSHealth(baseUrl: string): Promise<CMSHealth> {
  const url = new URL('/api/health', baseUrl)
  const res = await fetch(url)
  return { ok: res.ok, status: res.status }
}
