// app/components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 w-full bg-black text-white backdrop-blur-md z-50 border-b border-gray-700">
      <nav className="flex items-center justify-between py-6">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://placehold.co/100x30/ffffff/000000?text=AgenticAI"
            alt="AgenticAI Logo"
            className="h-6"
          />
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="#" className="hover:text-cyan-300 transition-colors">
            Home
          </Link>
          <Link href="#" className="hover:text-cyan-300 transition-colors">
            Agents
          </Link>
          <Link href="#" className="hover:text-cyan-300 transition-colors">
            Register
          </Link>
          <Link href="#" className="hover:text-cyan-300 transition-colors">
            login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
