import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const staticExtensions =
  /\.(jpg|jpeg|png|webp|avif|css|js|svg|woff2|woff|ttf)$/i;

export function isStaticAsset(path: string): boolean {
  return staticExtensions.test(path);
}

export function applyCacheHeaders(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;

  if (isStaticAsset(pathname)) {
    const isNextStatic = pathname.includes("_next/static");
    res.headers.set(
      "Cache-Control",
      isNextStatic
        ? "public, max-age=31536000, immutable"
        : "public, max-age=86400"
    );
  }

  if (pathname.startsWith("/work")) {
    res.headers.set(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );
  }
}

export function applySecurityHeaders(res: NextResponse) {
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
}
