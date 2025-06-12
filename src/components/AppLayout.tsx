"use client";
import { Toaster } from "@/components/ui/sonner";

import TopNav from "@/components/TopNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen">
        <TopNav />

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <footer />
        <Toaster position="bottom-left" />
      </div>
    </>
  );
}
