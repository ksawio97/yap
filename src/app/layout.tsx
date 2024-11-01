import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/yap/components/Header/Header";
import { SessionProvider } from "next-auth/react";
import { LikeQueueProvider } from "@/yap/libs/contexts/useLikeQueue";
import { OneActiveProvider } from "../libs/contexts/useOneActive";

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
        <SessionProvider>
          <LikeQueueProvider>
            <OneActiveProvider>
              <Header></Header>
              <div className="inline-grid w-full h-full p-8">
                {children}
              </div>
            </OneActiveProvider>
          </LikeQueueProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
