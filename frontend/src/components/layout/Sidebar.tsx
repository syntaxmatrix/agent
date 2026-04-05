"use client"

import React, { useState } from "react"
import { 
  PanelLeft, 
  Plus, 
  MessageSquare,
  Sparkles,
  LogOut,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  toggle: () => void
  isLoggedIn: boolean
  onLogin: () => void
}

export default function Sidebar({ isOpen, toggle, isLoggedIn, onLogin }: SidebarProps) {
  const [activeChat, setActiveChat] = useState<number | null>(0)

  const recentHistory = [
    "Quantum computing for kids",
    "Modern SaaS architecture 2026",
    "Tailwind CSS v4 features",
    "React Server Components deep dive",
    "The future of Agentic AI",
    "Healthy breakfast recipes",
    "Travel itinerary for Tokyo",
    "Python optimization tips"
  ]

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col sidebar-transition",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Sidebar Header: Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-4 shrink-0">
        <div className={cn("flex items-center gap-3 transition-opacity duration-300", !isOpen && "opacity-0 pointer-events-none")}>
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white human-shadow active:scale-95 transition-transform">
            <Sparkles size={20} />
          </div>
          <span className="font-display font-bold text-slate-800 text-lg">Agentic AI</span>
        </div>
        <button 
          onClick={toggle}
          className={cn(
            "p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground/60",
            !isOpen && "mx-auto"
          )}
        >
          <PanelLeft size={20} />
        </button>
      </div>

      {/* Action: New Chat */}
      <div className="px-3 mb-6 shrink-0">
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-white border border-sidebar-border text-slate-700 font-medium hover:bg-slate-50 transition-all hover-lift active:scale-95",
          !isOpen && "justify-center px-0 shrink-0"
        )}>
          <Plus size={20} className="text-slate-400" />
          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Recent History - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
        {isOpen && (
          <div className="mb-4">
            <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent History</h3>
            <div className="space-y-1">
              {recentHistory.map((chat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChat(idx)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left group",
                    activeChat === idx 
                      ? "bg-slate-200/50 text-slate-900 font-medium shadow-sm border border-slate-200/50" 
                      : "text-slate-500 hover:bg-sidebar-accent hover:text-slate-800"
                  )}
                >
                  <MessageSquare size={16} className={cn("shrink-0", activeChat === idx ? "text-slate-900" : "text-slate-300 group-hover:text-slate-400")} />
                  <span className="truncate">{chat}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Section */}
      <div className="p-3 border-t border-sidebar-border shrink-0">
        {isLoggedIn ? (
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-2xl hover:bg-sidebar-accent transition-all cursor-pointer group",
            !isOpen && "justify-center"
          )}>
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 overflow-hidden shrink-0">
              <User size={20} />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">Agentic User</p>
                <p className="text-xs text-slate-500 truncate">user@agentic.ai</p>
              </div>
            )}
          </div>
        ) : (
          isOpen && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/50">
              <p className="text-xs text-slate-500 mb-3 text-center">Login to sync your history</p>
              <button 
                onClick={onLogin}
                className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-all"
              >
                Sign In
              </button>
            </div>
          )
        )}
      </div>
    </aside>
  )
}
