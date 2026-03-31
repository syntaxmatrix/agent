import "./globals.css";
import Navbar from "./components/Navbar";

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
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}