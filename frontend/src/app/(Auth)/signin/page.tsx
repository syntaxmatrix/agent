"use client"

import React from "react"
import Link from "next/link"
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-slate-900 items-center justify-center text-white human-shadow mb-6 mx-auto active:scale-95 transition-transform">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-800 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Continue your journey with Agentic AI</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 human-shadow p-8 md:p-10">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-slate-900/10 focus:ring-4 focus:ring-slate-900/5 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-slate-900/10 focus:ring-4 focus:ring-slate-900/5 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <button 
              className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all human-shadow mt-4"
              type="submit"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative my-8 text-center" aria-hidden="true">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 py-1 text-[10px] font-bold text-slate-400 bg-white uppercase tracking-widest">or continue with</span>
          </div>

          <button className="w-full h-14 border border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-[0.98] transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-center mt-8 text-sm font-medium text-slate-500">
          Don't have an account? <Link href="/signup" className="text-slate-900 font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
