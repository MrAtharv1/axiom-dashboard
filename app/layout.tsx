import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXIOM — Learning Dashboard",
  description: "Next-generation learning platform. Track progress, master skills.",
  keywords: ["learning", "dashboard", "courses", "education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-void-950 text-white/88 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
