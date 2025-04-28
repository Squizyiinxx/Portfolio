// SkillComponent.tsx

import { motion } from "framer-motion";
import { useMemo } from "react";
import Icon from "@/app/assets/icon/Icon";
import { skills } from "@/constants/skills";

function AnimatedSkill({
  skill,
  active,
}: {
  skill: (typeof skills)[number];
  active: boolean;
}) {
  const animateProps = useMemo(
    () => ({
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.8,
    }),
    [active]
  );

  const animatedSkillTransition = useMemo(
    () => ({ duration: 0.6, ease: "easeInOut" }),
    []
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={animateProps}
      transition={animatedSkillTransition}
      style={{
        pointerEvents: active ? "auto" : "none",
        willChange: "transform",
      }}
      layout
    >
      <Icon
        name={skill.icon}
        className="w-16 h-16 text-white md:text-primary-500"
      />
      <span className="text-xl font-semibold text-white md:text-primary-500">
        {skill.name}
      </span>
    </motion.div>
  );
}

const SkillGridItem = ({ skill }: { skill: (typeof skills)[number] }) => {
  const skillGridItemTransition = useMemo(
    () => ({ type: "spring", stiffness: 300 }),
    []
  );

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2"
      whileHover={{ scale: 1.15, rotate: 2 }}
      transition={skillGridItemTransition}
      style={{ willChange: "transform" }}
      layout
    >
      <Icon name={skill.icon} className="w-10 h-10 text-primary-300" />
      <span className="text-primary-300 text-sm sm:text-base">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillComponent = ({
  skill,
  delay = 0,
}: {
  skill: string;
  delay?: number;
}) => {
  const skillTransition = useMemo(() => ({ duration: 0.5, delay }), [delay]);

  return (
    <motion.div
      className="inline-block bg-white/10 text-xs px-3 py-1 rounded-full text-white border border-white/20 m-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={skillTransition}
      style={{ willChange: "transform" }}
      layout
    >
      {skill}
    </motion.div>
  );
};

export { AnimatedSkill, SkillGridItem, SkillComponent };
