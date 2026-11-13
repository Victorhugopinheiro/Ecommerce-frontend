"use client";

import { AuthProvider } from "@/context/authContext";
import { ShopProvider } from "@/context/ShopContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ShopProvider>{children}</ShopProvider>
        </AuthProvider>
    );
}
