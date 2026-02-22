export interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  connectedDate: string;
  dataSynced: string[];
  status: "connected" | "disconnected";
  iconColor: string;
}

export interface Insight {
  id: string;
  title: string;
  severity: "critical" | "warning" | "info";
  sources: { tool: string; detail: string }[];
  description: string;
  proposedAction: string;
  discoveredDate: string;
  affectedUsers: number;
  confidence: number;
}

export interface InsightStats {
  totalInsights: number;
  criticalCount: number;
  avgResolutionDays: number;
  dataSourcesActive: number;
}

export interface CustomerProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: { initials: string; color: string };
  jtbdStatements: string[];
  prevalence: number;
  satisfactionScore: number;
  metrics: {
    avgSessionDuration: string;
    weeklyActiveRate: number;
    supportTicketsPerMonth: number;
    churnRisk: "low" | "medium" | "high";
    npsScore: number;
  };
  topPainPoints: string[];
}

export interface PrdAssessment {
  id: string;
  title: string;
  status: "under_review" | "approved" | "needs_revision";
  linearTicket: string;
  author: string;
  overallFitness: number;
  profileFitness: {
    profileId: string;
    profileName: string;
    score: number;
    rationale: string;
  }[];
  keyStrengths: string[];
  keyRisks: string[];
  lastUpdated: string;
}

export interface ShippedFeature {
  id: string;
  name: string;
  description: string;
  linearTicket: string;
  launchDate: string;
  developmentDays: number;
  status: "exceeding" | "on_track" | "underperforming";
  metrics: {
    name: string;
    targetValue: string;
    baselineValue: string;
    actualValue: string;
    unit: string;
    trend: "up" | "down" | "flat";
    isPositive: boolean;
  }[];
  githubPrs: number;
  contributors: string[];
}
