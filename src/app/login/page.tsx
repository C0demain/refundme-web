"use client";

import { useAuth } from "@/context/authContext";
import {
  Box,
  Button,
  Field,
  Input,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Toast SweetAlert2
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      Toast.fire({
        icon: "success",
        title: "Login realizado com sucesso!",
        position: "top",
      });
    } catch (err: any) {
      console.error(err);

      let errorMessages: string[] = [];

      try {
        // Se o erro veio em formato JSON stringificado
        errorMessages = JSON.parse(err.message);
      } catch {
        // Fallback simples
        errorMessages = [err.message || "Erro ao fazer login."];
      }

      // Concatena os erros com quebra de linha
      Toast.fire({
        icon: "error",
        title: errorMessages.join("\n"),
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen justify-center items-center bg-light">
      <Box w="80%" maxW="md" bg="white" rounded="xl" p="8" boxShadow="lg">
        <form onSubmit={handleLogin}>
          <Stack gap="4" align="center">
            <Image
              src="/logoo.png"
              alt="Logo"
              w="400px"
              h="200px"
              objectFit="contain"
            />

            <Field.Root>
              <Field.Label color="black">E-mail</Field.Label>
              <Input
                placeholder="Digite um e-mail"
                color="black"
                borderColor="#8a2be2"
                css={{ "--focus-color": "black" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field.Root>

            <Field.Root>

              <Field.Label color="black">Senha</Field.Label>
              <Box position="relative" w="100%">
                <Input
                  placeholder="Digite uma senha"
                  type={showPassword ? "text" : "password"}
                  color="black"
                  borderColor="#8a2be2"
                  css={{ "--focus-color": "black" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pr="3rem" // espaço pro botão
                />
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  position="absolute"
                  top="50%"
                  right="0.5rem"
                  transform="translateY(-50%)"
                  size="sm"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <FaEyeSlash color="#8a2be2" /> : <FaEye color="#8a2be2" />}

                </Button>
              </Box>


            </Field.Root>

            <Button
              loading={isLoading}
              bg="#8a2be2"
              color="white"
              type="submit"
              _hover={{ bg: "#7a1fd1" }}
              w="100%"
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
}
