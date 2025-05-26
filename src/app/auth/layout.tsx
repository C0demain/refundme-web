"use client";
import Logout from "@/components/auth/logout";
import { Box, HStack, Image, Stack, Text, Theme } from "@chakra-ui/react";
import Link from "next/link";

export default function LayoutNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Box bg="#8a2be2" py={3} px={8}>
        <Stack direction={"row"} justify="space-between" align="center" gap={8}>
          <HStack gap={20}>
            <Image
              src="/logo.png"
              alt="RefundMe Logo"
              width="250px"
              height="auto"
            />

            <HStack gap={10} color="white">
              <Link href="/auth/charts" className="font-bold">
                <Text
                  fontSize={"md"}
                  fontWeight={"medium"}
                  letterSpacing={"wide"}
                >
                  Gráficos
                </Text>
              </Link>
              <Link href="/auth/users" className="font-bold">
                <Text
                  fontSize={"md"}
                  fontWeight={"medium"}
                  letterSpacing={"wide"}
                >
                  Usuários
                </Text>
              </Link>
              {/* <Link href="/auth/home" className="font-bold">
                <Text fontSize={"md"} fontWeight={"medium"} letterSpacing={"wide"}>Reembolsos</Text>
              </Link> */}
              <Link href="/auth/projects" className="font-bold">
                <Text
                  fontSize={"md"}
                  fontWeight={"medium"}
                  letterSpacing={"wide"}
                >
                  Projetos
                </Text>
              </Link>
              <Link href="/auth/requests" className="font-bold">
                <Text
                  fontSize={"md"}
                  fontWeight={"medium"}
                  letterSpacing={"wide"}
                >
                  Solicitações
                </Text>
              </Link>
            </HStack>
          </HStack>

          <Logout />
        </Stack>
      </Box>

      <div className="flex-grow h-full mx-auto p-4 mb-5">{children}</div>
    </div>
  );
}
