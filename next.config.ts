import { PHASE_PRODUCTION_BUILD } from "next/constants";

/** @type {import('next').NextConfig} */
export default (phase: typeof PHASE_PRODUCTION_BUILD) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    generateEtags: false,
    productionBrowserSourceMaps: !isProd,
    compiler: {
      styledComponents: true,
    },

    ...(isProd && {
      output: "standalone",
    }),

    httpAgentOptions: {
      keepAlive: true,
    },
    experimental: {
      optimizeCss: true,
      optimizePackageImports: [
        "framer-motion",
        "@heroicons/react",
        "@emotion/styled",
        "@emotion/react",
      ],
      staleTimes: {
        dynamic: 30,
      },
    },
    images: {
      formats: ["image/avif", "image/webp"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      minimumCacheTTL: 60,
    },
    async rewrites() {
      return [
        {
          source: "/contact",
          destination: "/api/contact",
        },
      ];
    },
    headers: async () => [
      {
        source: "/:all*(svg|jpg|png|js|css)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ],
  };
};

