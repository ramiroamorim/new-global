import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A maior oportunidade de vendas de infoprotudos",
  description:
    "Umas das maiores oportunidades que ja existiu de ganhar em multiplas moedas no conforto da sua casa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased bg-black", inter.className)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
