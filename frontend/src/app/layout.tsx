import "./globals.css";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agentic AI",
  description: "Autonomous AI Agent System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col`}>
        <Navbar />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}