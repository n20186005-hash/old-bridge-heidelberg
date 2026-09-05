// Temporary validation script (deleted after use).
// Mimics @opennextjs/aws compileOpenNextConfigNode: bundle open-next.config.ts
// with esbuild and inspect the resulting default export.
import { buildSync } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import url from "node:url";

const out = path.join(os.tmpdir(), `oc-config-check-${Date.now()}.mjs`);
try {
  buildSync({
    entryPoints: ["open-next.config.ts"],
    outfile: out,
    bundle: true,
    format: "esm",
    platform: "node",
    target: ["node18"],
    external: [],
  });
  const mod = await import(url.pathToFileURL(out).href);
  const cfg = mod.default;
  console.log("has default:", Boolean(cfg?.default));
  console.log("buildCommand:", cfg?.buildCommand);
  if (cfg?.buildCommand !== "next build" || !cfg?.default) {
    process.exitCode = 1;
  }
} finally {
  fs.rmSync(out, { force: true });
}
