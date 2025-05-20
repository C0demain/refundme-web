import Expense from "@/@types/Expense";
import api from "./api";
import Stats from "@/@types/Stats";

export async function getAllExpenses(): Promise<Expense[]> {
  try {
    console.log("puxando");
    const response = await api.get("/expenses");
    console.log(response);
    return response.data.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao fazer login.");
  }
}

export async function getDashboardStats(
  startDate: string,
  endDate: string,
  granularity: string = "month"
): Promise<Stats[]> {
  try {
    const response = await api.get(
      "/chart/expenses/type?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&granularity=" +
        granularity
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao fazer a requisição");
  }
}
