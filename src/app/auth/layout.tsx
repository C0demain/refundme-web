'use client'
import Logout from "@/components/auth/logout";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function LayoutNavbar({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return(
        <div>
            <header className="flex w-full h-12 bg-[#8a2be2] px-10 items-center justify-between">
                <div className="flex items-center gap-2">
                    <MdOutlineAttachMoney size={40} />
                    <p className="text-white font-bold">RefoundMe</p>
                </div>
                <div>
                    <Logout/>
                </div>
            </header>
            <div className="flex-grow container mx-auto p-4 mb-5">
                {children}
            </div>
        </div>
    )
}