export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function severityColor(severity: "critical" | "warning" | "info"): string {
  switch (severity) {
    case "critical": return "#EF4444";
    case "warning": return "#F59E0B";
    case "info": return "#3B82F6";
  }
}

export function statusLabel(status: string): { label: string; color: string } {
  switch (status) {
    case "approved": return { label: "Approved", color: "#22C55E" };
    case "under_review": return { label: "Under Review", color: "#F59E0B" };
    case "needs_revision": return { label: "Needs Revision", color: "#EF4444" };
    case "exceeding": return { label: "Exceeding", color: "#22C55E" };
    case "on_track": return { label: "On Track", color: "#13DAEC" };
    case "underperforming": return { label: "Underperforming", color: "#F59E0B" };
    default: return { label: status, color: "#6C7C93" };
  }
}

export function churnColor(risk: "low" | "medium" | "high"): string {
  switch (risk) {
    case "low": return "#22C55E";
    case "medium": return "#F59E0B";
    case "high": return "#EF4444";
  }
}

export function scoreColor(score: number): string {
  if (score >= 75) return "#22C55E";
  if (score >= 50) return "#F59E0B";
  return "#EF4444";
}

export function toolColor(tool: string): string {
  switch (tool) {
    case "PostHog": return "#1D4AFF";
    case "Linear": return "#5E6AD2";
    case "Notion": return "#9B9B9B";
    case "Intercom": return "#1F8DED";
    case "HubSpot": return "#FF7A59";
    case "Slack": return "#E01E5A";
    case "GitHub": return "#9B9B9B";
    default: return "#6C7C93";
  }
}
