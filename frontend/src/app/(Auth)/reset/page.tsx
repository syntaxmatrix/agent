"use client"

import React, { useState } from "react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd, Mail, Lock, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code || !password) return toast.error("All fields required");
    setLoading(true);
    try {
      await axios.post("/api/user/passwordreset", { email, securityCode: code, password });
      toast.success("Password Changed", {
        description: "Your password has been successfully updated."
      });
      router.push("/login");
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? "Password reset failed";
      toast.error("Reset Failed", {
        description: msg
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <div className="flex size-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
              <GalleryVerticalEnd size={20} />
            </div>
            Agentic AI.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight">Set new password</h1>
              <p className="text-slate-500 font-medium">
                Please enter the code sent to your email and your new password.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <Input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="name@example.com"
                    className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Security Code</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <Input 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    placeholder="Enter 6-digit code"
                    className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={18} />
                  <Input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="••••••••"
                    className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white transition-all"
                    required 
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-md font-bold shadow-lg active:scale-95 transition-all mt-4">
                {loading ? "Updating..." : "Reset Password"}
              </Button>
            </form>

            <div className="text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-slate-100 lg:block overflow-hidden">
        <img
          src="/puzzul.jpg"
          alt="Security visual"
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-slate-900/90 flex flex-col justify-center p-16 text-white">
          <ShieldCheck size={64} className="mb-8 opacity-80" />
          <h2 className="text-4xl font-bold mb-4">Identity Verification.</h2>
          <p className="text-xl text-slate-200 font-medium leading-relaxed max-w-md">
            We use multi-factor verification to ensure that only you can access and manage your account.
          </p>
        </div>
      </div>
    </div>
  );
}
