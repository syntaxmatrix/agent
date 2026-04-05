"use client";
import React, { useState } from "react";
import { Search, Zap, Shield, Layout, Globe, ArrowRight, Github, Twitter, Linkedin, Sparkles } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setHistory((prev) => [query, ...prev]);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col pt-16 font-sans selection:bg-indigo-100">
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto relative relative">
        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full flex flex-col items-center">
          
          {/* HERO SECTION */}
          <section className="w-full max-w-4xl px-4 py-20 md:py-32 flex flex-col items-center text-center relative z-10">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 backdrop-blur-md shadow-sm">
              <Sparkles size={14} className="text-indigo-500" />
              <span>Introducing the next-gen AI workspace</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Empower your ideas with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
                Autonomous Intelligence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
              Experience the power of a modern AI assistant. Seamlessly search, generate, and organize your workflows in a beautifully crafted interface.
            </p>

            {/* SEARCH BAR */}
            <div className="w-full max-w-2xl relative flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-full bg-white p-2 border border-slate-200/60 ring-4 ring-indigo-50/50">
              <div className="pl-5 pr-2 text-indigo-400">
                <Search size={22} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search here or ask a question..."
                className="flex-1 bg-transparent border-none outline-none py-3.5 px-2 text-slate-700 text-lg placeholder:text-slate-400"
              />
              <button
                onClick={handleSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2"
              >
                Search <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500 flex-wrap justify-center">
              <span className="font-medium text-slate-400 mr-2">Popular:</span>
              <span className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer shadow-sm transition-all hover:-translate-y-0.5">Generate UI</span>
              <span className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer shadow-sm transition-all hover:-translate-y-0.5">Write an email</span>
              <span className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer shadow-sm transition-all hover:-translate-y-0.5">Analyze data</span>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section className="w-full relative px-4 py-20 bg-white border-y border-slate-100 z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to build faster</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">Our platform combines cutting-edge AI capabilities with an intuitive, seamless design system.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: <Zap className="text-amber-500" size={24} />, title: "Lighting Fast", desc: "Experience zero-latency responses backed by optimized edge infrastructure." },
                  { icon: <Shield className="text-emerald-500" size={24} />, title: "Secure & Private", desc: "Your data is encrypted and completely secure. We never train on your prompts." },
                  { icon: <Layout className="text-indigo-500" size={24} />, title: "Modern Design", desc: "Crafted with love using clean typography, glassmorphism, and smooth animations." },
                  { icon: <Globe className="text-purple-500" size={24} />, title: "Global Scale", desc: "Deploy your instances anywhere in the world with one simple click." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* FOOTER */}
          <footer className="w-full bg-slate-50 py-12 mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
                <Zap className="fill-indigo-600" size={22} /> Agentic AI
              </div>
              <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
              </div>
              <div className="flex items-center gap-5 text-slate-400">
                <a href="#" className="hover:text-slate-900 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-slate-900 transition-colors"><Github size={20} /></a>
                <a href="#" className="hover:text-slate-900 transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            <div className="text-center text-sm text-slate-400 mt-10">
              &copy; {new Date().getFullYear()} Agentic AI Inc. All rights reserved.
            </div>
          </footer>
        </main>

        {/* RIGHT SIDEBAR */}
        <Sidebar history={history} />
      </div>
    </div>
  );
}