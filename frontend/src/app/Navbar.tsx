"use client";
import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState<"login" | "signup" | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-indigo-50/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600 tracking-tight">
            <Zap className="fill-indigo-600 text-indigo-600" size={20} />
            Agentic AI
          </Link>

          {/* NAV ITEMS */}
          <div className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-indigo-600 transition-colors">About</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Services</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActive("login")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              active === "login" 
                ? "text-indigo-700 bg-indigo-50 border-indigo-200" 
                : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border-transparent shadow-sm"
            } border`}
          >
            Login
          </button>
          <button
            onClick={() => setActive("signup")}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}