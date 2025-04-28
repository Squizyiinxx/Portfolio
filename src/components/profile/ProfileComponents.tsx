import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { headingVariants, paragraphVariants } from "../transitions/Variants";

export const ProfileImage = memo(function ProfileImage() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        rotateX: 5,
        filter: "blur(6px) grayscale(60%)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px) grayscale(0%)",
      }}
      transition={{ duration: 1.2, delay: 0.5 }}
      whileHover={{
        scale: 1.05,
        rotateX: 8,
        rotateZ: -2,
        filter: "drop-shadow(0 0 16px rgba(255,255,255,0.25))",
      }}
      className="rounded-2xl w-[300px] h-[300px] md:w-[400px] md:h-[400px] shadow-xl overflow-hidden will-change-transform transform-gpu "
    >
      <Image
        src="/profile.webp"
        alt="Profile"
        width={400}
        height={400}
        priority
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 300px, 400px"
        loading="eager"
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRgIEAABXRUJQVlA4IPYDAADQEQCdASoxADEAPm0ukUakIqGhLhbbiIANiWQvvck03BG3q0qBevgYcCHAf24fmO85vTc953s+/dD975aw/1iBHlblBV8jr9F3QdjTUzDNJiZ6uN1IDM9MIE2A+XEYdyc+ZpfDuC9DL1G4o1NEh54wopbs73QLJc9pDiI0e445lFMzIhULp8nojyft9tYeixxM/vHd6soAAP6yy6KgviY/gRHY9vdJFR3Ohg9BD+/EgWxveYt0nmrTb6Af01yhIPXxEcf9KoB8NBQH+hnGFTTrovyBN5XTphfcrTZIWk+r5cPp386Tp9yD+wDxQbZ4CJR/gKaYXAX8OruXzTEYLrAeWye7DGHtQtRn7uPy8crm1ddY10fhcxrwc4BWhzD/AXlolDN7cdIHNVrudPSjIvGiC8v1Aqmvl8BJtyY/5/uc7QMecjk2rhPEhNjJwQSVIaskXiSdtGaPPk+09me+rB8svQW6J+j/SH6+ZcAfP9sSH2BYVvNQx9cYrGQkaAl665YDq+DWxXjfbgrjv6S0ev13mmuqUG4/OyAPMIr71PvwuXBI3RNCpZQsWD98bUdJBtcN75V7FqOmhvO2J7MGV+h0vs+ZyHObx1PejhaBIc1odZyIo4qoCyGi+Iw0dlx14CquzVbua1p6FWYhoETjdzaeykNA9Qr4gOWTsgNC97UUUeoHbkPCOrCpAIPkJ0UM/X3+3fg1zXLsl2lljbEn9OlQekr++ACfSbvmz25WofjJR1GUk+83hjm/E2TqSKRHrm8DOXKTkKgnRYi3snBu+ajjxZ7x+CaCybrMNC+lCif5aU2Rfa7ak5oSa3P74CT4tKC/P2ynczd7SJXzUcGFNQWukxvyh8DJ0CaMeaOrVz/++ZaubaKyOsqgBYsm7LDFRi2lpaz8tfP6joVxYUe8iTs+f3kRLe2IsUpukoigqviNA635Xx+AkAXHq5u90/iBpmbz52Lm/yIqrc07QVLAUq7mpp4zVLmlRK/i4Rygn/H5N/IR5Dsgs5XC5XTXpq10X12qiOzDgAqeIR/WDqqjyYWAp+QbqmQ1cP5IetDavwuIERUpp0fWVgVab38JiLTurs3by51fbxk2yfjgn5XMZS3MbHZN0qx3vh8W86kbsGKPT3u/BpHz4Hv9ndYDjHPzTdtssjM97w0SmjnZd0ke82aAYPmOoLyWOYa3XEsH+cRS+LkB90d7ou+LML8AUTrzM9uPQON+qh5gM++S5jLc/hkWwv688vSBcAazpeAIdW/eMB+Q1ii1d2qS00Q5Bg1H3EabnxDvhgh6RFPZaxgqdzBNVyj4P5OXnA9+x9GfoTt6ssuOydpuF3f7l3YE0vXfoe3ABLQQAAA="
      />
    </motion.div>
  );
});


export const ProfileText = memo(function ProfileText() {
  return (
    <>
      <motion.h1
        variants={headingVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="text-4xl font-semibold tracking-tight drop-shadow-[0_0_10px_rgba(255,255,0,0.8)] text-primary-300 text-center md:text-start"
      >
        Who I Am
      </motion.h1>
      <motion.p
        variants={paragraphVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.6 }}
        className="text-lg text-justify leading-relaxed text-slate-200"
      >
        Hey there! I&apos;m Jul, a Fullstack Developer with 3+ years of
        experience building scalable web apps. I handle both frontend and
        backend, crafting beautiful, responsive UIs with React and Next.js, and
        robust server-side solutions with Node.js, Laravel, TypeScript, and
        modern databases. My skills span UI animations, performance
        optimization, API design, authentication, and cloud integration. I focus
        on precision, performance, and delivering a great user experience.
      </motion.p>
    </>
  );
});



