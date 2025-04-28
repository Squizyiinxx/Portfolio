import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const startTime = Date.now();
  const staticExtensions =
    /\.(jpg|jpeg|png|webp|avif|css|js|svg|woff2|woff|ttf)/;

  if (staticExtensions.test(request.nextUrl.pathname)) {
    if (request.nextUrl.pathname.includes("_next/static")) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=31536000, immutable"
      );
    } else {
      response.headers.set("Cache-Control", "public, max-age=86400");
    }
  }
  if (request.nextUrl.pathname.startsWith("/work")) {
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=604800"
    );
  }
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Content-Type-Options", "nosniff");
  const timing = Date.now() - startTime;
  response.headers.set("Server-Timing", `middleware;dur=${timing}`);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
