export type {
  AIAdapter,
  AppMeta,
  DeployResult,
  GeneratedFile,
  LaunchResult,
  PumpfunAdapter,
  VercelAdapter,
} from "./types.js";
export { MockAIAdapter } from "./mock-ai.js";
export { MockPumpfunAdapter } from "./mock-pumpfun.js";
export { MockVercelAdapter } from "./mock-vercel.js";

import { MockAIAdapter } from "./mock-ai.js";
import { MockPumpfunAdapter } from "./mock-pumpfun.js";
import { MockVercelAdapter } from "./mock-vercel.js";

/** Bundle of mock adapters — drop-in for local / CI without keys. */
export function createMockStack() {
  return {
    ai: new MockAIAdapter(),
    pumpfun: new MockPumpfunAdapter(),
    vercel: new MockVercelAdapter(),
  };
}
