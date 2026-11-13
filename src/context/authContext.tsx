"use client";

import { createContext, useEffect, useState } from "react";
import api from "../service/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { User } from "@/types/mongoose.gen";

interface AuthContextType {
    authenticated: boolean;
    setAuthenticated: (auth: boolean) => void;
    
  
    user: User | null;
   
}




export const AuthContext = createContext({} as AuthContextType);



export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

  


    return (
        <AuthContext.Provider value={{ authenticated, user, setAuthenticated, }}>
            {children}
        </AuthContext.Provider>
    )

}