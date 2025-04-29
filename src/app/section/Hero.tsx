import HeroBackground from "@/components/hero/HeroBackground";
import ClientHeroContent from "@/components/hero/ClientHeroContent";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center h-[100dvh]"
      aria-label="Hero Section"
    >
      <HeroBackground />
      <div className="relative z-10 px-6 lg:px-8 flex flex-col items-center justify-center h-screen text-white text-center w-full">
        <ClientHeroContent />
      </div>
    </section>
  );
}
