import { hashTypedData, type Hex, type Address } from 'viem';

export type RouteHop = {
  venue: Address;
  tokenIn: Address;
  tokenOut: Address;
  feeBps: number;
};

export type SwapIntent = {
  originChainId: number;
  destinationChainId: number;
  swapper: Address;
  recipient: Address;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: bigint;
  minAmountOut: bigint;
  deadline: bigint;
  nonce: bigint;
  route: RouteHop[];
};

export const INTENT_TYPES = {
  RouteHop: [
    { name: 'venue', type: 'address' },
    { name: 'tokenIn', type: 'address' },
    { name: 'tokenOut', type: 'address' },
    { name: 'feeBps', type: 'uint16' },
  ],
  SwapIntent: [
    { name: 'originChainId', type: 'uint256' },
    { name: 'destinationChainId', type: 'uint256' },
    { name: 'swapper', type: 'address' },
    { name: 'recipient', type: 'address' },
    { name: 'tokenIn', type: 'address' },
    { name: 'tokenOut', type: 'address' },
    { name: 'amountIn', type: 'uint256' },
    { name: 'minAmountOut', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'route', type: 'RouteHop[]' },
  ],
} as const;

export function hashIntent(
  domain: { name: string; version: string; chainId: number; verifyingContract: Address },
  intent: SwapIntent,
): Hex {
  return hashTypedData({
    domain,
    types: INTENT_TYPES,
    primaryType: 'SwapIntent',
    message: intent,
  });
}

export * from './quoter';
