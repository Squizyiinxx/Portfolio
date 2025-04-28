const socialMediaList = [
  {
    id: 1,
    name: "Facebook",
    link: "https://www.facebook.com/ijulemce",
    icon: "iconfacebook",
  },
  {
    id: 2,
    name: "X",
    link: "https://x.com/Squvy51",
    icon: "iconx",
  },
  {
    id: 3,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/joel21",
    icon: "iconlinkedin",
  },
  {
    id: 4,
    name: "GitHub",
    link: "https://github.com/Squizyiinxx",
    icon: "icongithub",
  },
  {
    id: 5,
    name: "Instagram",
    link: "https://www.instagram.com/julrhmn_",
    icon: "iconinstagram",
  },
] as const;

export type socialMedia = (typeof socialMediaList)[number];
export const socialMedia: readonly socialMedia[] = socialMediaList;
