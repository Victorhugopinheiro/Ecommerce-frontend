"use client";

import { AuthProvider } from "@/context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ShopProvider } from "@/context/ShopContext";
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ShopProvider>{children}</ShopProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}