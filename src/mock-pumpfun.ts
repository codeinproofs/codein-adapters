import { createHash, randomBytes } from "node:crypto";
import type { LaunchResult, PumpfunAdapter } from "./types.js";

export class MockPumpfunAdapter implements PumpfunAdapter {
  async launch(
    name: string,
    ticker: string,
    _description: string,
    _iconUrl: string | null,
  ): Promise<LaunchResult> {
    const seed = `${name}:${ticker}:${Date.now()}`;
    const mint = createHash("sha256").update(seed).digest("base64url").slice(0, 44);
    const signature = randomBytes(32).toString("base64url");
    return { mint, signature, mock: true };
  }
}
