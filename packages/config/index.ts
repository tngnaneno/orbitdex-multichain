export const ORBIT_CHAINS = [
  { id: 1, name: 'Ethereum', slug: 'ethereum' },
  { id: 42161, name: 'Arbitrum', slug: 'arbitrum' },
  { id: 8453, name: 'Base', slug: 'base' },
  { id: 10, name: 'Optimism', slug: 'optimism' },
  { id: 137, name: 'Polygon', slug: 'polygon' },
  { id: 56, name: 'BNB', slug: 'bsc' },
  { id: 43114, name: 'Avalanche', slug: 'avalanche' },
  { id: 534352, name: 'Scroll', slug: 'scroll' },
] as const;

export const SETTLEMENT_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0x1111111111111111111111111111111111111111',
  42161: '0x2222222222222222222222222222222222222222',
  8453: '0x3333333333333333333333333333333333333333',
  10: '0x4444444444444444444444444444444444444444',
  137: '0x5555555555555555555555555555555555555555',
  56: '0x6666666666666666666666666666666666666666',
  43114: '0x7777777777777777777777777777777777777777',
  534352: '0x8888888888888888888888888888888888888888',
};
