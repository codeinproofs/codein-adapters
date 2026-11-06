import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createMockStack } from "../src/index.ts";

describe("mock stack", () => {
  it("produces metadata, icon, code, mint, deploy", async () => {
    const { ai, pumpfun, vercel } = createMockStack();
    const meta = await ai.generateMetadata("chat", "discord-like");
    assert.equal(meta.ticker, "PULSE");
    const icon = await ai.generateIcon(meta);
    assert.ok(icon?.startsWith("data:image/svg+xml"));
    const files = await ai.generateCode("chat", meta, "discord-like");
    assert.ok(files.some((f) => f.path === "src/App.jsx"));
    const launch = await pumpfun.launch(meta.name, meta.ticker, meta.description, icon);
    assert.equal(launch.mock, true);
    assert.ok(launch.mint.length > 10);
    const deploy = await vercel.deploy("abcd1234-uuid", meta.name, files);
    assert.match(deploy.url, /vercel\.app$/);
  });
});
