import Expense from "@/@types/Expense";
import api from "./api";

export async function getAllExpenses(): Promise<Expense[]>{
    try {
        console.log('puxando')
        const response = await api.get('/expenses')
        console.log(response)
        return response.data.data
    } catch (e: any) {
        console.error(e)
        throw new Error(e.response?.data?.message || "Erro ao fazer login.")
    }
}