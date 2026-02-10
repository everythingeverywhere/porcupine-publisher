import { describe, expect, it } from 'vitest';
import { normalizeSlug } from '../src/index';

describe('normalizeSlug', () => {
  it('normalizes basic titles', () => {
    expect(normalizeSlug('Best Personal Loans for Fair Credit')).toBe('best-personal-loans-for-fair-credit');
  });

  it('removes apostrophes and punctuation', () => {
    expect(normalizeSlug("Lender's Choice!" )).toBe('lenders-choice');
  });
});
