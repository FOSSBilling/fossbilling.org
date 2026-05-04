import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  queue: memoryQueue,
  // When true, OpenNext intercepts cache-related requests/responses so that Cloudflare
  // follows Next.js incremental cache behavior. Disable this if another layer manages
  // caching or when debugging cache issues.
  enableCacheInterception: true
});
