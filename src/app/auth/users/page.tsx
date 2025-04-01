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
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type NewUser = Omit<User, "id"> & { password: string };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
  });

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

  const handleCreateUser = async () => {
    try {
      const userToCreate: User = { id: "", ...newUser };
      const createdUser = await createUser(userToCreate);

      setUsers([...users, createdUser]);
      setNewUser({ name: "", email: "", password: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
        Usuários
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

          {showForm && (
            <VStack mt={4} align="flex-start">
              <Input
                placeholder="Nome"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                borderColor="purple.500"
                _placeholder={{ color: "gray.600" }}
                color="gray.800"
              />
              <Input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                borderColor="purple.500"
                _placeholder={{ color: "gray.600" }}
                color="gray.800"
              />
              <Input
                placeholder="Senha"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                borderColor="purple.500"
                _placeholder={{ color: "gray.600" }}
                color="gray.800"
              />
              <Button
                colorScheme="purple"
                bg="purple.600"
                color="white"
                onClick={handleCreateUser}
                _hover={{ bg: "purple.700" }}
              >
                Salvar
              </Button>
            </VStack>
          )}

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
            onClick={() => setShowForm(!showForm)}
            _hover={{ bg: "purple.700" }}
          >
            +
          </Button>
        </>
      )}
    </Container>
  );
}
