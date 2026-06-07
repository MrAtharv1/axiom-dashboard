"use client";

import { motion } from "framer-motion";
import { getIcon, getCategoryStyle } from "@/lib/icons";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cardHover } from "@/lib/motion";
import type { Course } from "@/types/database";

// Per-card accent colors cycling
const cardAccents = [
  {
    bg: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.03) 100%)",
    iconBg: "rgba(251,191,36,0.1)",
    iconBorder: "rgba(251,191,36,0.2)",
    iconColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.06)",
    progressColor: "amber" as const,
  },
  {
    bg: "linear-gradient(135deg, rgba(125,211,252,0.06) 0%, rgba(14,165,233,0.02) 100%)",
    iconBg: "rgba(125,211,252,0.1)",
    iconBorder: "rgba(125,211,252,0.2)",
    iconColor: "#7dd3fc",
    glowColor: "rgba(125,211,252,0.05)",
    progressColor: "ice" as const,
  },
  {
    bg: "linear-gradient(135deg, rgba(110,231,183,0.06) 0%, rgba(16,185,129,0.02) 100%)",
    iconBg: "rgba(110,231,183,0.1)",
    iconBorder: "rgba(110,231,183,0.2)",
    iconColor: "#6ee7b7",
    glowColor: "rgba(110,231,183,0.05)",
    progressColor: "mint" as const,
  },
  {
    bg: "linear-gradient(135deg, rgba(253,164,175,0.06) 0%, rgba(244,63,94,0.02) 100%)",
    iconBg: "rgba(253,164,175,0.1)",
    iconBorder: "rgba(253,164,175,0.2)",
    iconColor: "#fda4af",
    glowColor: "rgba(253,164,175,0.05)",
    progressColor: "rose" as const,
  },
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const accent = cardAccents[index % cardAccents.length];
  const Icon = getIcon(course.icon_name);
  const catStyle = getCategoryStyle(course.category);
  const completedRatio =
    course.completed_lessons && course.total_lessons
      ? `${course.completed_lessons}/${course.total_lessons}`
      : null;

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="relative h-64 rounded-3xl overflow-hidden cursor-pointer noise gpu"
      style={{
        background: accent.bg,
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",
      }}
      role="article"
      aria-label={`Course: ${course.title}, ${course.progress}% complete`}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent.iconColor}20 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: accent.iconBg,
              border: `1px solid ${accent.iconBorder}`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: accent.iconColor }} />
          </div>

          {/* Category badge */}
          <div
            className={`px-2.5 py-1 rounded-lg mono-tag text-xs border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}
          >
            {course.category ?? "Course"}
          </div>
        </div>

        {/* Body */}
        <div>
          <h3
            className="text-base font-semibold text-white/85 mb-1.5 leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {course.title}
          </h3>

          {course.description && (
            <p className="text-xs text-white/30 mb-4 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          )}

          {/* Progress section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="mono-tag text-white/25 text-[10px]">
                {completedRatio ? `${completedRatio} lessons` : "PROGRESS"}
              </span>
              <motion.span
                className="mono-tag text-xs font-semibold"
                style={{
                  color: accent.iconColor,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {course.progress}%
              </motion.span>
            </div>

            <ProgressBar
              progress={course.progress}
              color={accent.progressColor}
              height="default"
            />
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.iconColor}30, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
