import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui";
import { TailwindIndicator } from "@/components";
import NextAuthSessionProvider from "./providers/session-provider";
import QueryProvider from "./providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AutoML - Freeport Metrics",
  description: "An earthquake prediction system for Freeport",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <QueryProvider>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </QueryProvider>

        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
