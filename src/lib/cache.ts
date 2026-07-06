const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_TIMEOUT_MS = 8_000;

type CacheEntry<T> = {
  data: T;
  storedAt: number;
};

function buildCacheKey(key: string) {
  return `myspace-cache:${key}`;
}

function readCacheEntry<T>(key: string): CacheEntry<T> | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(buildCacheKey(key));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CacheEntry<T>>;
    if (typeof parsed?.storedAt !== "number" || parsed.data === undefined) {
      return null;
    }

    return {
      data: parsed.data as T,
      storedAt: parsed.storedAt,
    };
  } catch {
    return null;
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeoutMs);

    promise.then(
      (value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

export function saveCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;

  try {
    const payload: CacheEntry<T> = {
      data,
      storedAt: Date.now(),
    };
    window.localStorage.setItem(buildCacheKey(key), JSON.stringify(payload));
  } catch {
    // Ignore storage failures so the app can continue gracefully.
  }
}

export function getCache<T>(key: string): T | null {
  const entry = readCacheEntry<T>(key);
  if (!entry) return null;

  if (Date.now() - entry.storedAt > CACHE_TTL_MS) {
    return null;
  }

  return entry.data;
}

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { ttlMs?: number; timeoutMs?: number },
): Promise<T | null> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  try {
    const data = await withTimeout(fetcher(), timeoutMs);
    saveCache(key, data);
    return data;
  } catch {
    const fallbackEntry = readCacheEntry<T>(key);
    if (fallbackEntry) {
      return fallbackEntry.data;
    }

    return null;
  }
}
