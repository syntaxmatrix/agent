"use client";
import React, { useState } from "react";
import { Search, ArrowRight, Sparkles, Wand2, Mail, BarChart3, Bot, Fingerprint, Cpu, Zap } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "./Navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile

  const handleSearch = () => {
    if (!query.trim()) return;
    setHistory((prev) => [query, ...prev]);
    setQuery("");
  };

  const suggestions = [
    { text: "Generate UI", icon: <Wand2 size={14} className="text-purple-500" /> },
    { text: "Write an email", icon: <Mail size={14} className="text-blue-500" /> },
    { text: "Analyze data", icon: <BarChart3 size={14} className="text-indigo-500" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* HEADER UNIT */}
      <Navbar 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
        isCollapsed={isCollapsed} 
        isSidebarOpen={isSidebarOpen}
        onMobileToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Sidebar background overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[90] md:hidden backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <Sidebar 
        history={history} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isOpen={isSidebarOpen} 
      />

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 w-full flex flex-col items-center transition-all duration-300 pt-16 ${
        isCollapsed ? "md:pl-[72px]" : "md:pl-[280px]"
      }`}>
        
        <section className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          {/* Enhanced Background Architecture */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/20 via-slate-50/0 to-purple-100/10"></div>
          
          <div className="relative z-10 max-w-4xl">
            {/* Header / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/50 text-slate-800 text-xs font-bold mb-8 shadow-sm hover:translate-y-[-2px] transition-transform cursor-pointer">
              <Sparkles size={14} className="text-indigo-600 animate-spin-slow" />
              <span className="uppercase tracking-wider">Autonomous Intelligence v2.0</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Empower your ideas with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x">
                Autonomous Intelligence
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-base md:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              Seamlessly automate workflows, generate interfaces, and derive insights with your next-gen AI workspace.
            </p>

            {/* SEARCH BAR UNIT (COMPACT) */}
            <div className="w-full max-w-xl mx-auto group">
              <div className="relative flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm focus-within:shadow-indigo-100/50 focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-300">
                <div className="pl-4 pr-1 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Search size={20} strokeWidth={2} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-slate-700 text-base placeholder:text-slate-400 font-medium"
                />
                <button
                  onClick={handleSearch}
                  className="bg-indigo-600 hover:bg-slate-900 text-white rounded-xl px-5 h-[42px] flex items-center justify-center gap-2 font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-100"
                >
                  <span className="hidden sm:inline text-sm">Send</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* SUGGESTION CHIPS */}
            <div className="mt-8 flex items-center gap-2.5 text-xs text-slate-500 flex-wrap justify-center font-bold">
              {suggestions.map((suggestion, idx) => (
                <button 
                  key={idx}
                  onClick={() => setQuery(suggestion.text)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2 group/chip active:scale-95"
                >
                  <span className="group-hover/chip:scale-110 transition-transform opacity-80">{suggestion.icon}</span>
                  <span className="text-slate-600 group-hover:text-slate-900">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}