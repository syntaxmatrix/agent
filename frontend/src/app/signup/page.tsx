"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/user/register", {
        email,
        password,
        name: `${firstName} ${surname}`.trim(),
      });
      toast.success("Verification code sent to your email.");
      setStep(2);
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/user/verifyemail", { securityCode: otp });
      toast.success("Email verified successfully! You can now sign in.");
      router.push("/signin");
    } catch (error: any) {
      const message = error.response?.data?.message || "Verification failed.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30 selection:text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-slate-950 to-slate-950"></div>
      
      <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
             {step === 1 ? "Create an account" : "Verify your email"}
           </h1>
           <p className="text-slate-400 text-sm">
             {step === 1 ? "Enter your details to get started." : `Sent a code to ${email}`}
           </p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 ml-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500/30 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 ml-1">Surname</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Surname"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500/30 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500/30 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Continue"}
                {!isLoading && <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 ml-1">Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] font-bold text-white placeholder:text-slate-800 outline-none focus:border-indigo-500/30 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3 text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Verify Code"}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Change email address
              </button>
            </form>
          )}

          {step === 1 && (
            <>
              <div className="relative my-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <span className="relative px-4 bg-transparent">OR</span>
              </div>

              <button
                onClick={() => window.location.href = "/api/user/google"}
                className="w-full bg-transparent hover:bg-white/[0.03] border border-white/5 text-slate-300 rounded-xl py-3 text-sm font-medium transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            </>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account? <Link href="/signin" className="text-indigo-400 font-semibold hover:text-indigo-300 ml-1">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
