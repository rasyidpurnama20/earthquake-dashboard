import { Inter, Space_Grotesk } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui";
import { TailwindIndicator } from "@/components";
import NextAuthSessionProvider from "./providers/session-provider";
import QueryProvider from "./providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

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
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <NextTopLoader />
        <NextAuthSessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextAuthSessionProvider>

        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
