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
          "FullStack Developer in React, Next.js, Laravel, Vue.js, Nuxt.js, Node.js, and PHP with 3+ years experience",
      },
      {
        "@type": "WebSite",
        "@id": "https://squizyiinxx.vercel.app/#website",
        url: "https://squizyiinxx.vercel.app",
        name: "Squizyiinxx | FullStack Developer Expert",
        publisher: {
          "@id": "https://yourportfolio.com/#person",
        },
        description:
          "Official portfolio website of Squizyiinxx, a professional FullStack developer expert.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://squizyiinxx.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://squizyiinxx.vercel.app",
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": "https://squizyiinxx.vercel.app/portfolio/project-awesome",
        name: "Awesome FullStack Project",
        url: "https://squizyiinxx.vercel.app/portfolio/project-awesome",
        description:
          "A FullStack project showcasing modern web development, including UI/UX, responsiveness, and web performance.",
        datePublished: "2025-04-29",
        author: {
          "@id": "https://squizyiinxx.vercel.app/#person",
        },
        image: "https://squizyiinxx.vercel.app/profile.webp",
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
