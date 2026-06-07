"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type StatColor = "amber" | "mint" | "ice" | "rose";

const colorMap: Record<StatColor, { text: string; bg: string; border: string; glow: string }> = {
  amber: {
    text: "text-amber-400",
    bg: "rgba(251,191,36,0.06)",
    border: "rgba(251,191,36,0.12)",
    glow: "rgba(251,191,36,0.04)",
  },
  mint: {
    text: "text-mint",
    bg: "rgba(110,231,183,0.06)",
    border: "rgba(110,231,183,0.12)",
    glow: "rgba(110,231,183,0.04)",
  },
  ice: {
    text: "text-ice",
    bg: "rgba(125,211,252,0.06)",
    border: "rgba(125,211,252,0.12)",
    glow: "rgba(125,211,252,0.04)",
  },
  rose: {
    text: "text-rose",
    bg: "rgba(253,164,175,0.06)",
    border: "rgba(253,164,175,0.12)",
    glow: "rgba(253,164,175,0.04)",
  },
};

interface StatCardProps {
  label: string;
  value: string;
  suffix: string;
  trend: string;
  color: StatColor;
}

function AnimatedNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctrl = animate(motionVal, value, {
      duration: 1.4,
      ease: "easeOut",
      delay: 0.5,
    });
    return ctrl.stop;
  }, [motionVal, value]);

  return (
    <motion.span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {rounded}
    </motion.span>
  );
}

export function StatCard({ label, value, suffix, trend, color }: StatCardProps) {
  const c = colorMap[color];
  const numericVal = parseInt(value.replace(/,/g, ""), 10);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="relative rounded-2xl overflow-hidden h-24 cursor-default gpu"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <span
          className="mono-tag text-white/30 text-[10px]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label.toUpperCase()}
        </span>

        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-2xl font-bold ${c.text} display-number`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {isNaN(numericVal) ? value : <AnimatedNumber value={numericVal} />}
          </span>
          <span className={`text-xs ${c.text} opacity-60`}>{suffix}</span>
        </div>

        <span className="text-[10px] text-white/25 truncate">
          {trend}
        </span>
      </div>

      {/* Glow bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.border}, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
