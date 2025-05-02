import {
  DeviceCapabilities,
  NavigatorWithConnection,
  NavigatorWithDeviceMemory,
} from "@/types/interfaceDeviceCapabilities";
import { evaluateTier } from "./deviceDetection";

export function runBaseDetection(): DeviceCapabilities {
  let score = 100;

  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as NavigatorWithDeviceMemory).deviceMemory || null;
  const ratio = window.devicePixelRatio || 1;
  const isMobile = window.innerWidth < 768;

  if (cores <= 2) score -= 30;
  else if (cores <= 4) score -= 15;

  if (mem !== null) {
    if (mem <= 2) score -= 30;
    else if (mem <= 4) score -= 15;
  }

  if (ratio > 3) score -= 15;
  if (isMobile) score -= 20;

  const navConn = navigator as NavigatorWithConnection;
  const connection = navConn.connection
    ? {
        type: navConn.connection.type,
        saveData: navConn.connection.saveData,
        downlink: navConn.connection.downlink ?? 10,
        rtt: navConn.connection.rtt ?? 50,
      }
    : {
        type: "4g",
        saveData: false,
        downlink: 10,
        rtt: 50,
      };

  if (connection) {
    if (["2g", "3g"].includes(connection.type)) score -= 15;
    if (connection.saveData) score -= 10;
  }

  const { tier, isLowEndDevice } = evaluateTier(score);
  score = Math.max(0, score);
  return {
    performanceScore: score,
    tier,
    cpuCores: cores,
    memory: mem,
    isLowEndDevice,
    isMobile,
    connection,
    batteryStatus: null,
    fps: 60,
  };
}
