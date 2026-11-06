# @codein/adapters

Pluggable adapters for the CodeIn pipeline — **AI**, **pump.fun**, **Vercel** — with deterministic mocks so CI and local demos never need paid keys.

```bash
npm i @codein/adapters
```

```ts
import { createMockStack } from "@codein/adapters";

const { ai, pumpfun, vercel } = createMockStack();

const meta = await ai.generateMetadata("realtime chat", "discord-like");
const icon = await ai.generateIcon(meta);
const files = await ai.generateCode("realtime chat", meta, "discord-like");
const coin = await pumpfun.launch(meta.name, meta.ticker, meta.description, icon);
const site = await vercel.deploy("app-id", meta.name, files);

console.log(coin.mint, site.url);
```

## Why mocks

Same interfaces the production CodeIn backend uses. Swap in live OpenAI / pump / Vercel clients when keys exist — keep mocks for tests and offline demos.

## Develop

```bash
npm install
npm run build
npm test
```

## License

MIT
