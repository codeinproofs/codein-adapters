import { createHash } from "node:crypto";
import type { AIAdapter, AppMeta, GeneratedFile } from "./types.js";

const DNA: Record<string, AppMeta> = {
  discord: {
    name: "PulseCord",
    ticker: "PULSE",
    description: "Servers, voice rooms, and community chat for builders who ship live.",
    iconPrompt: "Abstract technological app icon, dark neon circuit, no logos",
  },
  chrome: {
    name: "Orbit",
    ticker: "ORBIT",
    description: "Lightning tabs, omnibox search, and syncable workspace spaces.",
    iconPrompt: "Abstract technological app icon, orbital rings, no logos",
  },
  chatgpt: {
    name: "EchoMind",
    ticker: "ECHO",
    description: "Streaming AI chat with memory, tools, and a clean message canvas.",
    iconPrompt: "Abstract technological app icon, neural nodes, no logos",
  },
};

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "app";
}

function techIconDataUri(ticker: string): string {
  const h = createHash("sha256").update(ticker).digest("hex");
  const hue = parseInt(h.slice(0, 2), 16);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="hsl(${hue} 40% 12%)"/><circle cx="16" cy="16" r="6" fill="none" stroke="hsl(${(hue + 40) % 360} 70% 65%)" stroke-width="1.5"/><circle cx="16" cy="16" r="2" fill="hsl(${(hue + 80) % 360} 80% 70%)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export class MockAIAdapter implements AIAdapter {
  async generateMetadata(idea: string, template?: string): Promise<AppMeta> {
    const key = (template ?? "").toLowerCase().replace(/-like$/, "");
    if (key && DNA[key]) return { ...DNA[key] };
    const words = idea.match(/[A-Za-z0-9]+/g)?.slice(0, 2) ?? ["Nova"];
    const name = words.map((w) => w[0]!.toUpperCase() + w.slice(1).toLowerCase()).join("");
    const ticker = name.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6) || "APP";
    return {
      name,
      ticker,
      description: `${name}: ${idea.slice(0, 140)}`,
      iconPrompt: `Abstract technological app icon for ${name}, no logos`,
    };
  }

  async generateIcon(meta: AppMeta): Promise<string | null> {
    return techIconDataUri(meta.ticker);
  }

  async generateCode(idea: string, meta: AppMeta, _template: string): Promise<GeneratedFile[]> {
    const safe = idea.replace(/`/g, "'").slice(0, 160);
    return [
      {
        path: "package.json",
        content: JSON.stringify(
          {
            name: slug(meta.name),
            private: true,
            version: "0.1.0",
            type: "module",
            scripts: { dev: "vite", build: "vite build" },
            dependencies: { react: "^18.3.1", "react-dom": "^18.3.1" },
            devDependencies: {
              vite: "^5.3.1",
              "@vitejs/plugin-react": "^4.3.1",
              tailwindcss: "^3.4.4",
            },
          },
          null,
          2,
        ),
      },
      {
        path: "index.html",
        content: `<!doctype html><html><head><meta charset="UTF-8"/><title>${meta.name}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>\n`,
      },
      {
        path: "src/main.jsx",
        content: `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nReactDOM.createRoot(document.getElementById('root')).render(<App />)\n`,
      },
      {
        path: "src/App.jsx",
        content: `export default function App() {\n  return (\n    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0A1628',color:'#fff',fontFamily:'system-ui'}}>\n      <div style={{textAlign:'center'}}>\n        <h1 style={{fontSize:40,marginBottom:8}}>${meta.name}</h1>\n        <p style={{color:'#A799FF'}}>${meta.ticker}</p>\n        <p style={{color:'#94a3b8',maxWidth:420,marginTop:16}}>${safe}</p>\n      </div>\n    </div>\n  )\n}\n`,
      },
    ];
  }
}
