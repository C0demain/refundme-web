"use client";

import { useAuth } from "@/context/authContext";
import { Box, Button, Field, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Seção roxa (lado esquerdo) */}
      <div className="bg-[#8a2be2] w-1/3 flex flex-col justify-center items-center">
        <FaMoneyBillTransfer size={40} />
        <p className="font-bold text-5xl text-white">RefoundMe</p>
      </div>

      {/* Seção branca (lado direito) */}
      <div className="w-2/3 flex flex-col justify-center items-center">
        <Box w="50%" bg="white" rounded="5%" p="5%">
          <form onSubmit={handleLogin}>
            <Stack gap="4" align="flex-start" maxW="sm">
              {error && <p className="text-red-500">{error}</p>}

              <Field.Root>
                <Field.Label color="black">Email</Field.Label>
                <Input
                  color="black"
                  borderColor="#8a2be2"
                  css={{ "--focus-color": "black" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color="black">Senha</Field.Label>
                <Input
                  type="password"
                  color="black"
                  borderColor="#8a2be2"
                  css={{ "--focus-color": "black" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field.Root>

              <Button bg="#8a2be2" color="white" type="submit">
                Entrar
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
    </div>
  );
}
