import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default : "Authentication",
    template : "%s | Authentication"
  },
  description: "Find ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Toaster />
          <Header/>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
