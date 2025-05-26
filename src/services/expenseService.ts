import Expense from "@/@types/Expense";
import api from "./api";

type ExpensesResponse = {
  data: Expense[];
  total: number;
  page: number;
  limit: number;
};

export async function getAllExpenses(params: { page: number; limit: number; }): Promise<ExpensesResponse> {
  try {
    const response = await api.get('/expenses', {
      params: {
        page: params.page,
        limit: params.limit,
      },
    });

    // Ajuste aqui dependendo da estrutura real da resposta da API
    // Estou assumindo que a resposta vem em response.data com { data, total, page, limit }
    return response.data;

  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao buscar despesas.");
  }
}

export async function getExpenseById(id: string): Promise<Expense> {
  try {
    const response = await api.get(`/expenses/${id}`);
    return response.data.data;

  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao buscar despesa.");
  }
}
