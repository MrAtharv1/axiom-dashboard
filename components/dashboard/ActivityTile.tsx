"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useState, useEffect } from "react";
import type { ActivityLog } from "@/types/database";

interface HeatmapCell {
  date: Date;
  intensity: number;
  isReal: boolean;
}

interface HeatmapRowProps {
  columns: HeatmapCell[][];
  labels: string[];
  startColIndex: number;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function buildHeatmap(logs: ActivityLog[]) {
  const COLS = 52;
  const ROWS = 7;
  const TOTAL_DAYS = COLS * ROWS;
  const DAY = 86400000;
  
  const now = new Date();
  const currentDayOfWeek = now.getDay();
  const daysToMonday = (currentDayOfWeek + 6) % 7; 
  const mostRecentMonday = new Date(now.getTime() - daysToMonday * DAY);
  mostRecentMonday.setHours(0, 0, 0, 0);
  
  const startDate = new Date(mostRecentMonday.getTime() - (COLS - 1) * 7 * DAY);

  const activeDates = new Set(
    logs.map((l) => new Date(l.created_at).toDateString())
  );

  const allDays: HeatmapCell[] = [];
  
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const date = new Date(startDate.getTime() + i * DAY);
    const dateStr = date.toDateString();
    const isReal = activeDates.has(dateStr);
    
    const seed = date.getTime();
    const r = seededRandom(seed);
    const r2 = seededRandom(seed + 1);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendPenalty = isWeekend ? 0.4 : 1;
    
    const active = isReal || (r < 0.55 * weekendPenalty);
    const intensity = isReal
      ? 0.65 + r2 * 0.35
      : active
      ? 0.1 + r2 * 0.5
      : 0.04;

    allDays.push({ date, intensity, isReal });
  }

  const columns = Array.from({ length: COLS }, (_, colIndex) =>
    allDays.slice(colIndex * 7, colIndex * 7 + 7)
  );

  const monthLabels: string[] = [];
  let lastMonth = -1;
  
  for (let c = 0; c < COLS; c++) {
    const cellDate = allDays[(c * 7) + 6].date;
    const m = cellDate.getMonth();
    
    if (m !== lastMonth && c < COLS - 1) {
      monthLabels.push(MONTHS[m]);
      lastMonth = m;
    } else {
      monthLabels.push("");
    }
  }

  return { columns, monthLabels };
}

function HeatmapRow({ columns, labels, startColIndex }: HeatmapRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex" style={{ paddingLeft: 10 }}>
        {labels.map((label, i) => (
          <div key={i} style={{ width: 14, flexShrink: 0 }}>
            <span
              className="text-[8px] text-white/25"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-start">
        <div className="flex flex-col" style={{ gap: 3, paddingTop: 1, width: 12 }}>
          {["M","","W","","F","",""].map((d, i) => (
            <div key={i} style={{ height: 11, display: "flex", alignItems: "center" }}>
              <span
                className="text-[7px] text-white/20"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {d}
              </span>
            </div>
          ))}
        </div>

        <div className="flex" style={{ gap: 3 }}>
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col" style={{ gap: 3 }}>
              {col.map((cell, rowIdx) => (
                <motion.div
                  key={rowIdx}
                  style={{
                    width: 16,
                    height: 12,
                    borderRadius: 2,
                    flexShrink: 0,
                    background: cell.isReal
                      ? `rgba(251,191,36,${cell.intensity})`
                      : cell.intensity > 0.05
                      ? `rgba(110,231,183,${cell.intensity})`
                      : "rgba(255,255,255,0.04)",
                    boxShadow:
                      cell.isReal && cell.intensity > 0.7
                        ? "0 0 5px rgba(251,191,36,0.25)"
                        : "none",
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.005 * ((startColIndex + colIdx) * 7 + rowIdx),
                    type: "spring",
                    stiffness: 300,
                    damping: 22,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ActivityTileProps {
  logs: ActivityLog[];
}

export function ActivityTile({ logs }: ActivityTileProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <article
        className="relative h-full min-h-[20rem] rounded-3xl overflow-hidden animate-pulse"
        style={{
          background: "linear-gradient(160deg, #0c0d14 0%, #07080c 100%)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
    );
  }

  const safeLogs = logs ?? [];
  const { columns, monthLabels } = buildHeatmap(safeLogs);

  const totalMinutes = safeLogs.reduce((s, l) => s + (l.duration_minutes ?? 0), 0);
  const totalHrs = (totalMinutes / 60).toFixed(1);
  const activeDayCount = new Set(
    safeLogs.map((l) => new Date(l.created_at).toDateString())
  ).size;

  const midPoint = Math.ceil(columns.length / 2);
  const row1Cols = columns.slice(0, midPoint);
  const row2Cols = columns.slice(midPoint);
  
  const row1Labels = monthLabels.slice(0, midPoint);
  const row2Labels = monthLabels.slice(midPoint);

  return (
    <article
      className="relative h-full min-h-[20rem] rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #0c0d14 0%, #07080c 100%)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="p-5 h-full flex flex-col gap-3">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-amber-400/60" />
            <span className="text-xs text-white/35 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Activity
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400/60 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex-1 rounded-xl px-3 py-2"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.1)" }}
          >
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              Hours
            </p>
            <p className="text-base font-bold text-amber-400 leading-none" style={{ fontFamily: "var(--font-mono)" }}>
              {totalHrs}
              <span className="text-[10px] text-amber-400/50 font-normal ml-1">hrs</span>
            </p>
          </div>
          <div
            className="flex-1 rounded-xl px-3 py-2"
            style={{ background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.1)" }}
          >
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              Days
            </p>
            <p className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-mono)", color: "#6ee7b7" }}>
              {activeDayCount}
              <span className="text-[10px] font-normal ml-1" style={{ color: "rgba(110,231,183,0.5)" }}>/364</span>
            </p>
          </div>
          <div
            className="flex-1 rounded-xl px-3 py-2"
            style={{ background: "rgba(125,211,252,0.06)", border: "1px solid rgba(125,211,252,0.1)" }}
          >
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              Sessions
            </p>
            <p className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-mono)", color: "#7dd3fc" }}>
              {safeLogs.length}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3">
          <HeatmapRow columns={row1Cols} labels={row1Labels} startColIndex={0} />
          <HeatmapRow columns={row2Cols} labels={row2Labels} startColIndex={midPoint} />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
            <span className="text-[9px] text-white/20 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              Less
            </span>
            <div className="flex items-center" style={{ gap: 3 }}>
              {[0.04, 0.15, 0.3, 0.55, 0.85].map((opacity, i) => (
                <div
                  key={i}
                  style={{
                    width: 11,
                    height: 11, 
                    borderRadius: 2,
                    background:
                      i < 2
                        ? `rgba(255,255,255,${opacity})`
                        : `rgba(251,191,36,${opacity})`,
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] text-white/20 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              More
            </span>
          </div>

        {safeLogs[0] && (
          <div
            className="flex items-center justify-between rounded-xl px-3 py-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-[11px] text-white/40 truncate flex-1">{safeLogs[0].action}</p>
            <span
              className="text-[10px] text-white/20 flex-shrink-0 ml-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {relativeTime(safeLogs[0].created_at)}
            </span>
          </div>
        )}

      </div>
    </article>
  );
}