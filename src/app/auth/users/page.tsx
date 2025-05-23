"use client";

import User from "@/@types/User";
import { getAllUsers, deleteUser, getUser } from "@/services/userService";
import {
  Container,
  Table,
  Text,
  Spinner,
  Center,
  Button,
  Dialog,
  Portal,
  CloseButton,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const router = useRouter();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const newUsers = await getAllUsers({ page, limit });
      setUsers(newUsers);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleUpdate = async (id: string) => {
    try {
      const user = await getUser(id);
      console.log("Usuário selecionado para atualização:");
      console.log("Nome:", user.name);
      console.log("Email:", user.email);
      router.push(`/auth/users/${id}`);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  };

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
                  <Table.ColumnHeader bg="#8a2be2" textStyle="xl">Cargo</Table.ColumnHeader>
                  <Table.ColumnHeader bg="#8a2be2" textStyle="xl">Ações</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
                <Table.Body>
                  {users.map((user, i) => (
                    <Table.Row key={i}>
                      <Table.Cell bg="white" color="black" textStyle="md">{user.name}</Table.Cell>
                      <Table.Cell bg="white" color="black" textStyle="md">{user.email}</Table.Cell>
                      <Table.Cell bg="white" color="black" textStyle="md">
                        {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                      </Table.Cell>
                      
                      {/* Ações: Atualizar + Excluir lado a lado */}
                      <Table.Cell bg="white" color="black" textStyle="md">
                        <HStack>
                          <Button
                            size="sm"
                            bg="#8a2be2"
                            color="white"
                            onClick={() => handleUpdate(user._id)}
                            _hover={{ bg: "#7325b2" }}
                          >
                            Atualizar
                          </Button>

                          <Dialog.Root>
                            <Dialog.Trigger asChild>
                              <Button size="sm" bg="#8a2be2" color="white">
                                Excluir
                              </Button>
                            </Dialog.Trigger>
                            <Portal>
                              <Dialog.Backdrop className="fixed inset-0 bg-black opacity-50" />
                              <Dialog.Positioner>
                                <Dialog.Content bg="white" color="black" p="6" rounded="lg" shadow="lg">
                                  <Dialog.Header>
                                    <Dialog.Title color="black">Confirmar Exclusão</Dialog.Title>
                                  </Dialog.Header>
                                  <Dialog.Body>
                                    <p>Tem certeza de que deseja excluir este usuário? Esta ação não poderá ser desfeita.</p>
                                  </Dialog.Body>
                                  <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                      <Button variant="outline" color="#000000" _hover={{ bg: "white" }}>
                                        Cancelar
                                      </Button>
                                    </Dialog.ActionTrigger>
                                    <Button bg="#8a2be2" color="white" onClick={() => handleDelete(user._id)}>
                                      Excluir
                                    </Button>
                                  </Dialog.Footer>
                                  <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" color="#000000" />
                                  </Dialog.CloseTrigger>
                                </Dialog.Content>
                              </Dialog.Positioner>
                            </Portal>
                          </Dialog.Root>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>

            </Table.Root>
          </Table.ScrollArea>

          {/* Paginação */}
          <HStack justify="center" mt="6">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              mr="4"
            >
              Anterior
            </Button>

            <Text color="gray.800">Página {page}</Text>

            <Button onClick={() => setPage((prev) => prev + 1)} ml="4">
              Próxima
            </Button>
          </HStack>

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
