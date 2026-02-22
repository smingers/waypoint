"use client";

import { INSIGHTS, INSIGHT_STATS } from "@/lib/demo/data";
import { formatDate, severityColor, toolColor } from "@/lib/demo/utils";
import { LightbulbIcon } from "@/lib/demo/icons";

function StatCard({
  label,
  value,
  valueColor,
  sub,
}: {
  label: string;
  value: string | number;
  valueColor?: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "20px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: valueColor || "var(--foreground)", lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

function SourcePill({ tool }: { tool: string }) {
  const color = toolColor(tool);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        backgroundColor: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {tool}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: "critical" | "warning" | "info" }) {
  const color = severityColor(severity);
  const label = severity.charAt(0).toUpperCase() + severity.slice(1);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: `${color}18`,
        color: color,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
      {label}
    </span>
  );
}

export default function InsightsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          Scanning PostHog, Intercom, HubSpot, Notion, and Slack
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <StatCard label="Active Insights" value={INSIGHT_STATS.totalInsights} valueColor="var(--primary)" />
        <StatCard label="Critical" value={INSIGHT_STATS.criticalCount} valueColor="#EF4444" />
        <StatCard label="Avg. Resolution" value={`${INSIGHT_STATS.avgResolutionDays}d`} sub="days to resolve" />
        <StatCard label="Data Sources" value={INSIGHT_STATS.dataSourcesActive} valueColor="#22C55E" sub="all connected" />
      </div>

      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Insights</h2>
        <div
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            fontSize: 13,
            color: "var(--muted-foreground)",
            cursor: "default",
          }}
        >
          All Severities
        </div>
      </div>

      {/* Insight cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              borderLeft: `3px solid ${severityColor(insight.severity)}`,
              padding: "20px 24px",
              transition: "border-color 0.2s ease",
            }}
          >
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <SeverityBadge severity={insight.severity} />
              <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                {formatDate(insight.discoveredDate)}
              </span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
              {insight.title}
            </h3>

            {/* Source pills */}
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              {insight.sources.map((src, i) => (
                <SourcePill key={i} tool={src.tool} />
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: 13, color: "var(--secondary-foreground)", lineHeight: 1.6, margin: "0 0 16px" }}>
              {insight.description}
            </p>

            {/* Proposed action */}
            <div
              style={{
                display: "flex",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 8,
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ color: "var(--primary)", marginTop: 1, flexShrink: 0 }}>
                <LightbulbIcon size={15} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--primary)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Proposed Action
                </div>
                <p style={{ fontSize: 13, color: "var(--secondary-foreground)", lineHeight: 1.5, margin: 0 }}>
                  {insight.proposedAction}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: "flex", gap: 20, marginTop: 14, fontSize: 12, color: "var(--muted-foreground)" }}>
              <span>Affects ~{insight.affectedUsers}% of users</span>
              <span>
                Confidence: <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{insight.confidence}%</span>
              </span>
              <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
                {insight.sources.map((src, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {i > 0 && <span style={{ margin: "0 4px", opacity: 0.4 }}>|</span>}
                    <span style={{ fontSize: 11 }}>{src.detail}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
