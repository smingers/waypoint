"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LOADING_MESSAGES: [string, string][] = [
  ["\u{1F50D}", "Reading between the lines of your PRD..."],
  ["\u{1F47B}", "Channeling the ghost of Steve Jobs..."],
  ["\u{1F914}", "Questioning every assumption you hold dear..."],
  ["\u{1F680}", "Imagining the 10x version of this..."],
  ["\u{1F3A4}", "Interviewing fictional users in our head..."],
  ["\u{1F4CA}", "Stress-testing your success metrics..."],
  ["\u{26B0}\uFE0F", "Drafting the pre-mortem no one asked for..."],
  ["\u{1F9D0}", "Wondering if you talked to actual customers..."],
  ["\u{1F575}\uFE0F", "Looking for the hidden assumptions..."],
  ["\u{1F31F}", "Brainstorming moonshot alternatives..."],
  ["\u{1F454}", "Checking if this would survive a board meeting..."],
  ["\u{1F3B2}", "Calculating the odds this ships on time..."],
  ["\u{1F4DD}", "Finding the things you forgot to write down..."],
  ["\u{1F624}", "Preparing opinions you didn't ask for..."],
];

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

function LoadingOverlay() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Randomize starting index on mount (client-only to avoid hydration mismatch)
    setIndex(Math.floor(Math.random() * LOADING_MESSAGES.length));

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "hsl(220 20% 6% / 0.85)" }}
    >
      <div className="flex flex-col items-center gap-8">
        <p
          className="text-4xl font-bold transition-opacity duration-300 text-center px-5 py-2 rounded-xl"
          style={{
            color: "var(--primary)",
            opacity: fade ? 1 : 0,
            backgroundColor: "var(--background)",
          }}
        >
          {LOADING_MESSAGES[index][1].split(" ")[0]}
        </p>
        <span
          className="transition-opacity duration-300 select-none animate-spin-slow"
          style={{ opacity: fade ? 1 : 0, fontSize: "6.5rem", lineHeight: 1 }}
        >
          {LOADING_MESSAGES[index][0]}
        </span>
        <p
          className="text-2xl font-bold transition-opacity duration-300 text-center px-5 py-2 rounded-xl max-w-[280px]"
          style={{
            color: "var(--muted-foreground)",
            opacity: fade ? 1 : 0,
            backgroundColor: "var(--background)",
          }}
        >
          {LOADING_MESSAGES[index][1].split(" ").slice(1).join(" ")}
        </p>
      </div>
    </div>
  );
}

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-screen loading overlay */}
      {loading && <LoadingOverlay />}

      {/* Background layers — grid + radial glow */}
      <div className="bg-grid fixed inset-0 z-0" />
      <div className="bg-radial-glow fixed inset-0 z-0" />

      {/* Floating decorative orbs */}
      <div
        className="animate-float pointer-events-none fixed top-1/4 left-8 z-0 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "hsl(185 85% 50% / 0.05)" }}
      />
      <div
        className="animate-float pointer-events-none fixed bottom-1/4 right-8 z-0 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: "hsl(38 95% 55% / 0.05)", animationDelay: "3s" }}
      />

      {/* Fixed header with backdrop blur — matches TrueNorth navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: "hsl(220 20% 6% / 0.8)",
          borderBottom: "1px solid hsl(220 15% 16% / 0.5)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="TrueNorth logo" className="h-8 w-8 rounded-lg object-contain" />
            <span className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              TrueNorth
            </span>
          </div>
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{
              color: "var(--primary)",
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            PRD Analyzer
          </span>
        </div>
      </header>

      {/* Main content — pushed below fixed header */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-16">
        {/* Input Section */}
        {!analysis && (
          <div>
            <div className="mb-8">
              <h2
                className="mb-3 text-3xl font-bold tracking-tight md:text-5xl"
                style={{ color: "var(--foreground)" }}
              >
                Analyze your PRD
              </h2>
              <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
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
                className="w-full h-80 px-4 py-3 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 transition-colors"
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  fontFamily: "var(--font-mono), monospace",
                  // @ts-expect-error CSS custom property for focus ring
                  "--tw-ring-color": "hsl(185 85% 50% / 0.5)",
                }}
                disabled={loading}
              />

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={loadExample}
                  className="text-sm underline underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: "var(--primary)" }}
                  disabled={loading}
                >
                  Load example PRD
                </button>

                <button
                  type="submit"
                  disabled={loading || !prd.trim()}
                  className="px-6 py-2.5 font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-primary hover:opacity-90"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {loading ? "Analyzing..." : "Analyze PRD"}
                </button>
              </div>
            </form>

            {/* Error state */}
            {error && (
              <div
                className="mt-6 px-4 py-3 text-sm"
                style={{
                  borderRadius: "var(--radius)",
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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "var(--foreground)" }}
                >
                  Analysis Results
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
                  Strategic review of your PRD
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-sm transition-colors hover:bg-white/5"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {copied ? "Copied!" : "Copy markdown"}
                </button>
                <button
                  onClick={() => {
                    setAnalysis("");
                    setPrd("");
                  }}
                  className="px-4 py-2 text-sm font-medium transition-all hover:opacity-90 glow-primary"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Analyze another
                </button>
              </div>
            </div>

            <article
              className="prose prose-invert prose-sm max-w-none p-8 prose-headings:text-[#E7EBEF] prose-p:text-[#9BA8B9] prose-strong:text-[#E7EBEF] prose-th:text-[#E7EBEF] prose-td:text-[#9BA8B9] prose-li:text-[#9BA8B9]"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
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
