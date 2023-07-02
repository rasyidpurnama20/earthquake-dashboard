import { Inter } from "next/font/google";
import NextAuthSessionProvider from "./providers/sessionProvider";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui";
import { TailwindIndicator } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AutoML",
  description: "AutoML",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
