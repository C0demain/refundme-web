import api from "./api";

interface LoginResponse {
  user_id: string; // Ajuste de nomenclatura para manter o padrão
  access_token: string;
}

export const login = async (userEmail: string, userPassword: string) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email: userEmail,
      password: userPassword,
    }, );
    return response.data;
  } catch (error: any) {
    console.error("Erro no login", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao fazer login.");
  }
};
