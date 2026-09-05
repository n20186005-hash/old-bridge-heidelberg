// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// Build Next.js with `next build` directly instead of `npm run build`.
	// Without this, OpenNext runs `<package-manager> run build`, which would
	// re-invoke this same `opennextjs-cloudflare build` script infinitely.
	buildCommand: "next build",
	// For best results consider enabling R2 caching
	// See https://opennext.js.org/cloudflare/caching for more details
	// incrementalCache: r2IncrementalCache
});
