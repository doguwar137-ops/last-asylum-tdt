export interface DuelDay {
  id: string;
  dayIndex: number; // 0 = Mon, 1 = Tue, ... 6 = Sun
  name: string;
  phaseName: string;
  phaseNumber: number;
  badge: string;
  iconName: string;
  focus: string;
  falconRule: {
    action: "HOLD" | "CLAIM" | "CLAIM_PREVIOUS" | "CLAIM_ALL" | "HOLD_FOR_NEXT";
    title: string;
    description: string;
    warning?: string;
  };
  allowedActions: string[];
  forbiddenActions: string[];
  tips: string[];
  recommendedSpeedups: string[];
  pointsOpportunities: {
    activity: string;
    pointsEstimate: string;
    priority: "HIGH" | "MEDIUM" | "CRITICAL";
  }[];
  accumulation?: {
    item: string;
    targetDay: string;
    description: string;
  }[];
  shortChatTemplate?: string;
  exactMailTemplate?: string;
}

export interface HeroInfo {
  id: string;
  name: string;
  role: string;
  position: string;
  elementOrType: string;
  avatarBg: string;
  priorityScore: number;
  keySkills: string[];
  gearFocus: string;
  urEquipment?: string;
  tacticalNote: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: string;
}

export interface PointCategory {
  id: string;
  name: string;
  unit: string;
  pointsPerUnit: number;
  count: number;
  daySpecific?: number; // matching dayIndex
}
