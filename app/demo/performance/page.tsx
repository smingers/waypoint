"use client";

import { SHIPPED_FEATURES } from "@/lib/demo/data";
import { formatDate, statusLabel } from "@/lib/demo/utils";
import { TrendUpIcon, TrendDownIcon, TrendFlatIcon, GitPrIcon } from "@/lib/demo/icons";

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendUpIcon />;
  if (trend === "down") return <TrendDownIcon />;
  return <TrendFlatIcon />;
}

export default function PerformancePage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          Automated performance monitoring of recent features, tracked across Linear, GitHub, and PostHog
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SHIPPED_FEATURES.map((feature) => {
          const status = statusLabel(feature.status);
          return (
            <div
              key={feature.id}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{feature.name}</h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: 6,
                      backgroundColor: "#5E6AD220",
                      color: "#8B8FE8",
                    }}
                  >
                    {feature.linearTicket}
                  </span>
                </div>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: `${status.color}18`,
                    color: status.color,
                  }}
                >
                  {status.label}
                </span>
              </div>

              <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 4px" }}>
                {feature.description}
              </p>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 16 }}>
                Launched {formatDate(feature.launchDate)} &middot; {feature.developmentDays} days development
              </div>

              {/* Metrics table */}
              <div style={{ borderRadius: 8, border: "1px solid var(--border)", overflow: "hidden", marginBottom: 16 }}>
                {/* Header row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
                    padding: "10px 16px",
                    backgroundColor: "var(--muted)",
                    borderBottom: "1px solid var(--border)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span>Metric</span>
                  <span>Baseline</span>
                  <span>Target</span>
                  <span>Actual</span>
                  <span></span>
                </div>
                {/* Data rows */}
                {feature.metrics.map((metric, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
                      padding: "12px 16px",
                      borderBottom: i < feature.metrics.length - 1 ? "1px solid var(--border)" : "none",
                      fontSize: 13,
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{metric.name}</span>
                    <span style={{ color: "var(--muted-foreground)" }}>{metric.baselineValue}</span>
                    <span style={{ color: "var(--muted-foreground)" }}>{metric.targetValue}</span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: metric.isPositive ? "#22C55E" : "#F59E0B",
                      }}
                    >
                      {metric.actualValue}
                    </span>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                      <TrendIcon trend={metric.trend} />
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "var(--muted-foreground)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <GitPrIcon />
                  <span>{feature.githubPrs} PRs merged</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {feature.contributors.map((name, i) => (
                    <div
                      key={i}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 600,
                        color: "var(--secondary-foreground)",
                        marginLeft: i > 0 ? -6 : 0,
                      }}
                      title={name}
                    >
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                  ))}
                  <span style={{ marginLeft: 4 }}>{feature.contributors.join(", ")}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
