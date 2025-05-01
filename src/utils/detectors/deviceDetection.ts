import { detectBattery } from "./battreyDetector";
import { runBaseDetection } from "./baseDetector";
import { DeviceCapabilities } from "@/types/interfaceDeviceCapabilities";
import { defaultCapabilities} from "@/store/DeviceCapabilities";

export async function detectCapabilities(): Promise<DeviceCapabilities> {
    if (typeof window === "undefined" || !navigator) {
      return {
        ...defaultCapabilities,
        lastUpdated: Date.now(),
      };
    }
  let base = runBaseDetection();
  base = await detectBattery(base);
  return base;
}

export function evaluateTier(
  score: number
): Pick<DeviceCapabilities, "tier" | "isLowEndDevice"> {
  if (score < 40) return { tier: "low", isLowEndDevice: true };
  if (score < 70) return { tier: "medium", isLowEndDevice: false };
  return { tier: "high", isLowEndDevice: false };
}
