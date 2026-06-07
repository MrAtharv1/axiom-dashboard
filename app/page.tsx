import { getCourses, getStats, getActivityLog } from "@/lib/data";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const revalidate = 60;

export default async function HomePage() {
  const [courses, stats, logs] = await Promise.all([
    getCourses(),
    getStats(),
    getActivityLog(),
  ]);
  return <DashboardShell courses={courses} stats={stats} logs={logs} />;
}