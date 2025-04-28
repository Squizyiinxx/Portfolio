const ipRequestMap = new Map<string, { count: number; lastRequest: number }>();

const WINDOW_MS = 60 * 1000;
export async function isRateLimited(ip: string): Promise<boolean> {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);
  if (!entry || now - entry.lastRequest > WINDOW_MS) {
    ipRequestMap.set(ip, { count: 1, lastRequest: now });
    return false;
  }
  entry.count++;
  entry.lastRequest = now;
  ipRequestMap.set(ip, entry);
  return entry.count > 5;
}


