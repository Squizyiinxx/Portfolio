"use client";
import { useState, memo, FC, useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { motion  } from "framer-motion";
import {
  menuVariants,
  overlayVariants,
} from "@/components/transitions/Variants";
import {
  headerMotionProps,
  logoHoverEffect,
  logoMotionProps,
} from "@/components/transitions/variantHeader";
import { usePanel } from "@/hooks/usePanel";
import { HeaderProps } from "@/types/interface";

const Header: FC<HeaderProps> = ({onShowContact,onShowWork}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleOpenMenu = useCallback(() => setMobileMenuOpen(true), []);
  const handleCloseMenu = useCallback(() => setMobileMenuOpen(false), []);
  
  const handleSelect = useCallback((action: () => void) => {
    action();
    setMobileMenuOpen(false);
  }, []);
  const { panel } = usePanel();
  if (panel.profile) return;

  return (
    <motion.header
      {...headerMotionProps}
      className="absolute inset-x-0 top-0 z-50 w-full text-primary-500 transform-gpu"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 transition-all duration-500">
        <div className="relative group flex items-center">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 will-change-transform transform-gpu translate-z-0"
            initial={{ opacity: 0.5, scale: 1 }}
            whileHover={logoHoverEffect}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            aria-hidden="true"
          >
            <Image
              src="/logo.webp"
              alt="Logo SQU Glow"
              width={60}
              height={60}
              priority
              className="select-none"
              draggable={false}
            />
          </motion.div>
          <motion.div
            className="relative rounded-full border-2 border-transparent transition-all duration-300 shadow-lg z-10 transform-gpu will-change-transform translate-z-0"
            {...logoMotionProps}
          >
            <Image
              src="/logo.webp"
              alt="Logo SQU"
              width={45}
              height={45}
              priority
              className="h-auto w-auto select-none"
              draggable={false}
            />
          </motion.div>
        </div>
        <span className="sr-only">SQU</span>
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-primary-500 bg-primary-300 hover:bg-amber-200 transition cursor-pointer transform duration-300 hover:scale-110"
            onClick={handleOpenMenu}
            whileTap={{ scale: [0.95] }}
            aria-label="Open menu"
          >
            <Bars3Icon
              className="h-10 w-10 text-primary-500"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40"
            initial="closed"
            animate="open"
            exit="exit"
            variants={overlayVariants}
            style={{
              background: "#000",
              pointerEvents: mobileMenuOpen ? "auto" : "none",
            }}
            onClick={handleCloseMenu}
          />
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col p-8 gap-8 bg-primary-300 text-primary-500"
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
          >
            <div className="flex items-center justify-between">
              <div className="relative group flex items-center">
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                  initial={{ opacity: 0.5, scale: 1 }}
                  whileHover={logoHoverEffect}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  aria-hidden="true"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo SQU Glow"
                    width={52}
                    height={52}
                    priority
                    className="select-none blur-[7px] brightness-[2.2] saturate-200 drop-shadow-[0_0_28px_rgba(252,191,0,0.7)]"
                    draggable={false}
                  />
                </motion.div>
                <motion.div
                  className="relative rounded-full transition-all duration-300 z-10"
                  {...logoMotionProps}
                >
                  <Image
                    src="/logo.png"
                    alt="Logo SQU"
                    width={40}
                    height={40}
                    className="w-auto h-auto select-none"
                    priority
                    draggable={false}
                  />
                </motion.div>
              </div>
              <span className="sr-only">SQU</span>

              <motion.button
                type="button"
                className="rounded-md p-2.5 text-primary-50 transition cursor-pointer transform hover:scale-110 hover:rotate-45 duration-300"
                onClick={handleCloseMenu}
                whileHover={{ scale: 1.2, rotate: 45 }}
                transition={{ duration: 0.3 }}
                aria-label="Close menu"
              >
                <XMarkIcon
                  className="h-6 w-6 text-primary-500"
                  aria-hidden="true"
                />
              </motion.button>
            </div>

            <div className="flex flex-col gap-6 mt-12">
              <motion.button
                type="button"
                onClick={() => handleSelect(onShowWork)}
                className="w-full text-left rounded-lg px-4 py-4 text-xl font-bold leading-7 text-primary-500 bg-primary-300 hover:bg-amber-200 transition-colors duration-200 relative group overflow-hidden shadow-md"
                whileHover={{
                  scale: 1.06,
                  x: 10,
                }}
              >
                Work
                <motion.span
                  layoutId="mobile-work-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ originX: 0 }}
                />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleSelect(onShowContact)}
                className="w-full text-left rounded-lg px-4 py-4 text-xl font-bold leading-7 text-primary-500 bg-primary-300 hover:bg-amber-200 transition-colors duration-200 relative group overflow-hidden shadow-md"
                whileHover={{
                  scale: 1.06,
                  x: 10,
                }}
              >
                Contact
                <motion.span
                  layoutId="mobile-contact-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ originX: 0 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  );
};

export default memo(Header);
