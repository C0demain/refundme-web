"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { login } from "@/services/authService"; // API real de autenticação

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("userId");
    const userEmail = Cookies.get("userEmail"); // ← supondo que você salvou isso

    if (token && userId && userEmail) {
      setUser({ id: userId, email: userEmail });
    }
  }, []);


  const signIn = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      Cookies.set("authToken", data.access_token, { expires: 7 });
      Cookies.set("userId", data.user_id, { expires: 7 });
      setUser({ id: data.user_id, email });
      router.push("/auth/home");
    } catch (error: any) {
      // Captura apenas a mensagem do erro
      throw error;
    }
  };

  const signOut = () => {
    Cookies.remove("authToken");
    Cookies.remove('userId');
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
