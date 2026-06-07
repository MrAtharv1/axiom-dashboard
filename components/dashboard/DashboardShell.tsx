"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { StatCard } from "@/components/dashboard/StatCard";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { Course, DashboardStats, ActivityLog } from "@/types/database";

// Lightweight inline skeleton used inside the Suspense boundary
function TileSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-3xl skeleton ${className}`}
      aria-hidden="true"
    />
  );
}

interface DashboardShellProps {
  courses: Course[];
  stats: DashboardStats;
  logs: ActivityLog[];
}

export function DashboardShell({ courses, stats, logs }: DashboardShellProps) {
  const safeCourses = courses.length > 0 ? courses : [];
  const heroCourse = safeCourses[0] ?? null;

  return (
    <div className="flex min-h-screen bg-void-950">
      <Sidebar />

      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <header className="px-6 lg:px-8 pt-8 pb-6 flex items-center justify-between">
          <div>
            <p
              className="text-[10px] text-amber-400/50 uppercase tracking-widest mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ◈ AXIOM / DASHBOARD
            </p>
            <h1
              className="text-2xl lg:text-3xl font-bold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Overview
            </h1>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            ↓ Download Report
          </button>
        </header>

        <section className="px-6 lg:px-8 pb-8">
          {/* Stat row — wrapped in Suspense so it can stream independently */}
          <Suspense
            fallback={
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {[...Array(4)].map((_, i) => (
                  <TileSkeleton key={i} className="h-24 rounded-2xl" />
                ))}
              </div>
            }
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5"
            >
              <motion.div variants={staggerItem}>
                <StatCard label="Active" value={stats.totalCourses.toString()} suffix="courses" trend="In progress" color="ice" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatCard label="Accuracy" value="94" suffix="%" trend="vs last week" color="mint" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatCard label="Session" value="2.5" suffix="hrs" trend="Avg daily" color="amber" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatCard label="Streak" value={stats.streak.toString()} suffix="days" trend="Personal best" color="rose" />
              </motion.div>
            </motion.div>
          </Suspense>

          {/* Bento grid — wrapped in its own Suspense boundary */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
                <TileSkeleton className="md:col-span-2 lg:col-span-2 row-span-2 min-h-[440px]" />
                <TileSkeleton className="md:col-span-2 lg:col-span-1 row-span-2 min-h-[440px]" />
                {[...Array(3)].map((_, i) => (
                  <TileSkeleton key={i} className="h-64" />
                ))}
              </div>
            }
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]"
            >
              {/* Hero — 2 cols × 2 rows */}
              {heroCourse && (
                <motion.div
                  variants={staggerItem}
                  className="md:col-span-2 lg:col-span-2 row-span-2 h-full min-h-[440px]"
                >
                  <HeroTile topCourse={heroCourse} streak={stats.streak} />
                </motion.div>
              )}

              {/* Activity — 1 col × 2 rows */}
              <motion.div
                variants={staggerItem}
                className="md:col-span-2 lg:col-span-1 row-span-2 h-full min-h-[440px]"
              >
                <ActivityTile logs={logs} />
              </motion.div>

              {/* Remaining course cards */}
              {safeCourses.slice(1).map((course, i) => (
                <motion.div
                  key={course.id}
                  variants={staggerItem}
                  className="col-span-1 row-span-1 h-full"
                >
                  <CourseCard course={course} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </Suspense>
        </section>
      </main>
    </div>
  );
}