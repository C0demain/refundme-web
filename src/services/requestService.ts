import RequestType from "@/@types/RequestType"
import api from "./api"

interface RequestFilters extends PaginationArgs{
    search?: string
}

interface RequestResponse{
    data: RequestType[],
    totalPages: number
}

export async function getRequests(filters?: RequestFilters): Promise<RequestResponse>{
    try {
        const response = await api.get('/requests', {params: filters })
        console.log(response.data)
        return response.data as RequestResponse
    } catch (e: any) {
        console.error(e)
        throw e
    }
}