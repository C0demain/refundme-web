import Project from "@/@types/Project";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import DeleteProject from "./deleteProject";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface CardProjectProps {
    projeto: Project
    onChange: () => void
}

export default function CardProject({projeto, onChange}: CardProjectProps){
    const router = useRouter()

    return (
        <Box backgroundColor="white" rounded={5} shadow={"lg"} padding={5} margin={2}>
            <Flex justify="space-between" align="start">
                <div className="w-1/3">
                    <Text color={"black"} fontSize={"lg"} fontWeight={'bold'}>{projeto.title}</Text>
                    <Text color={"gray"} fontSize={"small"}>#{projeto.code}</Text>
                    <p>{projeto.description}</p>
                </div>
                <div className="w-1/3 flex flex-col">
                    <Text>Usuários participantes: {projeto.users.length}</Text>
                    <Text>Quantidade de solicitações: {projeto.requests.length}</Text>
                </div>
                <div className="w-1/3 h-full flex flex-col items-end justify-end">
                    <DeleteProject handleDelete={onChange} id={projeto._id}/>
                    <Box display="flex" gap="4" marginTop={2}>
                        <Icon
                        size={"md"}
                        _hover={{cursor: 'pointer'}}
                        onClick={_ => router.push(`projects/${projeto._id}`)}
                        >
                            <FaArrowUpRightFromSquare />
                        </Icon>
                    </Box>
                </div>
            </Flex>
        </Box>
    )
}