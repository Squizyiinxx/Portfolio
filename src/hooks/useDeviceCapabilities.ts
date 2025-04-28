"use client";

import {
  BatteryManager,
  DeviceCapabilities,
  DeviceCapabilitiesResult,
  NavigatorWithBattery,
  NavigatorWithConnection,
  NavigatorWithDeviceMemory,
  Options,
} from "@/types/interfaceDeviceCapabilities";
import { useState, useEffect } from "react";

/**
 * Hook untuk mendeteksi kemampuan perangkat
 * @param {Object} options - Opsi konfigurasi
 * @param {boolean} [options.detectOnMount=true] - Apakah mendeteksi saat mount
 * @param {boolean} [options.cacheTTL=3600000] - Waktu cache dalam ms (default: 1 jam)
 * @returns {DeviceCapabilitiesResult} Objek yang berisi informasi kemampuan perangkat
 */
export default function useDeviceCapabilities(
  options: Options = {}
): DeviceCapabilitiesResult {
  const { detectOnMount = true, cacheTTL = 3600000 } = options;

  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    performanceScore: 100,
    tier: "high",
    cpuCores: 4,
    memory: null,
    isLowEndDevice: false,
    isMobile: false,
    connection: null,
    batteryStatus: null,
    lastUpdated: null,
  });

  const detectCapabilities = (): DeviceCapabilities => {
    if (typeof window === "undefined") return capabilities;

    const cachedData = getCachedCapabilities();
    if (cachedData) {
      setCapabilities(cachedData);
      return cachedData;
    }

    const detectedCapabilities: DeviceCapabilities = {
      performanceScore: 100,
      tier: "high",
      cpuCores: 4,
      memory: null,
      isLowEndDevice: false,
      isMobile: false,
      connection: null,
      batteryStatus: null,
      lastUpdated: Date.now(),
    };

    if ("hardwareConcurrency" in navigator) {
      const cores = navigator.hardwareConcurrency;
      detectedCapabilities.cpuCores = cores;

      if (cores <= 2) {
        detectedCapabilities.performanceScore -= 30;
      } else if (cores <= 4) {
        detectedCapabilities.performanceScore -= 15;
      }
    }

    const navigatorWithMemory = navigator as NavigatorWithDeviceMemory;
    if (
      "deviceMemory" in navigator &&
      navigatorWithMemory.deviceMemory !== undefined
    ) {
      const memory = navigatorWithMemory.deviceMemory;
      detectedCapabilities.memory = memory;

      if (memory <= 2) {
        detectedCapabilities.performanceScore -= 30;
      } else if (memory <= 4) {
        detectedCapabilities.performanceScore -= 15;
      }
    }

    const pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio > 3) {
      detectedCapabilities.performanceScore -= 15;
    }
    const isMobile = window.innerWidth < 768;
    detectedCapabilities.isMobile = isMobile;
    if (isMobile) {
      detectedCapabilities.performanceScore -= 20;
    }
    const navigatorWithConnection = navigator as NavigatorWithConnection;
    if ("connection" in navigator && navigatorWithConnection.connection) {
      const { effectiveType, saveData } = navigatorWithConnection.connection;

      detectedCapabilities.connection = {
        type: effectiveType,
        saveData,
      };

      if (effectiveType === "3g" || effectiveType === "2g") {
        detectedCapabilities.performanceScore -= 15;
      }

      if (saveData) {
        detectedCapabilities.performanceScore -= 10;
      }
    }

    const navigatorWithBattery = navigator as NavigatorWithBattery;
    if ("getBattery" in navigator && navigatorWithBattery.getBattery) {
      navigatorWithBattery
        .getBattery()
        .then((battery: BatteryManager) => {
          detectedCapabilities.batteryStatus = {
            level: battery.level,
            charging: battery.charging,
          };

          if (battery.level < 0.15 && !battery.charging) {
            detectedCapabilities.performanceScore -= 15;
            updateCapabilitiesState(detectedCapabilities);
          }
        })
        .catch(() => {});
    }
    if (detectedCapabilities.performanceScore < 40) {
      detectedCapabilities.tier = "low";
      detectedCapabilities.isLowEndDevice = true;
    } else if (detectedCapabilities.performanceScore < 70) {
      detectedCapabilities.tier = "medium";
    }

    cacheCapabilities(detectedCapabilities);
    setCapabilities(detectedCapabilities);
    return detectedCapabilities;
  };

  const updateCapabilitiesState = (
    detectedCapabilities: DeviceCapabilities
  ) => {
    setCapabilities({ ...detectedCapabilities });
    cacheCapabilities(detectedCapabilities);
  };

  const getCachedCapabilities = (): DeviceCapabilities | null => {
    try {
      const cachedString = localStorage.getItem("device-capabilities");
      if (!cachedString) return null;

      const cached = JSON.parse(cachedString) as DeviceCapabilities;
      if (cached.lastUpdated && Date.now() - cached.lastUpdated > cacheTTL) {
        return null;
      }

      return cached;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const cacheCapabilities = (data: DeviceCapabilities): void => {
    try {
      localStorage.setItem("device-capabilities", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (detectOnMount) {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => detectCapabilities(), {
          timeout: 2000,
        });
      } else {
        setTimeout(detectCapabilities, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectOnMount]);

  return {
    ...capabilities,
    detect: detectCapabilities,
    getOptimalParticleCount: (maxCount = 30) => {
      const minCount = Math.max(3, Math.floor(maxCount * 0.1));
      return Math.floor(
        minCount + (capabilities.performanceScore / 100) * (maxCount - minCount)
      );
    },
  };
}
