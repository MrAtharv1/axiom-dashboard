"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, TrendingUp, Trophy,
  Bell, Settings, LogOut, Sun, Moon, Hexagon, Languages,
} from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "courses",   icon: BookOpen,        label: "Courses"   },
  { id: "progress",  icon: TrendingUp,      label: "Progress"  },
  { id: "achievements", icon: Trophy,       label: "Achievements" },
];

const bottomItems = [
  { id: "notifications", icon: Bell,     label: "Alerts"   },
  { id: "settings",      icon: Settings, label: "Settings" },
];

interface SidebarProps {
  activeId?: string;
}

export function Sidebar({ activeId = "dashboard" }: SidebarProps) {
  const [active, setActive]   = useState(activeId);
  const [isDark,  setIsDark]  = useState(true);

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <motion.aside
        initial={false}
        className="
          hidden lg:flex flex-col z-50
          fixed top-0 left-0
          h-[calc(100vh-1rem)] my-2 ml-2
          bg-void-900
          shadow-2xl shadow-black/60
          rounded-[2rem]
          overflow-hidden
          w-[72px] hover:w-[260px]
          transition-[width] duration-300 ease-in-out
          group
        "
        style={{ border: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-4 shrink-0 overflow-hidden">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
              <Hexagon className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400" />
          </div>
          <span
            className="
              ml-3 text-base font-bold tracking-widest text-amber-400
              whitespace-nowrap
              opacity-0 group-hover:opacity-100
              translate-x-[-8px] group-hover:translate-x-0
              transition-all duration-300
            "
            style={{ fontFamily: "var(--font-display)" }}
          >
            AXIOM
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-2 overflow-y-auto overflow-x-hidden
          [&::-webkit-scrollbar]:hidden group-hover:[&::-webkit-scrollbar]:block
          scrollbar-thin scrollbar-thumb-white/10"
        >
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <motion.li key={item.id} variants={staggerItem}>
                <button
                  onClick={() => setActive(item.id)}
                  title={item.label}
                  className="
                    relative w-full h-11 flex items-center
                    rounded-xl group/item
                    border-l-2 border-transparent
                    hover:border-amber-400/50
                    transition-colors duration-200
                    focus:outline-none
                  "
                >
                  {/* Active bg */}
                  {active === item.id && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(251,191,36,0.04))",
                        border: "1px solid rgba(251,191,36,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}

                  {/* Icon — fixed 40px zone so it stays centered when collapsed */}
                  <div className="relative z-10 w-10 flex justify-center items-center shrink-0">
                    <item.icon
                      className={`w-4 h-4 transition-all duration-200 group-hover/item:scale-110 ${
                        active === item.id
                          ? "text-amber-400"
                          : "text-white/30 group-hover/item:text-white/70"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      relative z-10 text-sm font-semibold whitespace-nowrap
                      opacity-0 group-hover:opacity-100
                      translate-x-[-8px] group-hover:translate-x-0
                      transition-all duration-300 pl-2
                      ${active === item.id ? "text-amber-400" : "text-white/40 group-hover/item:text-white/80"}
                    `}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Footer */}
        <div
          className="shrink-0 rounded-b-[2rem] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          {/* Bottom nav items */}
          {bottomItems.map((item) => (
            <button
              key={item.id}
              title={item.label}
              onClick={() => setActive(item.id)}
              className="
                relative w-full h-11 flex items-center
                hover:bg-white/[0.04] transition-colors duration-200
                focus:outline-none group/item
              "
            >
              {active === item.id && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0"
                  style={{
                    background: "rgba(251,191,36,0.08)",
                    border: "1px solid rgba(251,191,36,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <div className="relative z-10 w-10 flex justify-center items-center shrink-0">
                <item.icon
                  className={`w-4 h-4 transition-colors ${
                    active === item.id ? "text-amber-400" : "text-white/25 group-hover/item:text-white/60"
                  }`}
                />
              </div>
              <span
                className="
                  relative z-10 text-sm text-white/35 group-hover/item:text-white/60
                  whitespace-nowrap font-medium
                  opacity-0 group-hover:opacity-100
                  translate-x-[-8px] group-hover:translate-x-0
                  transition-all duration-300 pl-2
                "
              >
                {item.label}
              </span>
            </button>
          ))}

          {/* Theme toggle */}
          <button
            title="Toggle theme"
            onClick={() => setIsDark(!isDark)}
            className="w-full h-11 flex items-center hover:bg-white/[0.04] transition-colors duration-200 focus:outline-none group/item"
          >
            <div className="w-10 flex justify-center items-center shrink-0">
              {isDark
                ? <Moon className="w-4 h-4 text-yellow-400" />
                : <Sun  className="w-4 h-4 text-orange-400" />
              }
            </div>
            <div className="
              opacity-0 group-hover:opacity-100
              translate-x-[-8px] group-hover:translate-x-0
              transition-all duration-300
              flex items-center justify-between w-36 pl-2 pr-3
            ">
              <span className="text-xs text-white/35 whitespace-nowrap">
                {isDark ? "Dark mode" : "Light mode"}
              </span>
              {/* Mini toggle pill */}
              <div
                className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors duration-300 ${
                  isDark ? "bg-amber-400/30" : "bg-white/20"
                }`}
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-amber-400"
                  animate={{ x: isDark ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              </div>
            </div>
          </button>

          {/* Divider */}
          <div className="mx-3 h-px bg-white/[0.04]" />

          {/* Avatar row */}
          <div className="h-14 flex items-center px-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 ml-1.5">
              <span className="text-xs font-bold text-amber-400" style={{ fontFamily: "var(--font-mono)" }}>
                AT
              </span>
            </div>
            <div className="
              ml-3 overflow-hidden
              opacity-0 group-hover:opacity-100
              translate-x-[-8px] group-hover:translate-x-0
              transition-all duration-300
            ">
              <p className="text-xs font-semibold text-white/70 whitespace-nowrap">Atharv</p>
              <p className="text-[10px] text-white/25 whitespace-nowrap uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Pro</p>
            </div>
          </div>

          {/* Logout */}
          <button className="
            w-full h-12 flex items-center
            text-red-400/60 hover:text-red-400 hover:bg-red-400/5
            transition-colors duration-200 rounded-b-[2rem]
            focus:outline-none group/item
          ">
            <div className="w-10 flex justify-center items-center shrink-0">
              <LogOut className="w-4 h-4 transition-transform group-hover/item:translate-x-0.5" />
            </div>
            <span className="
              text-sm font-medium whitespace-nowrap
              opacity-0 group-hover:opacity-100
              translate-x-[-8px] group-hover:translate-x-0
              transition-all duration-300 pl-2
            ">
              Sign out
            </span>
          </button>
        </div>
      </motion.aside>

      {/* Spacer so main content doesn't go under the fixed sidebar */}
      <div className="hidden lg:block w-[88px] shrink-0" />

      {/* ── Mobile bottom nav ───────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around h-16 border-t border-white/[0.05] bg-void-900/95 backdrop-blur-xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative flex flex-col items-center justify-center w-16 h-full focus:outline-none"
          >
            {active === item.id && (
              <motion.div
                layoutId="mobile-nav-active"
                className="absolute top-1 inset-x-3 h-0.5 rounded-full bg-amber-400"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <item.icon className={`w-5 h-5 transition-colors ${active === item.id ? "text-amber-400" : "text-white/30"}`} />
            <span
              className={`text-[9px] mt-1 uppercase tracking-widest transition-colors ${active === item.id ? "text-amber-400" : "text-white/20"}`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}