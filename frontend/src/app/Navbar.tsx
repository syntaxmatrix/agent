"use client";
import React, { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onToggle: () => void;
  isCollapsed: boolean;
  isSidebarOpen: boolean;
  onMobileToggle: () => void;
}

export default function Navbar({ onToggle, isCollapsed, isSidebarOpen, onMobileToggle }: NavbarProps) {
  const [active, setActive] = useState<"login" | "signup" | null>(null);

  return (
    <nav className="fixed top-0 right-0 left-0 z-[80] bg-white/40 backdrop-blur-2xl border-b border-slate-200/50 transition-all duration-300">
      <div className="w-full mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* Left Side: Toggle + Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (window.innerWidth < 768) {
                onMobileToggle();
              } else {
                onToggle();
              }
            }}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen || !isCollapsed ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-slate-900 tracking-tight">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Zap className="fill-white text-white" size={16} />
            </div>
            <span className="hidden sm:inline-block">Agentic AI</span>
          </Link>
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setActive("login")}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => setActive("signup")}
            className="group relative px-6 py-2.5 text-sm font-bold text-white overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x"></div>
            <span className="relative z-10">Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
}