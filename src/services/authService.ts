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
    });
    return response.data;

  } catch (error: any) {
    // Garante que seja sempre uma string simples
    throw new Error(
      JSON.stringify(
        error.response?.data?.errors || ["Erro ao fazer login."]
      )
    );
  }
};
