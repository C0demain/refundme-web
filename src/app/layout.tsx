import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <title>RefoundMe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="w-full min-h-screen flex flex-col">
        <Provider><div className="bg-gradient-to-b from-gray-200 to-white flex-1 flex flex-col">{children}</div></Provider>
      </body>
    </html>
  );
}
