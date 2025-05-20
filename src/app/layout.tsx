import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <title>RefundMe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className="w-full min-h-screen flex flex-col">
        <Provider>
          <AuthProvider>
            <div className="bg-gradient-to-b from-gray-200 to-white flex-1 flex flex-col">
              {children}
            </div>
          </AuthProvider>
        </Provider>
        <Toaster position="bottom-right"/>
      </body>
    </html>
  );
}
