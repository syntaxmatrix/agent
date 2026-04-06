import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LogoutHandler from "@/components/LogoutHandler";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Agentic AI - Assistant v2.6",
  description: "Modern SaaS AI assistant for achieving great things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <AuthProvider>
          <LogoutHandler />
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}