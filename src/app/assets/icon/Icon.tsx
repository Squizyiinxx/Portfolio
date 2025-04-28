import React from "react";
import {
  IconJS,
  IconTS,
  IconCSS,
  IconFirebase,
  IconReact,
  IconNext,
  IconVue,
  IconLaravel,
  IconNode,
  IconPHP,
  IconGit,
  IconHTML,
  PrismaIcon,
  IconTailwinds,
  IconX,
  IconFacebook,
  GitHubIcon,
  LinkedInIcon,
  IconInstagram
} from "@/app/assets/icon";
import { IconProps } from "@/types/interface";

const iconMap = {
  iconjs: IconJS,
  iconts: IconTS,
  iconcss: IconCSS,
  iconfirebase: IconFirebase,
  iconreact: IconReact,
  iconnext: IconNext,
  iconvue: IconVue,
  iconlaravel: IconLaravel,
  iconnode: IconNode,
  iconphp: IconPHP,
  icongit: IconGit,
  iconhtml: IconHTML,
  iconprisma: PrismaIcon,
  icontailwinds: IconTailwinds,
  icongithub: GitHubIcon,
  iconlinkedin: LinkedInIcon,
  iconinstagram:IconInstagram,
  iconfacebook: IconFacebook,
  iconx:IconX,
} as const;

interface HandleIconProps extends IconProps{
  name: keyof typeof iconMap | undefined;
}

const Icon: React.FC<HandleIconProps> = ({ name, className,color,width,height }) => {
  if (!name || !(name in iconMap)) {
    return null;
  }
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} color={color} width={width} height={height} />;
};

export default Icon;
