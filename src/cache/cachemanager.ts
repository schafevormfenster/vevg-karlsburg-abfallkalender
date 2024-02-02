const cacheManager = require("cache-manager");

/**
 * Memory cache.
 * Use always to avoid any duplicate http or api requests.
 */
export const localCache = cacheManager.caching({
  store: "memory",
  max: 100000000,
  ttl: 604800, // 1 week
  isCacheableValue: function (value: any) {
    return value !== undefined && value !== null;
  },
});
