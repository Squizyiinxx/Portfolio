"use client";

import { memo } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ButtonCloseSectionProps {
  onClose: () => void;
  className?: string;
  title?: string;
}

const ButtonCloseSection = memo(
  ({ onClose, className = "", title = "Close" }: ButtonCloseSectionProps) => {
    return (
      <button
        type="button"
        onClick={onClose}
        title={title}
        aria-label={title}
        className={`group relative inline-flex cursor-pointer items-center justify-end p-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-300 ${className}`}
      >
        <XMarkIcon className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" />
      </button>
    );
  }
);

ButtonCloseSection.displayName = "ButtonCloseSection";

export default ButtonCloseSection;
