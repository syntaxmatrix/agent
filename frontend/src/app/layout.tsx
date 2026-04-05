import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
      <body className="antialiased min-h-screen">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}