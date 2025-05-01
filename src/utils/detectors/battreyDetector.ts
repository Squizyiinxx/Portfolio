import {
  BatteryManager,
  DeviceCapabilities,
  NavigatorWithBattery,
} from "@/types/interfaceDeviceCapabilities";
import { evaluateTier } from "./deviceDetection";

export async function detectBattery(
  base: DeviceCapabilities
): Promise<DeviceCapabilities> {
  try {
    const nav = navigator as NavigatorWithBattery;
    if (!("getBattery" in nav) || typeof nav.getBattery !== "function")
      return base;

    const battery: BatteryManager = await nav.getBattery();
    const batteryStatus = {
      level: battery.level,
      charging: battery.charging,
    };

    let score = base.performanceScore;
    if (battery.level < 0.15 && !battery.charging) score -= 15;

    const { tier, isLowEndDevice } = evaluateTier(score);
    score = Math.max(0, score);
    return {
      ...base,
      batteryStatus,
      performanceScore: score,
      tier,
      isLowEndDevice,
    };
  } catch {
    return base;
  }
}


