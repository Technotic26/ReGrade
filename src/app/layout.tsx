import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReGrade | AI-Powered Used Electronics Recommerce",
  description:
    "Transparent peer-to-peer marketplace for verified used electronics with AI condition grading, fair dynamic valuation, and certified partner refurbishment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
