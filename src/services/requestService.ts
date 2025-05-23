import RequestType from "@/@types/RequestType"
import api from "./api"

interface RequestFilters extends PaginationArgs{
    search?: string,
    status?: string
}

interface RequestResponse{
    data: RequestType[],
    totalPages: number
}

export async function getRequests(filters?: RequestFilters): Promise<RequestResponse>{
    if(filters?.status === ""){
        filters.status = undefined
    }
    try {
        const response = await api.get('/requests', {params: filters })
        console.log(response.data)
        return response.data as RequestResponse
    } catch (e: any) {
        console.error(e)
        throw e
    }
}

export async function getRequestsById(id: string): Promise<RequestType>{
    try {
        const response = await api.get(`/requests/${id}`)
        console.log(response.data)
        return response.data as RequestType
    } catch (e: any) {
        console.error(e)
        throw e
    }
}

export async function updateStatus(id: string, status: string){
    try {
        const response = await api.patch(`/requests/${id}`, {status})
        console.log(response.data)
        return response.data as RequestResponse
    } catch (e: any) {
        console.error(e)
        throw e
    }
}