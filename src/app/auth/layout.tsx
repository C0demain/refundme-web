"use client";
import Logout from "@/components/auth/logout";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Avatar, For, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import Dashboard from "./charts/page";

export default function LayoutNavbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex w-full h-20 bg-[#8a2be2] px-10 items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex gap-2 items-center">
            <Image
              src="/logo.png"
              alt="RefundMe Logo"
              width="290px"
              height="50px"
              mx="auto"
              my={4}
              ml="140px"
            />
          </div>
          <div className="flex justify-end items-end gap-12 pl-10">
            <Link href={"/auth/charts"} className="font-bold">
              Gráficos
            </Link>
            <Link href="/auth/users" className="font-bold">
              Usuários
            </Link>
            <Link href="/auth/home" className="font-bold">
              Reembolsos
            </Link>
            <Link href="/auth/projects" className="font-bold">
              Projetos
            </Link>
            <Link href="/auth/requests" className="font-bold">
              Solicitações
            </Link>
          </div>
        </div>
        <div>
          <Logout />
        </div>
      </header>
      <div className="flex-grow h-full mx-auto p-4 mb-5">{children}</div>
    </div>
  );
}
