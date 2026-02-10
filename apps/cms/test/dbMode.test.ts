import { describe, expect, it } from 'vitest'

import { getDBMode } from '../src/lib/dbMode'

describe('getDBMode', () => {
  it('defaults to sqlite when DATABASE_URL is missing', () => {
    expect(getDBMode({} as any)).toBe('sqlite')
  })

  it('uses postgres when DATABASE_URL starts with postgres', () => {
    expect(getDBMode({ DATABASE_URL: 'postgres://x' } as any)).toBe('postgres')
  })
})
