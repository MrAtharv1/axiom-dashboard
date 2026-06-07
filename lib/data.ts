import { cache } from "react";
import type { Course, DashboardStats, ActivityLog } from "@/types/database";

const MOCK_COURSES: Course[] = [
  { id: "1", title: "Advanced React Patterns", progress: 78, icon_name: "Layers", created_at: new Date().toISOString(), description: "Master compound components and custom hooks", category: "Engineering", total_lessons: 24, completed_lessons: 18 },
  { id: "2", title: "System Design", progress: 45, icon_name: "Network", created_at: new Date().toISOString(), description: "Scale to millions — distributed systems", category: "Architecture", total_lessons: 32, completed_lessons: 14 },
  { id: "3", title: "AI Engineering", progress: 91, icon_name: "Brain", created_at: new Date().toISOString(), description: "Production LLM systems and RAG pipelines", category: "AI/ML", total_lessons: 18, completed_lessons: 17 },
  { id: "4", title: "Motion UI Mastery", progress: 33, icon_name: "Zap", created_at: new Date().toISOString(), description: "Framer Motion and physics-based animation", category: "Design", total_lessons: 20, completed_lessons: 7 },
];

const MOCK_LOGS: ActivityLog[] = [
  { id: "1", user_id: null, action: "Completed lesson — Hooks deep dive", course_id: "1", duration_minutes: 45, created_at: new Date(Date.now() - 300000).toISOString() },
  { id: "2", user_id: null, action: "Resumed — System Design: CAP Theorem", course_id: "2", duration_minutes: 20, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: "3", user_id: null, action: "Started module — RAG Pipelines", course_id: "3", duration_minutes: 30, created_at: new Date(Date.now() - 10800000).toISOString() },
  { id: "4", user_id: null, action: "Completed quiz — Spring Physics", course_id: "4", duration_minutes: 15, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "5", user_id: null, action: "Completed lesson — Embeddings 101", course_id: "3", duration_minutes: 50, created_at: new Date(Date.now() - 172800000).toISOString() },
];

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.length > 0 && !url.includes("your-project") && url.startsWith("https://");
}

export const getCourses = cache(async (): Promise<Course[]> => {
  if (!isSupabaseConfigured()) return MOCK_COURSES;
  try {
    const { createSupabaseServer } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
    if (error) { console.error("[getCourses]", error.message); return MOCK_COURSES; }
    return data?.length ? data : MOCK_COURSES;
  } catch (err) {
    console.error("[getCourses] unexpected:", err);
    return MOCK_COURSES;
  }
});

export const getActivityLog = cache(async (): Promise<ActivityLog[]> => {
  if (!isSupabaseConfigured()) return MOCK_LOGS;
  try {
    const { createSupabaseServer } = await import("@/lib/supabase/server");
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(5);
    if (error) { console.error("[getActivityLog]", error.message); return MOCK_LOGS; }
    return data?.length ? data : MOCK_LOGS;
  } catch (err) {
    console.error("[getActivityLog] unexpected:", err);
    return MOCK_LOGS;
  }
});

export const getStats = cache(async (): Promise<DashboardStats> => {
  const courses = await getCourses();
  const avgProgress = courses.length > 0
    ? courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
    : 0;
  return { totalCourses: courses.length, avgProgress: Math.round(avgProgress), totalHours: 847, streak: 14 };
});