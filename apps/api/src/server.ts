import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';

const QuoteBody = z.object({
  chainId: z.number().int().positive(),
  tokenIn: z.string(),
  tokenOut: z.string(),
  amountIn: z.string(),
  slippageBps: z.number().int().min(0).max(5000),
});

async function main() {
  console.log("[orbitdex-api] Node server boot");
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: true });

  app.post('/v1/quote', async (req) => {
    const body = QuoteBody.parse(req.body);
    const out = (BigInt(body.amountIn) * 997n) / 1000n;
    return {
      quoteId: `q_${Date.now()}`,
      chainId: body.chainId,
      amountOut: out.toString(),
      routeVenues: ['uniswap-v3', 'curve'],
      gasEstimate: '180000',
      createdAt: Date.now(),
    };
  });

  app.get('/health', async () => ({ ok: true, service: 'orbitdex-api' }));

  await app.listen({ port: 8787, host: '0.0.0.0' });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
