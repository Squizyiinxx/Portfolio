"use client";
import { useState, memo, FC, useCallback } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { m } from "framer-motion";
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

const Header: FC<HeaderProps> = ({ onShowContact, onShowWork }) => {
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
    <m.header
      {...headerMotionProps}
      className="absolute inset-x-0 top-0 z-50 w-full text-primary-500 transform-gpu"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 ">
        <div className="relative group flex items-center">
          <m.div
            className="relative rounded-full border-2 border-transparent transition-all duration-300 z-10 optimizing-transition"
            {...logoMotionProps}
          >
            <Image
              src="/logo.webp"
              alt="Logo SQU"
              width={45}
              height={45}
              priority
              className="h-auto w-auto select-none"
            />
          </m.div>
        </div>
        <span className="sr-only">SQU</span>
        <div className="flex lg:hidden">
          <m.button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-primary-500 bg-primary-300 hover:bg-amber-200 transition-all cursor-pointer duration-300 hover:scale-110"
            onClick={handleOpenMenu}
            whileTap={{ scale: [0.95] }}
            aria-label="Open menu"
          >
            <Bars3Icon
              className="h-10 w-10 text-primary-500"
              aria-hidden="true"
            />
          </m.button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <m.div
            key="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col p-8 gap-8 bg-primary-300 optimizing-transition"
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
          >
            <div className="flex items-center justify-between">
              <m.div
                className="relative rounded-full transition-all duration-300 z-10"
                {...logoMotionProps}
              >
                <Image
                  src="/logo.webp"
                  alt="Logo SQU"
                  width={40}
                  height={40}
                  className="w-auto h-auto select-none"
                  priority
                />
              </m.div>
              <span className="sr-only">SQU</span>
              <m.button
                type="button"
                className="rounded-md p-2.5 cursor-pointer optimizing-transition"
                onClick={handleCloseMenu}
                whileHover={{ scale: 1.2, rotate: 45 }}
                transition={{ duration: 0.3 }}
                aria-label="Close menu"
              >
                <XMarkIcon
                  className="h-6 w-6 text-primary-500"
                  aria-hidden="true"
                />
              </m.button>
            </div>

            <div className="flex flex-col gap-6 mt-12">
              {[
                {
                  label: "Work",
                  onClick: () => handleSelect(onShowWork),
                },
                {
                  label: "Contact",
                  onClick: () => handleSelect(onShowContact),
                },
              ].map(({ label, onClick }) => (
                <m.button
                  type="button"
                  key={label}
                  onClick={onClick}
                  className="w-full text-left rounded-lg px-4 py-4 text-xl font-bold leading-7 text-primary-500 bg-primary-300 hover:bg-amber-200 transition-colors duration-200 relative group overflow-hidden shadow-md"
                  whileHover={{
                    scale: 1.06,
                    x: 10,
                  }}
                >
                  {label}
                  <m.span
                    layoutId="mobile-work-underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ originX: 0 }}
                  />
                </m.button>
              ))}
            </div>
          </m.div>
        </>
      )}
    </m.header>
  );
};

export default memo(Header);
