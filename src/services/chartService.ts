import ExpensesChartStats from "@/@types/ExpensesChartStats";
import api from "./api";
import RequestsChartStats from "@/@types/RequestsChartStats";

export async function getRequestsStats(): Promise<RequestsChartStats[]> {
  try {
    const response = await api.get("/chart/requests/status");
    return response.data.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao fazer a requisição");
  }
}

export async function getExpensesStats(
  startDate?: string,
  endDate?: string,
  granularity: string = "month"
): Promise<ExpensesChartStats[]> {
  try {
    const response = await api.get("/chart/expenses/type", {
      params: {
        startDate: startDate,
        endDate: endDate,
        granularity: granularity,
      },
    });
    return response.data.data;
  } catch (e: any) {
    console.error(e);
    throw new Error(e.response?.data?.message || "Erro ao fazer a requisição");
  }
}
