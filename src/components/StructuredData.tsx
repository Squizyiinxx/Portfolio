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
        jobTitle: "Frontend Developer Expert",
        worksFor: {
          "@type": "Organization",
          name: "Squizyiinxx Personal Brand",
          url: "https://squizyiinxx.vercel.app",
        },
        description:
          "Frontend Developer specializing in React, Next.js, Tailwind CSS, and web performance optimization.",
      },
      {
        "@type": "WebSite",
        "@id": "https://squizyiinxx.vercel.app/#website",
        url: "https://squizyiinxx.vercel.app",
        name: "Squizyiinxx | Frontend Developer Expert",
        publisher: {
          "@id": "https://yourportfolio.com/#person",
        },
        description:
          "Official portfolio website of Squizyiinxx, a professional frontend developer expert.",
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
        name: "Awesome Frontend Project",
        url: "https://squizyiinxx.vercel.app/portfolio/project-awesome",
        description:
          "A frontend project showcasing animation, responsiveness, and web performance using React and Next.js.",
        datePublished: "2024-03-01",
        author: {
          "@id": "https://squizyiinxx.vercel.app/#person",
        },
        image: "https://squizyiinxx.vercel.app/portfolio/profile.webp",
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
