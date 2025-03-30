'use client'
import Logout from "@/components/auth/logout";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

export default function LayoutNavbar({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return(
        <div>
            <header className="flex w-full h-12 bg-[#8a2be2] px-10 items-center justify-between">
                <div className="flex items-center gap-12">
                    <div className="flex gap-2 items-center">
                        <Text color='white' textStyle='2xl' fontWeight='bold'>RefundMe</Text>
                    </div>
                    <Link href='/auth/users' className="font-bold">Usuários</Link>
                    <Link href='/auth/home' className="font-bold">Reembolsos</Link>
                </div>
                <div>
                    <Logout/>
                </div>
            </header>
            <div className="flex-grow h-full mx-auto p-4 mb-5">
                {children}
            </div>
        </div>
    )
}