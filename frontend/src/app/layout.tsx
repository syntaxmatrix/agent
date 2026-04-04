import "./globals.css";
import Navbar from "./Navbar"; // ✅ FIXED
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";

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
     <body>
  <Navbar />
  {children}   {/* ✅ NO marginTop */}
  <Toaster richColors />
</body>
    </html>
  );
}