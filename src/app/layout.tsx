import type { Metadata } from "next";
import { Karla, Yeseva_One } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const yesevaOne = Yeseva_One({
  variable: "--font-yeseva-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const karlaFont = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Squizyiinxx | FullStack Developer",
    template: "%s | Squizyiinxx",
  },
  alternates: {
    canonical: "https://squizyiinxx.vercel.app",
    languages: {
      "en-US": "/en",
      "id-ID": "/id",
    },
  },
  description:
    "Official portfolio website of Squizyiinxx, a FullStack Developer in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization.",
  keywords: [
    "FullStack Developer",
    "Squizyiiinxx",
    "Portfolio",
    "Portfolio Squizyiinxx",
    "Modern Website",
    "Web Developer",
    "Portfolio",
    "Laravel",
    "Cuma bisa ngoding",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "xwzam3SDIJt-0stHGZH_IDG1My6fs0ssD1UIib95Gh8",
  },
  category: "technology",
  applicationName: "Portfolio",
  publisher: "Squizyiinxx",
  authors: [{ name: "Squizyiinxx", url: "https://squizyiinxx.vercel.app" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon-180x180.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/favicon/favicon-32x32.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon/favicon-16x16.ico"
        />
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Squizyiinxx" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Squizyiinxx Portfolio" />
        <meta property="og:title" content="Squizyiinxx | FullStack Developer" />
        <meta
          property="og:description"
          content="FullStack Developer specializing in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization."
        />
        <meta property="og:url" content="https://squizyiinxx.vercel.app" />
        <meta
          property="og:image"
          content="https://squizyiinxx.vercel.app/logo.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Squizyiinxx | FullStack Developer" />
        <meta
          name="twitter:description"
          content="FullStack Developer specializing in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization."
        />
        <meta name="twitter:image" content="https://x.com/Squvy51/photo" />
        <meta name="twitter:site" content="@Squvy51" />
        <StructuredData />
      </head>
      <body
        suppressHydrationWarning
        className={`${yesevaOne.variable} ${karlaFont.variable} antialiased bg-white text-black`}
      >
        <ErrorBoundary>
          {children}
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  );
}
