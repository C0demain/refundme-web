import Project from "@/@types/Project"
import api from "./api"

export const getAllProjects = async (search?: string): Promise<Project[]> => {
    try {
        const response = await api.get("/projects", {params: { search } })
        return response.data.data ?? []
    } catch (error) {
        return []
    }
}

export const getProjectById = async (id: string) => {
    try {
        console.log("solicitou")
        const response = await api.get(`/projects/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error
    }
};


export const deleteProjects = async(id:string) => {
    try {
        const response = await api.delete(`/projects/${id}`)
        if (!response || !response.data) {
            throw new Error("Resposta inválida ou sem dados");
        }

        console.log("projeto excluído com sucesso!");
    } catch (e) {
        console.error("Erro ao excluir a projeto:", e);
        throw e;
    }
}

interface createProjectDTO{title:string, limit: number, users: string[], description: string, cc: string}

export async function createProject(data: createProjectDTO){
    try{
        const response = await api.post(`/projects`, data)
        return response.data
    }catch(e: any){
        console.error(e)
        throw e
    }
}

export async function DeleteUserForProject(projectId:string | undefined, userId: string) {
    try {
        const response = await api.delete(`/projects/${projectId}/users/${userId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function AddUserInProject(projectId: string | undefined, userIds: string[]) {
    if(projectId){
        try {
            const response = await api.patch(`/projects/${projectId}/users`, userIds)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

export async function EditProject(id:string, project:{}) {
    if(id){
        try {
            const response = await api.patch(`/projects/${id}`, project)
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    
}