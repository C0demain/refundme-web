"use client";
import Project from "@/@types/Project";
import CardProject from "@/components/projects/cardProject";
import CreateProjectDialog from "@/components/projects/createProjectDialog";
import { getAllProjects } from "@/services/projectService";
import {
  Center,
  Container,
  Heading,
  Spinner,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter;

  const fetchProjects = async (search: string) => {
    try {
      const response = await getAllProjects(search);
      setProjects(response);
    } catch (erro) {
      console.error("Erro ao buscar projetos: ", erro);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects("");
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading fontSize="3xl" color="black" my="6">
          Listagem de Projetos
        </Heading>
        <CreateProjectDialog
          onCreate={() => fetchProjects("")}
          children={undefined}
        />
      </div>

      {isLoading ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <VStack>
          {projects?.map((project: Project, i: Key) => (
            <CardProject
              onChange={() => fetchProjects("")}
              projeto={project}
              key={i}
            />
          ))}
        </VStack>
      )}
    </Container>
  );
}
