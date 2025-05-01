import { useDeviceCapabilitiesStore } from "@/store/DeviceCapabilities";
import { useIdleCallback } from "@/hooks/useIdleCallback";

export type PreloadProps = {
  modules: (() => Promise<unknown>)[];
  criticalModules?: (() => Promise<unknown>)[];
  images?: string[];
  fonts?: string[];
};

export default function Preload({
  modules,
  criticalModules = [],
  images = [],
  fonts = [],
}: PreloadProps) {
  const tier = useDeviceCapabilitiesStore(
    (s) => s.capabilities?.tier || "medium"
  );

  const preloadModules = (mods: (() => Promise<unknown>)[]) => {
    return Promise.all(
      mods.map((fn) =>
        fn().catch((err) => console.error("Preload module error:", err))
      )
    );
  };

  const preloadAssets = () => {
    images.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
    fonts.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff2";
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  };

  const preloadAll = async () => {
    try {
      await preloadModules(criticalModules);
      if (tier !== "low") {
        await preloadModules(modules);
      }
      preloadAssets();
    } catch (error) {
      console.error("Preloading failed:", error);
    }
  };

  useIdleCallback(() => preloadAll(), { timeout: 300 }, []);

  return null;
}
