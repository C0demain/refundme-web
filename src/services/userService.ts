import User from "@/@types/User";
import api from "@/services/api";

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    console.log("Resposta bruta da API:", response.data);

    if (Array.isArray(response.data.data)) {
      return response.data.data;
    }

    // Fallback para exibir erro no front-end se a estrutura estiver incorreta
    throw new Error("API retornou dados inválidos. Esperado: array ou { users: array }");
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || e.message || "Erro ao buscar usuários.");
  }
}

export async function deleteUser(id: string) {
  try {
  const response = await api.delete(`/users/${id}`);
    window.location.reload();
    return response.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao deletar usuário.");
  }
}

export async function getUser(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao buscar usuário.");
  }
}

export async function createUser(newUser: User): Promise<User> {
  try {
    const response = await api.post('/users', newUser);
    return response.data;
  } catch (e: any) {
    console.error(e);
    console.error("Erro:", e.response?.data || e.message || e);
    throw new Error(e.response?.data?.message || "Erro ao criar usuário.");
  }
}