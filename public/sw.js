/* MyCalcsWorld service worker — shell cache + network-first for HTML/API.
   Versioned caches; never cache ad networks. */
const CACHE_VERSION = "v1";
const SHELL_CACHE = `mcw-shell-${CACHE_VERSION}`;
const STATIC_CACHE = `mcw-static-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  "/",
  OFFLINE_URL,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/logo-v2.png",
  "/apple-touch-icon.png",
];

const AD_HOST_RE =
  /googlesyndication|googleadservices|googleads|doubleclick|pagead2|adservice|adsystem|adtrafficquality|fundingchoicesmessages|tpc\.googlesyndication/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "reload" });
            if (res.ok) await cache.put(url, res);
          } catch {
            /* ignore individual precache failures */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (k) =>
              (k.startsWith("mcw-shell-") || k.startsWith("mcw-static-")) &&
              k !== SHELL_CACHE &&
              k !== STATIC_CACHE,
          )
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isAdRequest(url) {
  return AD_HOST_RE.test(url.hostname) || AD_HOST_RE.test(url.href);
}

function isApiOrLive(url) {
  return url.pathname.startsWith("/api/");
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|gif|webp|svg|ico|avif)$/i.test(
      url.pathname,
    )
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // Never intercept ads / third-party trackers
  if (isAdRequest(url)) return;

  // Same-origin only for caching strategies
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, offline fallback
  if (req.mode === "navigate") {
    event.respondWith(networkFirstNavigate(req));
    return;
  }

  // Live rates / API: network-first — do not stash stale FX/commodities
  if (isApiOrLive(url)) {
    event.respondWith(networkFirstApi(req));
    return;
  }

  // Build / static assets: cache-first with background revalidate
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStatic(event, req));
  }
});

async function networkFirstNavigate(req) {
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;
    return new Response(
      "You are offline. Open MyCalcsWorld when you are back online.",
      {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }
}

async function networkFirstApi(req) {
  try {
    return await fetch(req);
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    return new Response(
      JSON.stringify({
        error: "offline",
        message: "Live data unavailable offline.",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

async function cacheFirstStatic(event, req) {
  const cached = await caches.match(req);
  if (cached) {
    event.waitUntil(
      fetch(req)
        .then(async (res) => {
          if (res && res.ok) {
            const cache = await caches.open(STATIC_CACHE);
            await cache.put(req, res);
          }
        })
        .catch(() => {}),
    );
    return cached;
  }
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch {
    return new Response("", { status: 504 });
  }
}
