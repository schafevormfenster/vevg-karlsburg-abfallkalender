/**
 * Default http request headrers.
 */

import slugify from "slugify";
import { localCache } from "../../cache/cachemanager";

const httpHeaders = new Headers();
httpHeaders.append("Accept", "text/calendar");
httpHeaders.append("Accept-Language", "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7");
httpHeaders.append(
  "Referer",
  "https://www.vevg-karlsburg.de/entsorgungsbereiche.html"
);
httpHeaders.append("Accept-Encoding", "gzip, deflate, br");
httpHeaders.append("Connection", "keep-alive");

export const fetchHtml = async (url: string): Promise<string | null> => {
  const html: Response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
    headers: httpHeaders,
  });

  if (html.ok) {
    return html.text();
  } else {
    // sleep and retry
    console.info("Retry fetching HTML from " + url);
    await new Promise((f) => setTimeout(f, 1500)); // let the vevg website breath
    const html: Response = await fetch(url, {
      method: "GET",
      cache: "force-cache",
      headers: httpHeaders,
    });
    if (html.ok) {
      return html.text();
    }
  }

  console.error("Error fetching HTML from " + url);

  return null;
};

/**
 * Use a cache.
 */
export const fetchHtmlCached = async (url: string): Promise<string | null> => {
  try {
    const cacheKey =
      "fetch-html-" + slugify(url, { lower: true, strict: true });
    console.debug(`[Cache] Check local cache for ${cacheKey}.`);
    return localCache.wrap(cacheKey, function () {
      try {
        console.info(`[Cache] Fetch original data for ${cacheKey}.`);
        return fetchHtml(url);
      } catch (error) {
        console.error((error as Error).message);
        throw error;
      }
    });
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
