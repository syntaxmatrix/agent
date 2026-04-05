"use client"

import React from "react"
import { PanelLeft, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface HeaderProps {
  isOpen: boolean
  toggle: () => void
  isLoggedIn: boolean
  onLogin: () => void
}

export default function Header({ isOpen, toggle, isLoggedIn, onLogin }: HeaderProps) {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-transparent relative z-30">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <button 
          onClick={toggle}
          className="p-2.5 rounded-xl hover:bg-sidebar-accent/80 transition-all text-sidebar-foreground/70 active:scale-95"
          aria-label="Toggle Sidebar"
        >
          <PanelLeft size={20} />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="font-display font-bold text-slate-800 tracking-tight text-lg">Assistant v2.6</span>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-slate-200/50">PRO</span>
        </div>
      </div>

      {/* Center Section - Removed per request */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0"></div>

      {/* Right Section - Auth Buttons (Only if not logged in) */}
      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link 
              href="/signin"
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-2xl hover:bg-slate-800 transition-all shadow-md shadow-slate-200 active:scale-95"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="w-[120px]" /> /* Spacer to keep balance if needed */
        )}
      </div>
    </header>
  )
}
