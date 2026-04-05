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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500/30 selection:text-white overflow-hidden">
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
        
        <section className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 py-12 relative overflow-hidden">
          {/* Enhanced Background Architecture */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 via-slate-950 to-purple-500/5"></div>
          
          <div className="relative z-10 max-w-4xl">
            {/* Header / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 text-xs font-semibold mb-10 shadow-sm hover:translate-y-[-1px] transition-all cursor-default">
              <Sparkles size={13} className="text-indigo-400" />
              <span className="uppercase tracking-[0.1em] text-[10px]">Autonomous Intelligence v2.0</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2] lg:px-4">
              Empower your ideas with <br className="hidden md:block" />
              <span className="text-indigo-400">
                Autonomous Intelligence
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-base md:text-lg text-slate-400/80 mb-12 max-w-xl mx-auto leading-relaxed font-normal">
              Seamlessly automate workflows, generate interfaces, and derive insights with your next-gen AI workspace.
            </p>

            {/* SEARCH BAR UNIT (COMPACT) */}
            <div className="w-full max-w-lg mx-auto group">
              <div className="relative flex items-center bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 focus-within:border-indigo-500/30">
                <div className="pl-4 pr-1 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Search size={20} strokeWidth={2} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none py-3 px-3 text-slate-200 text-sm placeholder:text-slate-500 font-normal"
                />
                <button
                  onClick={handleSearch}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-5 h-[44px] flex items-center justify-center gap-2 font-semibold transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-500/10"
                >
                  <span className="hidden sm:inline text-xs">Send</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* SUGGESTION CHIPS */}
            <div className="mt-10 flex items-center gap-3 text-[11px] text-slate-500 flex-wrap justify-center">
              {suggestions.map((suggestion, idx) => (
                <button 
                  key={idx}
                  onClick={() => setQuery(suggestion.text)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all hover:-translate-y-0.5 flex items-center gap-2 group/chip active:scale-95"
                >
                  <span className="group-hover/chip:scale-110 transition-transform opacity-70">{suggestion.icon}</span>
                  <span className="text-slate-400 group-hover:text-slate-200 font-medium">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}