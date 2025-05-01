
interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: ConnectionInfo;
}

interface Options {
  detectOnMount?: boolean;
  cacheTTL?: number;
}

interface ConnectionInfo {
  type: string;
  saveData: boolean;
  downlink?: number;
  rtt?: number;
}

interface BatteryInfo {
  level: number;
  charging: boolean;
}

interface DeviceCapabilities {
  performanceScore: number;
  tier: "high" | "medium" | "low";
  cpuCores: number;
  memory: number | null;
  isLowEndDevice: boolean;
  isMobile: boolean;
  connection: ConnectionInfo | null;
  batteryStatus: BatteryInfo | null;
  lastUpdated?: number | null;
}

interface DeviceCapabilitiesResult extends DeviceCapabilities {
  detect: () => DeviceCapabilities;
  getOptimalParticleCount: (maxCount?: number) => number;
}

export type {
  Options,
  DeviceCapabilities,
  DeviceCapabilitiesResult,
  ConnectionInfo,
  BatteryInfo,
  NavigatorWithDeviceMemory,
  NavigatorWithBattery,
  NavigatorWithConnection,
  BatteryManager
};