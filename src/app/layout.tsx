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
      <body className="min-h-screen bg-[#faf8f4] text-[#26231f] antialiased">
        {children}
      </body>
    </html>
  );
}
