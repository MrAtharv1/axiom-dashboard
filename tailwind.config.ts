import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: "#08080A",
          900: "#0D0E12",
          850: "#121319",
          800: "#171921",
          700: "#21242F",
          600: "#2C303E",
        },
        /* Softened, premium accent colors */
        spark: "#EAB308", 
        ember: "#F97316",
        ice: "#38BDF8",  /* Smoother, less aggressive blue */
        mint: "#34D399", /* Deeper, calmer green */
        rose: "#FB7185", /* Softer coral/rose */
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-body)", "sans-serif"], /* Intentional mapping to sans */
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "void-gradient": "radial-gradient(ellipse at 50% 0%, #171921 0%, transparent 70%)",
      },
      animation: {
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
      boxShadow: {
        "premium-sm": "0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
        "premium-md": "0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        "premium-lg": "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;