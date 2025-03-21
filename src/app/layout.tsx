import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/context/authContext";
import { ColorModeScript } from "@chakra-ui/color-mode";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <title>RefoundMe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="w-full min-h-screen flex flex-col">
        <Provider>
          <AuthProvider>
            <div className="bg-gradient-to-b from-gray-200 to-white flex-1 flex flex-col">
              {children}
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
