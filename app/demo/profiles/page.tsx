"use client";

import { CUSTOMER_PROFILES } from "@/lib/demo/data";
import { scoreColor, churnColor } from "@/lib/demo/utils";

function MetricItem({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 600 }}>
        {value}
        {sub && <span style={{ fontSize: 11, fontWeight: 400, color: "var(--muted-foreground)", marginLeft: 2 }}>{sub}</span>}
      </div>
    </div>
  );
}

export default function ProfilesPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          Verified user personas + their top product needs - generated from your data from PostHog, Intercom, HubSpot, and Notion
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {CUSTOMER_PROFILES.map((profile) => (
          <div
            key={profile.id}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "24px",
              transition: "border-color 0.2s ease",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: `${profile.avatar.color}20`,
                  border: `2px solid ${profile.avatar.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: profile.avatar.color,
                  flexShrink: 0,
                }}
              >
                {profile.avatar.initials}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{profile.name}</h3>
                <div style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>{profile.title}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginBottom: 16, paddingLeft: 58 }}>
              {profile.company}
            </div>

            {/* Prevalence bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: "var(--muted-foreground)" }}>Prevalence in user base</span>
                <span style={{ fontWeight: 600 }}>{profile.prevalence}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, backgroundColor: "var(--muted)" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    width: `${profile.prevalence}%`,
                    backgroundColor: profile.avatar.color,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

            {/* JTBD */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Jobs to be Done
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {profile.jtbdStatements.map((stmt, i) => (
                  <div key={i} style={{ fontSize: 13, color: "var(--secondary-foreground)", lineHeight: 1.5, display: "flex", gap: 8 }}>
                    <span style={{ color: "var(--muted-foreground)", flexShrink: 0 }}>&ldquo;</span>
                    <span>{stmt}&rdquo;</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "var(--border)", margin: "16px 0" }} />

            {/* Metrics grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Satisfaction
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: scoreColor(profile.satisfactionScore) }}>
                  {profile.satisfactionScore}
                </div>
              </div>
              <MetricItem label="Session Avg" value={profile.metrics.avgSessionDuration} />
              <MetricItem label="Weekly Active" value={`${profile.metrics.weeklyActiveRate}%`} />
              <MetricItem label="Tickets/mo" value={profile.metrics.supportTicketsPerMonth} />
              <div>
                <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Churn Risk
                </div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: `${churnColor(profile.metrics.churnRisk)}18`,
                    color: churnColor(profile.metrics.churnRisk),
                    textTransform: "capitalize",
                  }}
                >
                  {profile.metrics.churnRisk}
                </span>
              </div>
              <MetricItem label="NPS" value={profile.metrics.npsScore} />
            </div>

            {/* Pain points */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Top Pain Points
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {profile.topPainPoints.map((point, i) => (
                  <div key={i} style={{ fontSize: 12, color: "var(--secondary-foreground)", lineHeight: 1.5, display: "flex", gap: 8 }}>
                    <span style={{ color: "#EF4444", flexShrink: 0, fontSize: 10, marginTop: 2 }}>&#9679;</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
