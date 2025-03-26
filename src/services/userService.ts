import User from "@/@types/User";
import api from "@/services/api";

export async function getAllUsers(): Promise<User[]>{
    try{
        const response = await api.get('/users')
        return response.data
    }catch(e: any){
        console.error(e)
        throw new Error(e.response?.data?.message || "Erro ao fazer login.")
    }
}