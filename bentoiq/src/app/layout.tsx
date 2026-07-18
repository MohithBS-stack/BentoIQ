import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppShell }  from "@/components/layout/app-shell";
import { EnvValidator } from "@/components/providers/env-validator";

export const metadata: Metadata = {
  title: {
    default:  "BentoIQ — Collective Intelligence for Better Decisions",
    template: "%s | BentoIQ",
  },
  description:
    "BentoIQ is an AI-powered collective decision intelligence platform built on Bento Prediction Markets. Forecast outcomes, gain AI-driven insights, and make smarter decisions together.",
  keywords: [
    "prediction markets", "collective intelligence", "AI insights",
    "decision intelligence", "BentoIQ", "forecasting",
  ],
  authors:  [{ name: "BentoIQ Team" }],
  robots:   { index: true, follow: true },
  openGraph: {
    type:        "website",
    siteName:    "BentoIQ",
    title:       "BentoIQ — Collective Intelligence for Better Decisions",
    description: "AI-powered collective decision intelligence platform.",
    locale:      "en_US",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "BentoIQ",
    description: "Collective Intelligence for Better Decisions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div className="premium-bg-wrapper">
          <div className="ambient-light light-1" />
          <div className="ambient-light light-2" />
          <div className="ambient-light light-3" />
          <div className="noise-overlay" />
        </div>
        <Providers>
          <EnvValidator>
            <AppShell>
              {children}
            </AppShell>
          </EnvValidator>
        </Providers>
      </body>
    </html>
  );
}
