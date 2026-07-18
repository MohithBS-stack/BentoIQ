"use client";

import { AlertCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { devLog } from "@/lib/logger";

export function EnvValidator({ children }: { children: React.ReactNode }) {
  const [missingVars, setMissingVars] = useState<string[]>([]);
  const hasLogged = useRef(false);

  useEffect(() => {
    const bentoUrl = process.env.NEXT_PUBLIC_BENTO_URL ?? process.env.BENTO_URL ?? process.env.NEXT_PUBLIC_BENTO_BASE_URL;
    const builderKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? process.env.BUILDER_API_KEY ?? process.env.NEXT_PUBLIC_BENTO_API_KEY;
    const parlayUrl = process.env.NEXT_PUBLIC_PARLAY_TOURNMENT_URL ?? process.env.PARLAY_TOURNMENT_URL;

    const required = [
      { key: "NEXT_PUBLIC_BUILDER_API_KEY", value: builderKey },
      { key: "NEXT_PUBLIC_BENTO_URL", value: bentoUrl },
      { key: "NEXT_PUBLIC_PARLAY_TOURNMENT_URL", value: parlayUrl },
      { key: "NEXT_PUBLIC_SUPABASE_URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL },
      { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY }
    ];

    const missing = required.filter(r => !r.value || r.value.trim() === "").map(r => r.key);
    
    if (missing.length > 0) {
      setMissingVars(missing);
    } else if (!hasLogged.current) {
      devLog("✓ Environment variables loaded");
      devLog("✓ Builder API Key detected", builderKey ? "Present" : "Missing");
      devLog("✓ Bento URL", bentoUrl);
      devLog("✓ Tournament URL", parlayUrl);
      hasLogged.current = true;
    }
  }, []);

  if (missingVars.length > 0) {
    return (
      <div className="min-h-screen w-full bg-[var(--bg-base)] flex flex-col items-center justify-center p-6 text-[var(--text-primary)]">
        <div className="glass-card max-w-xl w-full p-8 border-2 border-[var(--rose)] shadow-[8px_8px_0px_#da291c]">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-[var(--rose)] pb-4">
            <AlertCircle size={32} className="text-[var(--rose)]" />
            <h1 className="text-2xl font-black uppercase tracking-widest text-[var(--rose)]">Configuration Error</h1>
          </div>
          
          <p className="text-sm font-bold text-[var(--text-primary)] mb-4">
            BentoIQ failed to initialize because the following required environment variables are missing from your <code className="bg-[var(--bg-elevated)] px-2 py-1 border border-[var(--border-subtle)]">.env.local</code> file:
          </p>
          
          <ul className="space-y-2 mb-8">
            {missingVars.map(v => (
              <li key={v} className="text-xs font-mono font-bold bg-[var(--bg-elevated)] p-3 border-2 border-[var(--text-primary)]">
                {v}
              </li>
            ))}
          </ul>
          
          <p className="text-xs font-bold text-[var(--text-secondary)]">
            Please add these variables, restart your Next.js development server, and refresh this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
