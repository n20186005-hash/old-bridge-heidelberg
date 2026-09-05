// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default {
	// `defineCloudflareConfig` only forwards a fixed set of keys, so `buildCommand`
	// must be merged at the top level (spread) rather than passed as an argument.
	// Without it OpenNext runs `<package-manager> run build`, which re-invokes this
	// same `opennextjs-cloudflare build` script and loops forever.
	...defineCloudflareConfig({
		// For best results consider enabling R2 caching
		// See https://opennext.js.org/cloudflare/caching for more details
		// incrementalCache: r2IncrementalCache
	}),
	buildCommand: "next build",
};
