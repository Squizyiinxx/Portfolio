export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://yourportfolio.com/#person",
        name: "Squizyiinxx",
        url: "https://yourportfolio.com",
        image: "https://yourportfolio.com/avatar.png",
        sameAs: [
          "https://github.com/squizyiinxx",
          "https://linkedin.com/in/joel21",
        ],
        jobTitle: "Frontend Developer Expert",
        worksFor: {
          "@type": "Organization",
          name: "Squizyiinxx Personal Brand",
          url: "https://yourportfolio.com",
        },
        description:
          "Frontend Developer specializing in React, Next.js, Tailwind CSS, and web performance optimization.",
      },
      {
        "@type": "WebSite",
        "@id": "https://yourportfolio.com/#website",
        url: "https://yourportfolio.com",
        name: "Squizyiinxx | Frontend Developer Expert",
        publisher: {
          "@id": "https://yourportfolio.com/#person",
        },
        description:
          "Official portfolio website of Squizyiinxx, a professional frontend developer expert.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://yourportfolio.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://yourportfolio.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://yourportfolio.com/portfolio",
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": "https://yourportfolio.com/portfolio/project-awesome",
        name: "Awesome Frontend Project",
        url: "https://yourportfolio.com/portfolio/project-awesome",
        description:
          "A frontend project showcasing animation, responsiveness, and web performance using React and Next.js.",
        datePublished: "2024-03-01",
        author: {
          "@id": "https://yourportfolio.com/#person",
        },
        image: "https://yourportfolio.com/portfolio/project-awesome-thumb.png",
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
