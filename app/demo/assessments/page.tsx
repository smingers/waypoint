"use client";

import { PRD_ASSESSMENTS } from "@/lib/demo/data";
import { formatDate, statusLabel, scoreColor } from "@/lib/demo/utils";

function FitnessRing({ score, size = 56 }: { score: number; size?: number }) {
  const color = scoreColor(score);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.3,
          fontWeight: 700,
          color,
        }}
      >
        {score}
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>
          Automatic fitness analysis for proposed features from Linear
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {PRD_ASSESSMENTS.map((prd) => {
          const status = statusLabel(prd.status);
          return (
            <div
              key={prd.id}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                <FitnessRing score={prd.overallFitness} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
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
                      {prd.linearTicket}
                    </span>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                        backgroundColor: `${status.color}18`,
                        color: status.color,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{prd.title}</h3>
                  <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                    by {prd.author} &middot; Updated {formatDate(prd.lastUpdated)}
                  </div>
                </div>
              </div>

              {/* Profile fitness scores */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Profile Fitness
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {prd.profileFitness.map((pf) => {
                    const pfColor = scoreColor(pf.score);
                    return (
                      <div
                        key={pf.profileId}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 8,
                          backgroundColor: "var(--muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{pf.profileName}</span>
                          <span style={{ fontSize: 18, fontWeight: 700, color: pfColor }}>{pf.score}</span>
                        </div>
                        <div style={{ height: 3, borderRadius: 2, backgroundColor: "var(--border)", marginBottom: 8 }}>
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 2,
                              width: `${pf.score}%`,
                              backgroundColor: pfColor,
                            }}
                          />
                        </div>
                        <p style={{ fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.5, margin: 0 }}>
                          {pf.rationale}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths and Risks */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Key Strengths
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {prd.keyStrengths.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: "var(--secondary-foreground)", lineHeight: 1.5, display: "flex", gap: 8 }}>
                        <span style={{ color: "#22C55E", flexShrink: 0 }}>+</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#EF4444", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Key Risks
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {prd.keyRisks.map((r, i) => (
                      <div key={i} style={{ fontSize: 12, color: "var(--secondary-foreground)", lineHeight: 1.5, display: "flex", gap: 8 }}>
                        <span style={{ color: "#EF4444", flexShrink: 0 }}>!</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
