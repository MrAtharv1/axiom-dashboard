export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          title: string;
          progress: number;
          icon_name: string;
          created_at: string;
          description: string | null;
          category: string | null;
          total_lessons: number | null;
          completed_lessons: number | null;
        };
        Insert: {
          id?: string;
          title: string;
          progress: number;
          icon_name: string;
          created_at?: string;
          description?: string | null;
          category?: string | null;
          total_lessons?: number | null;
          completed_lessons?: number | null;
        };
        Update: {
          id?: string;
          title?: string;
          progress?: number;
          icon_name?: string;
          created_at?: string;
          description?: string | null;
          category?: string | null;
          total_lessons?: number | null;
          completed_lessons?: number | null;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          course_id: string | null;
          created_at: string;
          duration_minutes: number | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          course_id?: string | null;
          created_at?: string;
          duration_minutes?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          course_id?: string | null;
          created_at?: string;
          duration_minutes?: number | null;
        };
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
  };
}

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type ActivityLog = Database["public"]["Tables"]["activity_log"]["Row"];

export interface DashboardStats {
  totalCourses: number;
  avgProgress: number;
  totalHours: number;
  streak: number;
}
