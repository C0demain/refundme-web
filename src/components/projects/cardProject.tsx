import Project from "@/@types/Project";
import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import Link from "next/link";
import { LuBookText, LuSquareArrowOutUpRight, LuUser } from "react-icons/lu";
import DeleteProject from "./deleteProject";
interface CardProjectProps {
  projeto: Project;
  onChange: () => void;
}

export default function CardProject({ projeto, onChange }: CardProjectProps) {
  return (
    <Container backgroundColor="white" rounded={5} shadow={"lg"} padding={5}>
      <Stack
        gap={{ base: 20, mdDown: 4 }}
        direction={{ base: "row", mdDown: "column" }}
      >
        <Box w={"2/3"}>
          <Text color={"black"} fontSize={"lg"} fontWeight={"bold"}>
            {projeto.title}
          </Text>
          <Badge bg={"gray.200"} fontSize={"small"}>
            #{projeto.code}
          </Badge>
          <Text color={"gray.600"} fontSize={"md"} fontSmooth={"auto"}>
            {projeto.description}
          </Text>
        </Box>
        <Flex flexDirection={"column"} justify={"center"} gap={2}>
          <Flex alignItems={"center"} gap={2}>
            <Icon>
              <LuUser />
            </Icon>
            <Text>Usuários participantes: {projeto.users.length}</Text>{" "}
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <Icon>
              <LuBookText />
            </Icon>
            <Text>Quantidade de solicitações: {projeto.requests.length}</Text>
          </Flex>
        </Flex>
        <Center>
          <Stack
            justifySelf={"center"}
            direction={{ base: "column", mdDown: "row" }}
          >
            <DeleteProject handleDelete={onChange} id={projeto._id} />
            <Link href={`projects/${projeto._id}`}>
              <IconButton rounded={"full"} size={"md"}>
                <LuSquareArrowOutUpRight />
              </IconButton>
            </Link>
          </Stack>
        </Center>
      </Stack>
    </Container>
  );
}
