const skillsList = [
  {
    name: "JavaScript",
    icon: "iconjs",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    icon: "iconts",
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "CSS",
    icon: "iconcss",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Firebase",
    icon: "iconfirebase",
    link: "https://firebase.google.com/",
  },
  {
    name: "React",
    icon: "iconreact",
    link: "https://react.dev/",
  },
  {
    name: "Next.js",
    icon: "iconnext",
    link: "https://nextjs.org/",
  },
  {
    name: "Vue.js",
    icon: "iconvue",
    link: "https://vuejs.org/",
  },
  {
    name: "Laravel",
    icon: "iconlaravel",
    link: "https://laravel.com/",
  },
  {
    name: "Node.js",
    icon: "iconnode",
    link: "https://nodejs.org/",
  },
  {
    name: "PHP",
    icon: "iconphp",
    link: "https://www.php.net/",
  },
  {
    name: "Git",
    icon: "icongit",
    link: "https://git-scm.com/",
  },
  {
    name: "HTML",
    icon: "iconhtml",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "Prisma",
    icon: "iconprisma",
    link: "https://www.prisma.io/",
  },
  {
    name: "Tailwind CSS",
    icon: "icontailwinds",
    link: "https://tailwindcss.com/",
  }
] as const;

export type Skill = (typeof skillsList)[number];
export const skills: readonly Skill[] = skillsList;
