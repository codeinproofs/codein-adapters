export interface AppMeta {
  name: string;
  ticker: string;
  description: string;
  iconPrompt: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface LaunchResult {
  signature: string;
  mint: string;
  mock: boolean;
}

export interface DeployResult {
  url: string;
  mock: boolean;
}

export interface AIAdapter {
  generateMetadata(idea: string, template?: string): Promise<AppMeta>;
  generateIcon(meta: AppMeta): Promise<string | null>;
  generateCode(idea: string, meta: AppMeta, template: string): Promise<GeneratedFile[]>;
}

export interface PumpfunAdapter {
  launch(name: string, ticker: string, description: string, iconUrl: string | null): Promise<LaunchResult>;
}

export interface VercelAdapter {
  deploy(appId: string, name: string, files: GeneratedFile[]): Promise<DeployResult>;
}
