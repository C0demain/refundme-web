import RequestType from "@/@types/RequestType"
import api from "./api"

interface RequestFilters{
    search?: string
}

export async function getRequests(filters?: RequestFilters): Promise<RequestType[]>{
    try {
        const response = await api.get('/requests', {params: filters })
        console.log(response.data)
        return response.data as RequestType[]
    } catch (e: any) {
        console.error(e)
        throw e
    }
}