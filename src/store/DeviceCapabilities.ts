import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { detectCapabilities } from "@/utils/detectors/deviceDetection";
import { DeviceCapabilitiesStore, DeviceCapabilities } from "@/types/interface";

const CACHE_KEY = "device-capabilities-v2";
const TTL = 1000 * 60 * 60;

const fallbackStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const defaultCapabilities: DeviceCapabilities = {
  performanceScore: 100,
  tier: "high",
  cpuCores: 4,
  memory: 4,
  isLowEndDevice: false,
  isMobile: false,
  connection: {
    type: "4g",
    downlink: 10,
    rtt: 50,
    saveData: false,
  },
  batteryStatus: {
    charging: true,
    level: 1,
  },
  lastUpdated: null,
};
let debounceTimer: NodeJS.Timeout | null = null;

export const useDeviceCapabilitiesStore = create<DeviceCapabilitiesStore>()(
  persist(
    (set, get) => ({
      capabilities: defaultCapabilities,
      hasDetected: false,
      setCapabilities: (cap) => set({ capabilities: cap }),
      setHasDetected: (val: boolean) => set({ hasDetected: val }),

      detectCapabilities: async ({ force = false }:{ force?: boolean} = {}) => {
        const now = Date.now();
        const { capabilities } = get();
        const isExpired =
          !capabilities.lastUpdated || now - capabilities.lastUpdated > TTL;

        if (!force && !isExpired) return capabilities;

        if (debounceTimer) clearTimeout(debounceTimer);

        return new Promise((resolve) => { 
          debounceTimer = setTimeout(async () => {
            try {
              const detected = await detectCapabilities(); 
              const updated = { ...detected, lastUpdated: Date.now() };

              set({
                capabilities: updated,
                hasDetected: true,
              });

              resolve(updated);
            } catch (err) {
              console.error("Device detection failed:", err);
              resolve(capabilities);
            }
          }, 300);
        });
      },
      getOptimalParticleCount: (maxCount = 30) => {
        const { performanceScore } = get().capabilities;
        const min = Math.max(3, Math.floor(maxCount * 0.1));
        return Math.floor(min + (performanceScore / 100) * (maxCount - min));
      },
    }),
    {
      name: CACHE_KEY,
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : fallbackStorage,
    }
  )
);
