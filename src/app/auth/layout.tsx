import { MdOutlineAttachMoney } from "react-icons/md";

export default function LayoutNavbar({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
            <header className="flex w-full h-12 bg-[#8a2be2] px-10 items-center">
                <div className="flex items-center gap-2">
                    <MdOutlineAttachMoney size={40} />
                    <p className="text-white font-bold">RefoundMe</p>
                </div>
            </header>
            <div className="flex-grow container mx-auto p-4 mb-5">
                {children}
            </div>
        </div>
    )
}