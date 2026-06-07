-- ============================================================
-- AXIOM Learning Dashboard — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'Code2',
  description text,
  category text,
  total_lessons integer default 20,
  completed_lessons integer default 0,
  created_at timestamptz not null default now()
);

-- Activity log
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  action text not null,
  course_id uuid references public.courses(id) on delete set null,
  duration_minutes integer,
  created_at timestamptz not null default now()
);

-- RLS Policies
alter table public.courses enable row level security;
alter table public.activity_log enable row level security;

-- Allow public read on courses (no auth required for demo)
create policy "Public read courses"
  on public.courses for select
  using (true);

-- Allow public read on activity
create policy "Public read activity"
  on public.activity_log for select
  using (true);

-- ============================================================
-- Seed Data
-- ============================================================
insert into public.courses (title, progress, icon_name, description, category, total_lessons, completed_lessons)
values
  (
    'Advanced React Patterns',
    78,
    'Layers',
    'Master compound components, render props, and custom hooks at scale',
    'Engineering',
    24,
    18
  ),
  (
    'System Design',
    45,
    'Network',
    'Scale to millions — distributed systems, CAP theorem, and architecture',
    'Architecture',
    32,
    14
  ),
  (
    'AI Engineering',
    91,
    'Brain',
    'Production LLM systems, embeddings, vector search, and RAG pipelines',
    'AI/ML',
    18,
    17
  ),
  (
    'Motion UI Mastery',
    33,
    'Zap',
    'Framer Motion, GSAP, physics-based animations, and scroll-driven effects',
    'Design',
    20,
    7
  );

-- Seed activity log
insert into public.activity_log (action, duration_minutes)
values
  ('Completed lesson', 45),
  ('Resumed course', 20),
  ('Started module', 30),
  ('Completed quiz', 15),
  ('Completed lesson', 50);
