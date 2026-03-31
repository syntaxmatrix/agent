import "./globals.css";
import Navbar from "./Navbar";

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
        {children}
      </body>
    </html>
  );
}