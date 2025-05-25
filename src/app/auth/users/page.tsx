"use client";

import User from "@/@types/User";
import PaginationComponent from "@/components/pagination";
import { deleteUser, getAllUsers, getUser } from "@/services/userService";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Portal,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers({ page, limit });
      setUsers(response.data);
      setTotal(response.total);
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
      <div className="flex justify-between items-center">
        <Heading fontSize="3xl" color="black" my="6">
          Listagem de Usuários
        </Heading>
        <Button
          variant={"solid"}
          aria-label="Adicionar Usuário"
          colorPalette={"purple"}
          rounded="full"
          onClick={() => router.push("/auth/register")}
        >
          <LuPlus />
          Criar Usuário
        </Button>
      </div>

      {isLoading ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <>
          <Table.ScrollArea
            borderWidth="1px"
            rounded="md"
            minW="5/6"
            bgColor="white"
          >
            <Table.Root
              colorPalette={"purple"}
              stickyHeader
              variant={"outline"}
              size="sm"
              interactive
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textStyle="xl">Nome</Table.ColumnHeader>
                  <Table.ColumnHeader textStyle="xl">Email</Table.ColumnHeader>
                  <Table.ColumnHeader textStyle="xl">Cargo</Table.ColumnHeader>
                  <Table.ColumnHeader textStyle="xl">Ações</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user, i) => (
                  <Table.Row key={i}>
                    <Table.Cell color="black" textStyle="md">
                      {user.name}
                    </Table.Cell>
                    <Table.Cell color="black" textStyle="md">
                      {user.email}
                    </Table.Cell>
                    <Table.Cell color="black" textStyle="md">
                      {user.role === "admin" ? "Administrador" : "Usuário"}
                    </Table.Cell>

                    {/* Ações: Atualizar + Excluir lado a lado */}
                    <Table.Cell color="black" textStyle="md">
                      <HStack>
                        <IconButton
                          variant="solid"
                          colorPalette={"purple"}
                          size={"sm"}
                          rounded={"full"}
                        >
                          <LuPencil
                            aria-label="Excluir projeto"
                            strokeWidth={2}
                          />
                        </IconButton>

                        <Dialog.Root>
                          <Dialog.Trigger asChild>
                            <IconButton
                              variant={{
                                base: "outline",
                                _hover: "solid",
                              }}
                              colorPalette={"red"}
                              size={"sm"}
                              rounded={"full"}
                            >
                              <LuTrash2
                                aria-label="Excluir projeto"
                                strokeWidth={2}
                              />
                            </IconButton>
                          </Dialog.Trigger>
                          <Portal>
                            <Dialog.Backdrop className="fixed inset-0 bg-black opacity-50" />
                            <Dialog.Positioner>
                              <Dialog.Content
                                bg="white"
                                color="black"
                                p="6"
                                rounded="lg"
                                shadow="lg"
                              >
                                <Dialog.Header>
                                  <Dialog.Title color="black">
                                    Confirmar Exclusão
                                  </Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                  <Text>
                                    Tem certeza de que deseja excluir este
                                    usuário? Esta ação não poderá ser desfeita.
                                  </Text>
                                </Dialog.Body>
                                <Dialog.Footer>
                                  <Dialog.ActionTrigger asChild>
                                    <Button
                                      variant="outline"
                                    >
                                      Cancelar
                                    </Button>
                                  </Dialog.ActionTrigger>
                                  <Button
                                    colorPalette="red"
                                    onClick={() => handleDelete(user._id)}
                                  >
                                    Excluir
                                  </Button>
                                </Dialog.Footer>
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

          <PaginationComponent
            count={total}
            pageSize={limit}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </Container>
  );
}
