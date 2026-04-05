"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
  Sparkles,
  Plus,
  Users,
  Calendar,
  BrainCircuit,
  Image as ImageIcon,
  Search,
  Music,
  ArrowUpRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollY = e.target.scrollTop || window.scrollY
      setIsScrolled(scrollY > 150)
    }

    // Listen to the main scroll container in the layout
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      if (mainContent) mainContent.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      title: "Contribute",
      subtitle: "Ideas & Feedback",
      description: "Share your thoughts, contribute new ideas, and manage your tasks effortlessly.",
      icon: Plus,
      color: "bg-blue-50 text-blue-500 border-blue-100"
    },
    {
      title: "Collaborate",
      subtitle: "Team Connection",
      description: "Stay connected with your team, share resources, and collaborate in real-time.",
      icon: Users,
      color: "bg-indigo-50 text-indigo-500 border-indigo-100"
    },
    {
      title: "Prioritize",
      subtitle: "Time & Goals",
      description: "Organize your busy schedule and set important priorities for your daily success.",
      icon: Calendar,
      color: "bg-violet-50 text-violet-500 border-violet-100"
    }
  ]

  const actions = [
    { name: "Deep Research", icon: BrainCircuit },
    { name: "Make an Image", icon: ImageIcon },
    { name: "Search", icon: Search },
    { name: "Create Music", icon: Music }
  ]

  const shouldFloat = !isLoggedIn && isScrolled

  return (
    <div className="flex flex-col gap-12 pt-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-white/50 human-shadow p-8 md:p-14 overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-8 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
              <Sparkles size={12} className="text-slate-400" />
              Intelligence v2.6
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-800 leading-[1.05] tracking-tight">
              Hi Agentic AI, <br />
              <span className="text-slate-400">Ready to Achieve Great Things?</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Explore your personalized workspace where creativity meets productivity. Your AI assistant is ready to help you build the future.
            </p>

            {/* Static Search Bar Position (Hidden when floating) */}
            <div className={cn(
              "transition-all duration-500 ease-in-out w-full max-w-2xl mx-auto md:mx-0",
              shouldFloat ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
            )}>
              <InputBar actions={actions} />
            </div>
          </div>

          <div className="relative flex-1 flex justify-center lg:justify-end">
            <div className="relative w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] drop-shadow-2xl animate-float">
              <Image
                src="/robot.png"
                alt="Friendly AI Robot"
                fill
                className="object-contain"
                priority
              />

              {/* Floating Chat Bubble */}
              <div className="absolute -top-4 -right-2 md:top-10 md:right-0 bg-white p-4 rounded-2xl rounded-tr-none human-shadow border border-slate-100/50 animate-bounce-slow">
                <p className="text-sm font-semibold text-slate-800">How can I help you?</p>
                <div className="absolute top-0 right-0 w-3 h-3 bg-white border-t border-r border-slate-100/50 rotate-45 translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements for 'human-crafted' feel */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-100/30 rounded-full blur-3xl -z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/20 rounded-full blur-3xl -z-0"></div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-slate-200 transition-all duration-300 human-shadow cursor-pointer hover-lift overflow-hidden"
          >
            <div className="relative z-10 space-y-5">
              <div className={cn(
                "w-14 h-14 rounded-2xl border flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg",
                feature.color
              )}>
                <feature.icon size={26} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-semibold text-slate-800">{feature.title}</h3>
                <span className="inline-block text-[10px] font-bold text-slate-400 border border-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-widest leading-none">
                  {feature.subtitle}
                </span>
                <p className="text-slate-500 text-sm leading-relaxed pt-2">
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Organic imperfection line */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity">
              <ArrowUpRight size={24} className="text-slate-900" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </section>

      {/* Floating Search Bar (Visible only when shouldFloat is true) */}
      <div className={cn(
        "fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-[60] transition-all duration-500 ease-in-out",
        shouldFloat ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}>
        <InputBar actions={actions} />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

function InputBar({ actions }: { actions: any[] }) {
  return (
    <div className="glass rounded-[2rem] border border-white/60 human-shadow p-3 ring-8 ring-slate-900/5 shadow-2xl">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Example: Explain quantum computing in simple terms"
            className="w-full bg-transparent px-6 py-5 text-base focus:outline-none placeholder:text-slate-300 font-medium pr-16"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-slate-800 active:scale-95 transition-all"
            aria-label="Send message"
          >
            <ArrowUpRight size={24} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 px-4 pb-1">
          {actions.map((btn, idx) => (
            <button
              key={idx}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm active:scale-95"
            >
              <btn.icon size={14} className="text-slate-400 group-hover:text-slate-600" />
              {btn.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
