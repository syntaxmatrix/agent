"use client"

import React, { useState, useEffect } from "react"
import { 
  PanelLeft, 
  Plus, 
  MessageSquare,
  Sparkles,
  LogOut,
  User,
  LayoutDashboard
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import axios from "@/lib/axios"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  toggle: () => void
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const { isAuthenticated, user, refresh } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentConversationId = searchParams?.get("conversationId");

  const [recentHistory, setRecentHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/history", {
            withCredentials: true
          });
          if (res.data?.ok) {
            setRecentHistory(res.data.history);
          }
        } catch (err) {
          console.warn("Failed to load history", err);
        }
      };
      // Fetch history initially
      fetchHistory();
      
      const handleChatUpdate = () => {
        fetchHistory();
      };
      
      window.addEventListener("chatUpdated", handleChatUpdate);
      return () => window.removeEventListener("chatUpdated", handleChatUpdate);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      toast.success("Successfully Logged Out");
      await refresh();
      router.push("/login");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Sidebar Header: Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-5 shrink-0">
        <Link href="/" className={cn("flex items-center gap-3 transition-opacity duration-300", !isOpen && "opacity-0 pointer-events-none")}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">Agentic AI</span>
        </Link>
        <button 
          onClick={toggle}
          className={cn(
            "p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900",
            !isOpen && "mx-auto"
          )}
        >
          <PanelLeft size={20} />
        </button>
      </div>

      {/* Action: New Chat */}
      <div className="px-4 mb-6 shrink-0">
        <button 
          onClick={() => {
            router.push("/chats");
            window.dispatchEvent(new Event("resetChatWindow"));
          }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95",
            !isOpen && "justify-center px-0 shrink-0"
          )}
        >
          <Plus size={20} />
          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <div className="px-4 mb-4 shrink-0">
        <Link href="/" className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          !isOpen && "justify-center"
        )}>
          <LayoutDashboard size={18} />
          {isOpen && <span>Dashboard</span>}
        </Link>
      </div>

      {/* Recent History - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 py-4 border-t border-slate-100">
        {isOpen && (
          <div className="mb-4">
            <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Activity</h3>
            <div className="space-y-1">
              {recentHistory.map((chat: any, idx) => {
                const isActive = currentConversationId === chat._id;
                return (
                  <button
                    key={chat._id || idx}
                    onClick={() => {
                      router.push(`/chats?conversationId=${chat._id}`);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left group",
                      isActive 
                        ? "bg-slate-100 text-slate-900 font-semibold shadow-sm border border-slate-200/50" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    )}
                  >
                    <MessageSquare size={16} className={cn("shrink-0", isActive ? "text-slate-900" : "text-slate-300 group-hover:text-slate-400")} />
                    <span className="truncate">{typeof chat.latestMessage === "string" ? chat.latestMessage : "New Chat"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-slate-100 shrink-0">
        {isAuthenticated && user ? (
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-200/50 group",
            !isOpen && "justify-center border-none bg-transparent"
          )}>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden shrink-0 border-2 border-white shadow-sm">
              <User size={20} />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate font-medium uppercase tracking-tight">{user.email}</p>
              </div>
            )}
            {isOpen && (
              <button 
                onClick={handleLogout} 
                title="Logout" 
                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        ) : (
          isOpen && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50 text-center">
              <p className="text-xs font-semibold text-slate-500 mb-3">Save your conversations</p>
              <Link 
                href="/login"
                className="block w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95"
              >
                Sign In
              </Link>
            </div>
          )
        )}
      </div>
    </aside>
  )
}
