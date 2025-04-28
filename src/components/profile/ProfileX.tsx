"use client";
import React from "react";
import { motion } from "framer-motion";

const ProfileX = ({ setShowProfile } : { setShowProfile: () => void }) => {
  const baseClass =
    "absolute left-0 top-1/2 w-10 md:w-20 h-[2px] bg-primary-300 rounded transition-all duration-300 ease-in-out";

  return (
    <motion.button
      onClick={() => setShowProfile()}
      className="fixed top-10 right-10 z-50 group cursor-pointer h-10 md:h-30 flex items-center justify-center"
      initial={{ opacity: 0, rotate: -90, y: -20 }}
      animate={{ opacity: 1, rotate: 0, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass:  0.5,
        delay: 1,
      }}
      whileHover={{ scale: 1.1, rotate: 7 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Close Profile"
    >
      <div className="relative w-10 md:w-30 h-8">
        <span
          className={`${baseClass} rotate-45 group-hover:bg-red-400`}
          style={{ transformOrigin: "center" }}
        />
        <span
          className={`${baseClass} -rotate-45 group-hover:bg-red-400`}
          style={{ transformOrigin: "center" }}
        />
      </div>
    </motion.button>
  );
};

export default ProfileX;
