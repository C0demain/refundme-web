"use client";

import User from "@/@types/User";
import { getAllUsers, createUser } from "@/services/userService";
import {
  Container,
  Table,
  Text,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type NewUser = Omit<User, "id"> & { password: string };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleCreateUser = () => {
    router.push("/auth/users");
  };

  const fetchUsers = async () => {
    try {
      const newUsers = await getAllUsers();
      setUsers(newUsers);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
        Listagem de Usuários
      </Text>

      {isLoading ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <>
          <Table.ScrollArea borderWidth="1px" rounded="md" minW="5/6" bgColor="white">
            <Table.Root stickyHeader size="sm" interactive>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader bg="#8a2be2" textStyle="xl">Nome</Table.ColumnHeader>
                  <Table.ColumnHeader bg="#8a2be2" textStyle="xl">Email</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user, i) => (
                  <Table.Row key={i}>
                    <Table.Cell bg="white" color="black" textStyle="md">{user.name}</Table.Cell>
                    <Table.Cell bg="white" color="black" textStyle="md">{user.email}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>

          <Button
            aria-label="Adicionar Usuário"
            colorScheme="purple"
            bg="purple.600"
            color="white"
            borderRadius="full"
            size="lg"
            position="fixed"
            bottom={4}
            right={4}
            onClick={() => router.push("/auth/register")}
            _hover={{ bg: "purple.700" }}
          >
            +
          </Button>
        </>
      )}
    </Container>
  );
}