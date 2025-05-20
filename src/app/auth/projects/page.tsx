"use client"
import Project from "@/@types/Project";
import CardProject from "@/components/projects/cardProject";
import { getAllProjects } from "@/services/projectService";
import { Center, Container, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter

    const fetchProjects = async(search: string) => {
        try{
            const response = await getAllProjects(search)
            console.log(response)
            setProjects(response)
        } catch (erro) {
            console.error("Erro ao buscar projetos: ", erro)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchProjects("");
    }, [])

    return(
        <Container>
            <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
                Listagem de Projetos
            </Text>

            {isLoading ? (
                <Center py="20">
                    <Spinner color="#8a2be2" size="xl" />
                </Center>
            ) : (
                <div className="flex flex-col h-screen space-y-4">
                    {projects?.map((project: Project, i: Key) => (
                        <CardProject projeto={project} key={i} />
                    ))}
                </div>
                
            )}
        </Container>
    )
}