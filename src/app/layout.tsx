import type { Metadata } from "next";
import { Karla, Yeseva_One } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StructuredData } from "@/components/StructuredData";

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
    default: "Squizyiinxx | Frontend Developer",
    template: "%s | Squizyiinxx",
  },
  alternates: {
    canonical: "https://yourportfolio.com",
    languages: {
      "en-US": "/en",
      "id-ID": "/id",
    },
  },
  description:
    "Frontend Developer specializing in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization.",
  keywords: [
    "Frontend Developer",
    "React Expert",
    "Next.js Developer",
    "Portfolio",
    "Laravel",
    "UI/UX",
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
    google: "your-google-verification-code",
  },
  category: "technology",
  applicationName: "Portfolio",
  publisher: "Squizyiinxx",
  authors: [{ name: "Squizyiinxx", url: "https://yourportfolio.com" }],
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <meta property="og:title" content="Squizyiinxx | Frontend Developer" />
        <meta
          property="og:description"
          content="Frontend Developer specializing in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization."
        />
        <meta property="og:url" content="https://yourportfolio.com" />
        <meta
          property="og:image"
          content="https://yourportfolio.com/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Squizyiinxx | Frontend Developer" />
        <meta
          name="twitter:description"
          content="Frontend Developer specializing in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization."
        />
        <meta name="twitter:image" content="https://x.com/Squvy51/photo" />
        <meta name="twitter:site" content="@Squvy51" />
        <StructuredData />
      </head>
      <body
        suppressHydrationWarning
        className={`${yesevaOne.variable} ${karlaFont.variable} antialiased bg-white text-black`}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
