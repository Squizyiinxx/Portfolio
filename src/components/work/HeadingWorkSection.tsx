import React, { memo } from "react";
import { motion } from "framer-motion";

const HeadingWorkSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <h2 className="text-5xl font-bold mb-4 drop-shadow-xl">My Works</h2>
      <p className="text-lg text-slate-300 max-w-2xl">
        I create sleek, user-friendly web apps that blend form and function for
        smooth user experience.
      </p>
    </motion.div>
  );
};

export default memo(HeadingWorkSection);
