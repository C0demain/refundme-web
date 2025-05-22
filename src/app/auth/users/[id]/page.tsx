"use client";

import User from "@/@types/User";
import { getUserById, updateUser } from "@/services/userService";
import {
  Container,
  Text,
  Spinner,
  Center,
  Button,
  Input,
  VStack,
  HStack,
  Heading,
  Stack,
  Field,
  FieldErrorText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const isEmailValid = (email: string) => {
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
  return emailRegex.test(email);
};

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUser = async () => {
    try {
      const fetchedUser = await getUserById(String(id));
      setUser(fetchedUser);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setErrorMessage("Erro ao carregar dados do usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!user?.name || !user.email) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    if (!isEmailValid(user.email)) {
      setErrorMessage("O email informado é inválido.");
      return;
    }

    try {
      await updateUser(String(id)!, {
        name: user.name,
        email: user.email,
      });

      router.push("/auth/users");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setErrorMessage("Erro ao atualizar usuário.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <Container centerContent>
      <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
        Edição de Usuário
      </Text>

      {errorMessage && (
        <Center>
          <Field.Root invalid>
            <FieldErrorText>{errorMessage}</FieldErrorText>
          </Field.Root>
        </Center>
      )}

      {isLoading || !user ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <VStack mb={4} w="sm" align="center">
          <Heading size="sm" alignSelf="start" color="gray.800">Nome</Heading>
            <Input
            placeholder="Nome"
            value={user.name || ""} // ← aqui
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            borderColor="purple.500"
            color="gray.800"
            />

            <Input
            placeholder="Email"
            value={user.email || ""} // ← e aqui
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            borderColor="purple.500"
            color="gray.800"
            />

          <HStack>
            <Button
              colorScheme="purple"
              bg="purple.600"
              color="white"
              onClick={handleUpdateUser}
              _hover={{ bg: "purple.700" }}
            >
              Atualizar
            </Button>
            <Button
              variant="outline"
              colorScheme="purple"
              onClick={() => router.push("/auth/users")}
              _hover={{ bg: "gray.200" }}
            >
              Cancelar
            </Button>
          </HStack>
        </VStack>
      )}
    </Container>
  );
}
