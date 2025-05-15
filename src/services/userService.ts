import User from "@/@types/User";
import api from "@/services/api";

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao buscar usuários.");
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
    throw new Error(e.response?.data?.message || "Erro ao criar usuário.");
  }
}