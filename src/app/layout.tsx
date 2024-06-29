import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/yap/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yap",
  description: "Twitter/X clone",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className="w-full h-24 bg-gray-900 px-16">
        <NavBar></NavBar>
      </header>
        {children}
        </body>
    </html>
  );
}
