export function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildOfferUrl(baseUrl: string, utm: Record<string, string>): string {
  const url = new URL(baseUrl);
  for (const [k, v] of Object.entries(utm)) url.searchParams.set(k, v);
  return url.toString();
}
