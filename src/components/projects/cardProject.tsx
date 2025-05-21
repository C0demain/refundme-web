import Project from "@/@types/Project";
import { Box, Flex, Text } from "@chakra-ui/react";
import DeleteProject from "./deleteProject";

interface CardProjectProps {
    projeto: Project
    onChange: () => void
}

export default function CardProject({projeto, onChange}: CardProjectProps){

    return (
        <Box backgroundColor="white" rounded={5} shadow={"lg"} padding={5} margin={2}>
            <Flex justify="space-between" align="start">
                <div className="w-1/3">
                    <Text color={"gray"} fontSize={"small"}>#{projeto.code}</Text>
                    <Text color={"black"} fontSize={"lg"} fontWeight={'bold'}>{projeto.title}</Text>
                    <p>{projeto.description}</p>
                </div>
                <div className="w-1/3">
                    <Text>Usuários participantes: {projeto.users.length}</Text>
                    <Text>Quantidade de solicitações: {projeto.requests.length}</Text>
                </div>
                <div className="w-1/3">
                    <DeleteProject handleDelete={onChange} id={projeto._id}/>
                </div>
            </Flex>
        </Box>
    )
}