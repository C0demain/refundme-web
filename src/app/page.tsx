import { PasswordInput } from "@/components/ui/password-input";
import { Box, Button, Field, Input, Stack } from "@chakra-ui/react";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function Login() {
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
          <form >
            <Stack gap="4" align="flex-start" maxW="sm">
              <Field.Root>
                <Field.Label color="black">Email</Field.Label>
                <Input color="black" borderColor="#8a2be2" css={{ "--focus-color": "black" }}/>
              </Field.Root>

              <Field.Root>
                <Field.Label color="black">Senha</Field.Label>
                <PasswordInput color="black" borderColor="#8a2be2" css={{ "--focus-color": "black" }}/>
              </Field.Root>

              <Button bg="#8a2be2" color="white" type="submit">Submit</Button>
            </Stack>
          </form>
        </Box>
      </div>
    </div>
  );
}
