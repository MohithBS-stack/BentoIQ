import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center text-center p-6">
      <div>
        <p className="text-8xl font-black text-[var(--text-primary)]/5 mb-2">404</p>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Page Not Found</h1>
        <p className="text-[var(--text-secondary)] opacity-70 text-sm mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-[var(--text-primary)] text-sm font-semibold transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
