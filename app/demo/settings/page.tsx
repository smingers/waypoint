"use client";

import { INTEGRATIONS } from "@/lib/demo/data";
import { formatDate } from "@/lib/demo/utils";
import { CheckCircleIcon } from "@/lib/demo/icons";

export default function SettingsPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          7 tools connected to your Paladin workspace
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {INTEGRATIONS.map((integration) => {
          const isDark = integration.iconColor === "#EFEFEF" || integration.iconColor === "#F0F0F0";
          return (
            <div
              key={integration.id}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "20px",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: isDark ? "#1E2836" : `${integration.iconColor}20`,
                    border: `1px solid ${isDark ? "var(--border)" : `${integration.iconColor}30`}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: integration.iconColor,
                    flexShrink: 0,
                  }}
                >
                  {integration.name.slice(0, 2)}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{integration.name}</h3>
                  <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{integration.category}</div>
                </div>
              </div>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <CheckCircleIcon />
                <span style={{ fontSize: 12, fontWeight: 500, color: "#22C55E" }}>Connected</span>
                <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                  since {formatDate(integration.connectedDate)}
                </span>
              </div>

              {/* Data synced */}
              <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 6, fontWeight: 500 }}>
                Data synced
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {integration.dataSynced.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      backgroundColor: "var(--muted)",
                      color: "var(--secondary-foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
