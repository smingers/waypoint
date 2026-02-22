"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  InsightsIcon,
  ProfilesIcon,
  AssessmentsIcon,
  PerformanceIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  ShieldIcon,
} from "@/lib/demo/icons";

const NAV_ITEMS = [
  { href: "/demo/insights", label: "Insights", icon: InsightsIcon },
  { href: "/demo/profiles", label: "Profiles", icon: ProfilesIcon },
  { href: "/demo/assessments", label: "PRD Assessment", icon: AssessmentsIcon },
  { href: "/demo/performance", label: "Performance", icon: PerformanceIcon },
];

const PAGE_TITLES: Record<string, string> = {
  "/demo/insights": "Insights Discovery",
  "/demo/profiles": "Customer Profiles",
  "/demo/assessments": "PRD Assessment",
  "/demo/performance": "Feature Performance",
  "/demo/settings": "Integrations",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || "TrueNorth";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          minWidth: 240,
          backgroundColor: "var(--card)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px" }}>
          <Link
            href="/demo/insights"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "var(--foreground)",
            }}
          >
            <img
              src="/logo.png"
              alt="TrueNorth"
              style={{ width: 28, height: 28, borderRadius: 6 }}
            />
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
              TrueNorth
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0 8px" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`demo-nav-item${isActive ? " demo-nav-active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  marginBottom: 2,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div style={{ padding: "12px 8px 16px", borderTop: "1px solid var(--border)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              marginBottom: 8,
              marginLeft: 4,
              marginRight: 4,
              borderRadius: 8,
              backgroundColor: "hsl(185 40% 14%)",
              border: "1px solid hsl(185 40% 20%)",
              color: "var(--secondary-foreground)",
              cursor: "default",
            }}
          >
            <div style={{ color: "#13DAEC" }}>
              <ShieldIcon size={14} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Paladin</span>
          </div>
          <Link
            href="/demo/settings"
            className={`demo-nav-item${pathname === "/demo/settings" ? " demo-nav-active" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: pathname === "/demo/settings" ? 500 : 400,
              color: pathname === "/demo/settings" ? "var(--foreground)" : "var(--muted-foreground)",
              transition: "all 0.15s ease",
            }}
          >
            <SettingsIcon size={18} />
            Integrations
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header
          style={{
            height: 56,
            minHeight: 56,
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 16,
          }}
        >
          <h1 style={{ fontSize: 16, fontWeight: 600, margin: 0, whiteSpace: "nowrap" }}>
            {pageTitle}
          </h1>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 400, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 12px",
                borderRadius: 8,
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
              }}
            >
              <SearchIcon size={14} />
              <span style={{ fontSize: 13 }}>Search insights, profiles, features...</span>
            </div>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Notifications */}
            <div style={{ position: "relative", color: "var(--muted-foreground)", cursor: "default" }}>
              <BellIcon />
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#EF4444",
                  border: "2px solid var(--background)",
                }}
              />
            </div>

            {/* User */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "default" }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #13DAEC, #0BA5B5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0C0E12",
                }}
              >
                JB
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--secondary-foreground)" }}>
                Jordan
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: 24,
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
