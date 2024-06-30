import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/yap/components/Header/Header";

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
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
