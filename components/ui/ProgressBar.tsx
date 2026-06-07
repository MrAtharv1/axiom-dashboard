"use client";

import { motion } from "framer-motion";

type ProgressColor = "amber" | "ice" | "mint" | "rose" | "default";
type ProgressHeight = "sm" | "default" | "lg";

const colorStyles: Record<ProgressColor, { track: string; fill: string; glow: string }> = {
  amber: {
    track: "rgba(255,255,255,0.06)",
    fill: "linear-gradient(90deg, #d97706, #fbbf24, #fcd34d)",
    glow: "rgba(251,191,36,0.4)",
  },
  ice: {
    track: "rgba(255,255,255,0.06)",
    fill: "linear-gradient(90deg, #0ea5e9, #7dd3fc)",
    glow: "rgba(125,211,252,0.4)",
  },
  mint: {
    track: "rgba(255,255,255,0.06)",
    fill: "linear-gradient(90deg, #059669, #6ee7b7)",
    glow: "rgba(110,231,183,0.4)",
  },
  rose: {
    track: "rgba(255,255,255,0.06)",
    fill: "linear-gradient(90deg, #f43f5e, #fda4af)",
    glow: "rgba(253,164,175,0.4)",
  },
  default: {
    track: "rgba(255,255,255,0.06)",
    fill: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    glow: "rgba(139,92,246,0.4)",
  },
};

const heights: Record<ProgressHeight, string> = {
  sm: "h-1",
  default: "h-1.5",
  lg: "h-2",
};

interface ProgressBarProps {
  progress: number;
  color?: ProgressColor;
  height?: ProgressHeight;
  animated?: boolean;
}

export function ProgressBar({
  progress,
  color = "amber",
  height = "default",
  animated = true,
}: ProgressBarProps) {
  const c = colorStyles[color];
  const h = heights[height];
  const pct = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`relative ${h} rounded-full overflow-hidden w-full`}
      style={{ background: c.track }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Glow layer */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-30 blur-[2px]"
          style={{ background: c.fill }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 16,
            delay: 0.3,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main fill */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: c.fill }}
        initial={animated ? { scaleX: 0, originX: 0 } : { scaleX: pct / 100, originX: 0 }}
        animate={{ scaleX: pct / 100, originX: 0 }}
        transition={
          animated
            ? {
                type: "spring",
                stiffness: 80,
                damping: 16,
                delay: 0.35,
              }
            : { duration: 0 }
        }
      />

      {/* Shimmer sweep */}
      {animated && pct > 10 && (
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-y-0 w-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
            initial={{ left: "-20%" }}
            animate={{ left: "120%" }}
            transition={{
              delay: 1.2,
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </div>
  );
}
