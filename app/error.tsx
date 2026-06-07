"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose/10 border border-rose/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-7 h-7 text-rose" />
        </div>

        {/* Title */}
        <h1
          className="text-2xl font-display font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          System fault
        </h1>

        {/* Message */}
        <p className="text-white/40 text-sm mb-2">
          The dashboard encountered an unexpected error.
        </p>
        {error.message && (
          <p className="mono-tag text-rose/60 mb-8 bg-rose/5 border border-rose/10 rounded-lg px-4 py-2">
            {error.message}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 hover:border-amber-400/40 text-amber-400 rounded-xl text-sm font-medium transition-all duration-200 focus-ring"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>

        {/* Digest */}
        {error.digest && (
          <p className="mt-6 mono-tag text-white/20">
            ref: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
