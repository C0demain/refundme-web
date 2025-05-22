import User from "@/@types/User";
import api from "@/services/api";

export async function getAllUsers(params?: { page?: number; limit?: number }): Promise<User[]> {
  try {
    const { page = 1, limit = 10 } = params || {};
    const response = await api.get('/users', {
      params: { page, limit }
    });

    console.log("Resposta bruta da API:", response.data);

    if (Array.isArray(response.data.data)) {
      return response.data.data;
    }

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

export async function updateUser(id: string, data: Partial<User>) {
  try {
    console.log("Atualizando usuário:", {
      nome: data.name,
      email: data.email,
    });

    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao atualizar usuário.");
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
    const response = await api.post('/users', {...newUser, role: 'user', _id: undefined});
    return response.data;
  } catch (e: any) {
    console.error(e);
    console.error("Erro:", e.response?.data || e.message || e);
    throw new Error(e.response?.data?.message || "Erro ao criar usuário.");
  }
}

export async function getUserById(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao buscar usuário.");
  }
}
