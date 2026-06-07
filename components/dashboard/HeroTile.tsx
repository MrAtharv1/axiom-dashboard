"use client";

import { motion } from "framer-motion";
import { PlayCircle, Clock, Users } from "lucide-react";
import { getIcon, getCategoryStyle } from "@/lib/icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Course } from "@/types/database";

interface HeroTileProps {
  topCourse: Course;
  streak?: number;
}

export function HeroTile({ topCourse, streak }: HeroTileProps) {
  const Icon = getIcon(topCourse.icon_name);
  const catStyle = getCategoryStyle(topCourse.category);

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { boxShadow: "0 0 0 1px rgba(251,191,36,0.1), 0 4px 24px rgba(0,0,0,0.4)" },
        hover: { boxShadow: "0 0 0 1px rgba(251,191,36,0.25), 0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(251,191,36,0.08)" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative h-full min-h-[440px] rounded-3xl overflow-hidden cursor-pointer"
      style={{
  backgroundImage: `
    linear-gradient(135deg, rgba(10,11,18,0.92) 0%, rgba(16,18,26,0.88) 40%, rgba(8,9,14,0.95) 100%),
    url('/hero-bg.png')
  `,
  backgroundSize: "cover",
  backgroundPosition: "center top",
  border: "1px solid rgba(255,255,255,0.06)",
}}
      role="region"
      aria-label={`Featured course: ${topCourse.title}`}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)", filter: "blur(32px)" }}
        />
        <div
          className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7dd3fc 0%, transparent 70%)", filter: "blur(24px)" }}
        />
        <svg className="absolute right-0 top-0 opacity-[0.04]" width="200" height="200" viewBox="0 0 200 200" fill="none">
          {[0, 40, 80, 120, 160, 200].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="white" />
          ))}
          {[0, 40, 80, 120, 160, 200].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="white" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-6">
        {/* Top row — icon + category + resume button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.06) 100%)",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}
                style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                {topCourse.category ?? "Course"}
              </div>
              <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                FEATURED · CONTINUE
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.12) 100%)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fbbf24",
            }}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Resume
          </motion.button>
        </div>

        {/* Middle — welcome greeting + streak */}
        <div className="flex items-center gap-3">
          <div>
            <p
              className="text-[10px] text-white/30 uppercase tracking-widest mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Welcome back
            </p>
            <h2
              className="text-2xl lg:text-3xl font-bold text-white/90 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Atharv
            </h2>
          </div>

          {streak != null && streak > 0 && (
            <div
              className="ml-auto flex items-center gap-2 px-3 py-2 rounded-2xl flex-shrink-0"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.18)",
              }}
            >
              <span className="text-xl">🔥</span>
              <div>
                <p
                  className="text-lg font-bold text-amber-400 leading-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {streak}
                </p>
                <p
                  className="text-[10px] text-amber-400/50 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  day streak
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom — course info + progress */}
        <div>
          <p
            className="text-[10px] text-white/25 uppercase tracking-widest mb-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Continue learning
          </p>
          <h3
            className="text-base font-semibold text-white/70 mb-3 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {topCourse.title}
          </h3>

          {topCourse.description && (
            <p className="text-sm text-white/30 mb-4 line-clamp-1">{topCourse.description}</p>
          )}

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/30 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                  Progress
                </span>
                <span className="text-xs text-amber-400 font-medium" style={{ fontFamily: "var(--font-mono)" }}>
                  {topCourse.progress}%
                </span>
              </div>
              <ProgressBar progress={topCourse.progress} color="amber" height="sm" />
            </div>

            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-white/25">
                <Clock className="w-3 h-3" />
                <span className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                  {topCourse.total_lessons ?? 24}L
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-white/25">
                <Users className="w-3 h-3" />
                <span className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>2.4k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}