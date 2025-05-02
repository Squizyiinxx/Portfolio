import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  applySecurityHeaders,
  applyCacheHeaders,
} from "@/utils/middlewareUtils";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const startTime = Date.now();

  applyCacheHeaders(request, response);
  applySecurityHeaders(response);

  const timing = Date.now() - startTime;
  response.headers.set("Server-Timing", `middleware;dur=${timing}`);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt).*)"],
};
