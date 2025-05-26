"use client";

import User from "@/@types/User";
import { getAllUsers, createUser } from "@/services/userService";
import {
  Container,
  Table,
  Text,
  Spinner,
  Select,
  Center,
  Button,
  Input,
  VStack,
  HStack,
  Heading,
  Stack,
  Field,
  FieldErrorText
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

// Função auxiliar para calcular força da senha
const calculatePasswordStrength = (password: string) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 6) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};

const isEmailValid = (email: string) => {
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
  return emailRegex.test(email);
};

type NewUser = Omit<User, "_id"> & { password: string };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const newUsers = await getAllUsers();
      setUsers(newUsers.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    if (!isEmailValid(newUser.email)) {
      setErrorMessage("O email informado é inválido.");
      return;
    }

    try {
      const userToCreate: User = { _id: "", ...newUser };
      const createdUser = await createUser(userToCreate);

      setUsers([...users, createdUser]);
      setNewUser({ name: "", email: "", password: "", role: "" });
      setPasswordStrength(0);
      setErrorMessage("");
      router.push("/auth/users");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setErrorMessage("Erro ao criar usuário. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push("/auth/home");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, password: value });
    setPasswordStrength(calculatePasswordStrength(value));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container centerContent bg="white" width="2/6">
      <Text fontSize="3xl" fontWeight="bold" color="black" my="6">
        Cadastro de Usuários
      </Text>

      {errorMessage && (
        <Center>
          <Field.Root invalid>
            <FieldErrorText>{errorMessage}</FieldErrorText>
          </Field.Root>
        </Center>
      )}

      {isLoading ? (
        <Center py="20">
          <Spinner color="#8a2be2" size="xl" />
        </Center>
      ) : (
        <VStack mb={4} w="sm" align="center">
          <Heading size="sm" alignSelf="start" color="gray.800">Nome</Heading>
          <Input
            placeholder="Nome"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            borderColor="purple.500"
            color="gray.800"
          />
          <Heading size="sm" alignSelf="start" color="gray.800">Email</Heading>
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            borderColor="purple.500"
            color="gray.800"
          />
          
          <Heading size="sm" alignSelf="start" color="gray.800">Senha</Heading>
          <Stack w="full" color="gray.800">
            <PasswordInput
              placeholder="Senha"
              type="password"
              value={newUser.password}
              onChange={handlePasswordChange}
              borderColor="purple.500"
              color="gray.800"
            />
            <PasswordStrengthMeter value={passwordStrength} color="gray.800"/>
          </Stack>
          <HStack>
            <Button
              colorScheme="purple"
              bg="purple.600"
              color="white"
              onClick={handleCreateUser}
              _hover={{ bg: "purple.700" }}
            >
              Cadastrar
            </Button>
            <Button
              variant="outline"
              colorScheme="purple"
              color="gray.700"
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