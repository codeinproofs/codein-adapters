import type { DeployResult, GeneratedFile, VercelAdapter } from "./types.js";

export class MockVercelAdapter implements VercelAdapter {
  async deploy(appId: string, name: string, files: GeneratedFile[]): Promise<DeployResult> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24) || "app";
    void files;
    return {
      url: `https://${slug}-${appId.slice(0, 8)}.codein.vercel.app`,
      mock: true,
    };
  }
}
