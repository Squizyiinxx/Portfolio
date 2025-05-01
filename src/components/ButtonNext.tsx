"use client";

import { prefetchContact, prefetchWork } from "@/lib/prefetch";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";

const ButtonNext = ({
  setWorkShow,
  showWork,
  showContact,
}: {
  setWorkShow: () => void;
  showWork: boolean;
  showContact: boolean;
}) => {
  const controls = useAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };
  const buttonClass = useMemo(
    () =>
      `${
        showWork
          ? "w-auto h-auto p-3 right-[13%] top-12"
          : "w-[90px] h-[90px] px-2 right-20 top-20"
      } absolute transition-all duration-300 ease-in-out z-[9999] hover:scale-110 hover:-rotate-12 brightness-75 hover:brightness-100 rounded-full bg-primary-300 overflow-hidden group cursor-pointer hidden lg:inline breathing-glow`,
    [showWork]
  );

  const iconSize = useMemo(
    () => (showWork ? "w-6 h-6" : "w-20 h-20"),
    [showWork]
  );

  const iconRotation = useMemo(
    () => (showContact ? "rotate(180deg)" : "rotate(0deg)"),
    [showContact]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setRipple({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setTimeout(() => setRipple(null), 400);
      }
      setWorkShow();
    },
    [setWorkShow]
  );

  useEffect(() => {
    controls.start({
      rotate: [0, 3, -3, 0],
      transition: { repeat: Infinity, duration: 6, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <motion.button
      ref={buttonRef}
      title="button next"
      onMouseEnter={() => {
        if (!showWork) prefetchWork();
        else if (showWork && !showContact) prefetchContact();
      }}
      onMouseMove={handleMouseMove}
      style={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
      onMouseLeave={() => handleMouseLeave()}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.1,
        rotate: 7,
        boxShadow:
          "0px 0px 12px rgba(255,255,0,0.4), 0px 0px 20px rgba(255,255,0,0.3)",
      }}
      initial={{
        scale: 1,
        opacity: 1,
        y: -50,
      }}
      animate={{
        x: pos.x,
        y: pos.y,
      }}
      transition={{ type: "tween", delay: 0.7 }}
      className={buttonClass}
      aria-label="Next Section"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-500 blur-2xl opacity-30 pointer-events-none"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {ripple && (
        <motion.span
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: ripple.x - 40,
            top: ripple.y - 40,
            width: 80,
            height: 80,
          }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          exit={{ scale: 0, opacity: 0.7 }}
        />
      )}
      <motion.div animate={controls}>
        <ArrowRightIcon
          className={
            iconSize +
            " text-primary-500 transition-all duration-300 ease-in-out"
          }
          style={{ transform: iconRotation }}
        />
      </motion.div>
    </motion.button>
  );
};

export default ButtonNext;
