"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
