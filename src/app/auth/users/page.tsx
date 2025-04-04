"use client";

import User from "@/@types/User";
import { getAllUsers, createUser, deleteUser } from "@/services/userService";
import {
  Container,
  Table,
  Text,
  Spinner,
  Center,
  Button,
  Dialog,
  Portal,
  CloseButton
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type NewUser = Omit<User, "id"> & { password: string };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const deleteUser = async (id: string) => {
    console.log("ID do usuário a ser deletado:", id); // Verifica o ID antes da requisição
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
    }
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
                  <Table.ColumnHeader bg="#8a2be2" textStyle="xl">Ações</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user, i) => (
                  <Table.Row key={i}>
                    <Table.Cell bg="white" color="black" textStyle="md">{user.name}</Table.Cell>
                    <Table.Cell bg="white" color="black" textStyle="md">{user.email}</Table.Cell>
                    <Table.Cell bg="white" color="black" textStyle="md">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Button variant="outline" size="sm" bg="#8a2be2">
                          Excluir
                        </Button>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop  className="fixed inset-0 bg-black opacity-50" />
                        <Dialog.Positioner>
                          <Dialog.Content bg="white" color="black" p="6" rounded="lg" shadow="lg">
                            <Dialog.Header>
                              <Dialog.Title color="black">Confirmar Exclusão</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <p  color="black">
                              Tem certeza de que deseja excluir este usuário? Esta ação não poderá ser desfeita.
                              </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline" color="#000000" _hover={{bg: "white"}}>Cancelar</Button>
                              </Dialog.ActionTrigger>
                              <Button  bg="#8a2be2" color="white" onClick={() => deleteUser(user.id)}>Excluir</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton size="sm" color="#000000"/>
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>
                    </Table.Cell>
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
