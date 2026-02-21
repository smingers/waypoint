"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EXAMPLE_PRD = `# Feature: Smart Notifications System

## Overview
We want to build a smart notification system that uses ML to prioritize and bundle notifications for users. Currently, users receive too many notifications and often ignore important ones.

## Problem Statement
Our analytics show that 73% of push notifications are dismissed without being read. Users report "notification fatigue" in surveys. Key transactional notifications (payment confirmations, security alerts) are being missed because they're buried in a flood of less important notifications.

## Proposed Solution
Build an ML-powered notification ranking system that:
1. Scores each notification by predicted importance to the user
2. Bundles low-priority notifications into a daily digest
3. Ensures high-priority notifications (security, payments) always get through immediately
4. Learns from user behavior over time

## Success Metrics
- Increase notification read rate from 27% to 50%
- Reduce notification opt-out rate by 30%
- Maintain 99.9% delivery rate for critical notifications

## Timeline
- Phase 1 (4 weeks): Build scoring model and basic ranking
- Phase 2 (3 weeks): Add bundling/digest feature
- Phase 3 (2 weeks): Add feedback loop and personalization

## Team
- 2 backend engineers
- 1 ML engineer
- 1 product designer
- 1 QA engineer`;

export default function Home() {
  const [prd, setPrd] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prd.trim()) return;

    setLoading(true);
    setError("");
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prd: prd.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setAnalysis(data.analysis);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function loadExample() {
    setPrd(EXAMPLE_PRD);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(35, 39, 47, 0.5)" }}>
        <div className="mx-auto max-w-4xl px-6 py-5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="TrueNorth logo" className="h-8 w-8 rounded-lg object-contain" />
            <span className="font-bold text-lg" style={{ color: "#E7EBEF" }}>TrueNorth</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Input Section */}
        {!analysis && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3" style={{ color: "#E7EBEF" }}>
                Analyze your PRD
              </h2>
              <p style={{ color: "#6C7C93" }}>
                Paste your PRD, spec, or epic below. TrueNorth will surface hidden
                assumptions, forecast impact, identify failure modes, and
                brainstorm 10x alternatives.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                value={prd}
                onChange={(e) => setPrd(e.target.value)}
                placeholder="Paste your PRD here..."
                className="w-full h-80 px-4 py-3 text-sm leading-relaxed font-mono resize-y focus:outline-none"
                style={{
                  backgroundColor: "rgba(12, 14, 18, 0.8)",
                  color: "#E7EBEF",
                  border: "1px solid #23272F",
                  borderRadius: "12px",
                }}
                disabled={loading}
              />

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={loadExample}
                  className="text-sm underline underline-offset-2 transition-colors"
                  style={{ color: "#13DAEC" }}
                  disabled={loading}
                >
                  Load example PRD
                </button>

                <button
                  type="submit"
                  disabled={loading || !prd.trim()}
                  className="px-6 py-2.5 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#13DAEC",
                    color: "#0C0E12",
                    borderRadius: "12px",
                  }}
                >
                  {loading ? "Analyzing..." : "Analyze PRD"}
                </button>
              </div>
            </form>

            {/* Loading state */}
            {loading && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <div
                  className="h-8 w-8 animate-spin rounded-full border-2"
                  style={{ borderColor: "#23272F", borderTopColor: "#13DAEC" }}
                />
                <p className="text-sm" style={{ color: "#6C7C93" }}>
                  Analyzing your PRD — this typically takes 15-30 seconds...
                </p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div
                className="mt-6 px-4 py-3 text-sm"
                style={{
                  borderRadius: "12px",
                  border: "1px solid rgba(239, 67, 67, 0.3)",
                  backgroundColor: "rgba(239, 67, 67, 0.1)",
                  color: "#EF4343",
                }}
              >
                {error}
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {analysis && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: "#E7EBEF" }}>Analysis Results</h2>
                <p className="text-sm mt-1" style={{ color: "#6C7C93" }}>
                  Strategic review of your PRD
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-sm transition-colors"
                  style={{
                    border: "1px solid #23272F",
                    borderRadius: "12px",
                    color: "#6C7C93",
                  }}
                >
                  {copied ? "Copied!" : "Copy markdown"}
                </button>
                <button
                  onClick={() => {
                    setAnalysis("");
                    setPrd("");
                  }}
                  className="px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#13DAEC",
                    color: "#0C0E12",
                    borderRadius: "12px",
                  }}
                >
                  Analyze another
                </button>
              </div>
            </div>

            <article
              className="prose prose-invert prose-sm max-w-none p-8 prose-headings:text-[#E7EBEF] prose-p:text-[#9BA8B9] prose-strong:text-[#E7EBEF] prose-th:text-[#E7EBEF] prose-td:text-[#9BA8B9] prose-li:text-[#9BA8B9]"
              style={{
                border: "1px solid #23272F",
                borderRadius: "12px",
                backgroundColor: "rgba(12, 14, 18, 0.8)",
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
            </article>
          </div>
        )}
      </main>
    </div>
  );
}
