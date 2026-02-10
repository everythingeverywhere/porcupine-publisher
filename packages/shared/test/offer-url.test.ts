import { describe, expect, it } from 'vitest';
import { buildOfferUrl } from '../src/index';

describe('buildOfferUrl', () => {
  it('adds UTM params', () => {
    const url = buildOfferUrl('https://example.com/path', { utm_source: 'site', utm_medium: 'affiliate' });
    expect(url).toContain('utm_source=site');
    expect(url).toContain('utm_medium=affiliate');
  });
});
