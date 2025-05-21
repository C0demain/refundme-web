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
        return error
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
    console.log(data)
    try{
        const response = await api.post(`/projects`, data)
        return response.data
    }catch(e: any){
        console.error(e)
        throw e
    }
}