'use client'

import { SessionProvider } from 'next-auth/react';
import { metadata } from "./metadata";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
