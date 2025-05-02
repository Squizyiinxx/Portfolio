export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://squizyiinxx.vercel.app/#person",
        name: "Squizyiinxx",
        url: "https://squizyiinxx.vercel.app",
        image: "https://squizyiinxx.vercel.app/profile.webp",
        sameAs: [
          "https://github.com/squizyiinxx",
          "https://linkedin.com/in/joel21",
        ],
        jobTitle: "FullStack Developer Expert",
        worksFor: {
          "@type": "Organization",
          name: "Squizyiinxx Personal Brand",
          url: "https://squizyiinxx.vercel.app",
        },
        description:
          "Official portfolio website of Squizyiinxx, a FullStack Developer in modern web development with 3+ years experience. Portfolio showcasing responsive UI, animations, and web performance optimization.",
      },
      {
        "@type": "WebSite",
        "@id": "https://squizyiinxx.vercel.app/#website",
        url: "https://squizyiinxx.vercel.app",
        name: "Squizyiinxx | FullStack Developer Expert",
        publisher: { "@id": "https://squizyiinxx.vercel.app/#person" },
        description:
          "Official portfolio website of Squizyiinxx, a FullStack Developer in modern web development with 3+ years experience.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://squizyiinxx.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://squizyiinxx.vercel.app/#webpage",
        url: "https://squizyiinxx.vercel.app",
        name: "Squizyiinxx | FullStack Developer",
        description:
          "Portfolio website of Squizyiinxx, showcasing work as a FullStack Developer in modern web development, UI/UX, and performance optimization.",
        headline: "Squizyiinxx | FullStack Developer Portfolio",
        inLanguage: "en",
        isPartOf: { "@id": "https://squizyiinxx.vercel.app/#website" },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://squizyiinxx.vercel.app/profile.webp",
        },
        author: { "@id": "https://squizyiinxx.vercel.app/#person" },
        creator: { "@id": "https://squizyiinxx.vercel.app/#person" },
        mainEntityOfPage: "https://squizyiinxx.vercel.app",
        datePublished: "2025-05-01",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
