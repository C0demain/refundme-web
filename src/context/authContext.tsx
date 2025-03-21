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
    if (token) {
      // Aqui você pode chamar uma API para validar o token e buscar o usuário
      setUser({ id: "1", email: "teste@email.com" }); // Exemplo, troque pela API real
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await login(email, password);
    console.log(data)
    Cookies.set("authToken", data.access_token, { expires: 7 });
    Cookies.set("userId", data.user_id, {expires: 7});
    router.push('/auth/home')
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
