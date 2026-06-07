# AXIOM 
> **Next-Gen Learning Dashboard**

A futuristic, high-performance learning dashboard engineered with Next.js 15, Supabase, and Framer Motion. Designed for high-intensity data visualization with a disciplined, void-black and electric-gold aesthetic.

---

## ⚡ Features
- **Server-First Architecture:** Leverages Next.js 15 React Server Components (RSC) and parallel data fetching for zero-JS initial payload.
- **Fluid Animation System:** Hardware-accelerated, zero-layout-shift animations driven by Framer Motion spring physics.
- **Progressive UI Streaming:** Implements advanced `<Suspense>` boundaries to stream components instantly while data resolves.
- **Type-Safe Ecosystem:** End-to-end strict TypeScript integration, including auto-generated Supabase database types.
- **Bespoke Design Language:** Custom Tailwind design tokens mapped to a proprietary color system.

---

## 🏗 Architecture & Performance

AXIOM implements a strict **Server/Client separation of concerns** to maximize performance and minimize time-to-interactive (TTI).

* **Data Strategy:** All data fetching executes server-side. The entry `page.tsx` utilizes `Promise.all` alongside React’s `cache()` to deduplicate parallel requests across the component tree.
* **Caching & Revalidation:** Balances live data freshness with static delivery speeds using Incremental Static Regeneration (ISR) with a 60-second revalidation window.
* **Rendering:** Prevents Cumulative Layout Shift (CLS) through skeleton fallbacks and CSS `will-change: transform` directives on all animated cards.

---

## 🛠 Tech Stack

* **Core:** Next.js 15 (App Router), React 19, TypeScript
* **Backend:** Supabase (Postgres, Row Level Security, `@supabase/ssr`)
* **Styling:** Tailwind CSS
* **Motion:** Framer Motion
* **Typography:** Syne (Display), JetBrains Mono (Data), Instrument Sans (Body)
* **Icons:** Lucide React

---

## 🚀 Quick Start

The dashboard is designed to run seamlessly with intelligent mock data if a database connection is not provided, allowing for immediate local development.

### 1. Local Environment
\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/axiom.git
cd axiom

# Install dependencies
npm install

# Initialize environment variables
cp .env.example .env.local

# Start the development server
npm run dev
\`\`\`
Navigate to `http://localhost:3000` to view the application.

### 2. Database Integration (Optional)
To connect the live Supabase backend:
1. Create a new project at [Supabase](https://supabase.com/).
2. Navigate to the **SQL Editor** and execute the contents of `supabase/schema.sql`.
3. Locate your API credentials under **Settings → API**.
4. Update your `.env.local` file:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-anon-key
   \`\`\`
5. Restart your development server. The application will automatically detect the credentials and switch from mock data to live production data.

---

## 📂 Project Structure

\`\`\`text
axiom/
├── app/                  # Route definitions, layouts, and Server Components
├── components/           
│   ├── dashboard/        # Core widget components (Hero, Stats, Activity)
│   ├── sidebar/          # Responsive navigation architecture
│   └── ui/               # Reusable, atomic UI elements (e.g., ProgressBars)
├── lib/                  
│   ├── data.ts           # Fetching logic and mock data fallbacks
│   ├── motion.ts         # Centralized spring physics configurations
│   └── supabase/         # Server and browser client initializers
├── types/                # Global TypeScript definitions and DB schema interfaces
└── supabase/             # Raw SQL schemas and seeding scripts
\`\`\`

---

## 🎨 Design System

AXIOM utilizes a custom set of Tailwind tokens to maintain visual consistency. 

| Token | Hex Value | Contextual Usage |
|-------|-------|-----|
| `void-950` | `#030304` | Deep background / Environment |
| `void-900` | `#07080c` | Sidebar / Modal overlays |
| `void-800` | `#10121a` | Elevated card surfaces |
| `spark` | `#fbbf24` | Primary active states / Gold accents |
| `mint` | `#6ee7b7` | Success indicators / Architecture metrics |
| `ice` | `#7dd3fc` | Informational / Engineering metrics |

### Motion Standards
All motion follows a weighted, deliberate physics profile to convey a premium feel. Do not use linear or ease-in-out timing functions.
\`\`\`ts
export const axiomSpring = { type: "spring", stiffness: 300, damping: 24 };
\`\`\`
