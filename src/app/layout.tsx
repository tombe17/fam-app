import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Bellows Family Website",
  description: "Welcome to Bellows Family Website",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased min-h-screen flex flex-col bg-gray-50/50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="h-16 border-b w-full" />}>
            <Navbar />
          </Suspense>

          <main className="flex-1 w-full flex flex-col items-center">
          <div className="w-full max-w-5xl p-5">
            {children}
          </div>
          </main>

          {/* --- GLOBAL FOOTER START --- */}
          <footer className="w-full border-t py-8 mt-auto flex justify-center">
            <div className="w-full max-w-6xl mx-auto px-5 flex justify-between items-center text-sm text-gray-500">
              <p>© 2026 The Bellows Family Website</p>
              <div className="flex items-center gap-4">
                <span>Theme:</span>
                <ThemeSwitcher />
              </div>
            </div>
          </footer>
          {/* --- GLOBAL FOOTER END --- */}

        </ThemeProvider>
      </body>
    </html>
  );
}
