import { ORBIT_CHAINS } from '@orbitdex/config';

export type QuoteRequest = {
  chainId: number;
  tokenIn: `0x${string}`;
  tokenOut: `0x${string}`;
  amountIn: string;
  slippageBps: number;
};

export type QuoteResponse = {
  quoteId: string;
  chainId: number;
  amountOut: string;
  routeVenues: string[];
  gasEstimate: string;
  createdAt: number;
};

export async function fetchQuote(baseUrl: string, req: QuoteRequest): Promise<QuoteResponse> {
  if (!ORBIT_CHAINS.some((c) => c.id === req.chainId)) {
    throw new Error(`Unsupported chainId ${req.chainId}`);
  }
  const res = await fetch(`${baseUrl}/v1/quote`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error(`quote failed: ${res.status}`);
  return (await res.json()) as QuoteResponse;
}
