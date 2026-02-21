import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrueNorth — PRD Analyzer",
  description:
    "AI-powered analysis of your PRDs. Surface hidden assumptions, forecast impact, and discover 10x alternatives.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} style={{ backgroundColor: "#0C0E12", color: "#E7EBEF" }}>
        {children}
      </body>
    </html>
  );
}
