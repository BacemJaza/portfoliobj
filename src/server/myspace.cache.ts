type CacheEntry<T> = {
  data: T;
  storedAt: number;
};

const store = new Map<string, CacheEntry<unknown>>();

export function saveServerCache<T>(key: string, data: T): void {
  store.set(key, { data, storedAt: Date.now() });
}

export function getServerCache<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  return entry.data as T;
}

/** Try the fetcher; on success persist globally. On failure return the last snapshot. */
export async function withServerCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  try {
    const data = await fetcher();
    saveServerCache(key, data);
    return data;
  } catch {
    const cached = getServerCache<T>(key);
    if (cached !== null) return cached;
    throw new Error("Database unavailable");
  }
}
