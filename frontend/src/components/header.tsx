"use client";

import React, { useState } from "react";

type AuthMode = "login" | "signup";

const sampleApps = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `App-${i + 1}`,
  // place images in public/assets/apps/app1.png ... app8.png
  img: `/assets/apps/app${(i % 8) + 1}.png`,
}));


const HeaderCom: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full bg-black text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="text-xl font-mono font-bold tracking-wider text-green-400">
              <span className="mr-2">🤖</span>Agent<span className="text-white">Project</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <button className="hover:text-yellow-400">Home</button>
            <button className="hover:text-yellow-400">Products</button>
            <button className="hover:text-yellow-400">Features</button>
            <button className="hover:text-yellow-400">About</button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center border border-white rounded-lg px-2 bg-white text-black">
              <input
                type="text"
                placeholder="Search"
                className="outline-none px-2 py-1 bg-transparent text-sm"
              />
            </div>

            {/* Get Started */}
            <button
              onClick={() => {
                setAuthMode("login");
                setIsLoginOpen(true);
              }}
              className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:brightness-110"
            >
              Get Started
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden ml-2 p-2"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#9AE6B4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-800">
            <div className="flex flex-col gap-2 p-4">
              <button className="text-left hover:text-yellow-400">Home</button>
              <button className="text-left hover:text-yellow-400">Products</button>
              <button className="text-left hover:text-yellow-400">Features</button>
              <button className="text-left hover:text-yellow-400">About</button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide under fixed header */}
      <div className="pt-20"></div>

      {/* --- MAIN / HOME --- */}
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_#071017,_#000814)] text-slate-200 font-sans">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-mono font-bold leading-tight text-green-400">
                Build smarter chatbots.
              </h1>
              <p className="mt-3 text-sm md:text-base text-slate-300 max-w-xl">
                Production-ready AI assistant stack — integrations, analytics, and
                fine-tuning made simple.
              </p>

              {/* 200+ apps badge */}
              <div className="mt-6 inline-flex items-center gap-3 bg-[#021014] border border-green-800 px-4 py-2 rounded-lg shadow-md">
                <div className="text-2xl font-mono text-green-400">200+</div>
                <div className="text-sm text-slate-300">apps & repos</div>
                <div className="ml-4 px-2 py-1 text-xs bg-green-900/40 rounded font-mono text-green-200">verified</div>
              </div>
            </div>

            {/* CTA and small preview */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setIsLoginOpen(true);
                }}
                className="bg-transparent border border-green-500 text-green-300 px-4 py-2 rounded hover:bg-green-600/10 font-mono"
              >
                Create Account
              </button>
              <a className="px-4 py-2 rounded bg-green-500 text-black font-semibold hover:brightness-110" href="#">
                Explore Repo
              </a>
            </div>
          </div>

          {/* App grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Show 200+ as label card then sample app cards */}
            <div className="col-span-2 sm:col-span-1 md:col-span-1 flex items-center justify-center bg-[#071018] border border-green-800 rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-mono text-green-400 animate-pulse">200+</div>
                <div className="mt-2 text-xs text-slate-300">Apps & Repos</div>
              </div>
            </div>

            {sampleApps.map((app) => (
              <div
                key={app.id}
                className="bg-[#041019] border border-green-900 rounded-lg p-3 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
              >
                {/* If you don't have images, use emoji or placeholder */}
                <img
                  src={app.img}
                  alt={app.name}
                  className="w-20 h-20 object-contain"
                  onError={(e) => {
                    // fallback to emoji if image missing
                    (e.currentTarget as HTMLImageElement).src =
                      "data:image/svg+xml;utf8," +
                      encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' fill='#071018'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='18' fill='#9AE6B4'>APP</text></svg>`);
                  }}
                />
                <div className="text-sm text-slate-200 font-mono">{app.name}</div>
                <div className="text-xs text-slate-400">⭐ {Math.floor(3 + Math.random() * 2)}.{"0"}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#00050a] text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-green-400 font-mono text-lg mb-2">AI Chatbot Project</div>
          <div className="text-sm mb-4">Powering conversations • 200+ apps</div>
          <div className="flex items-center justify-center gap-4">
            <a className="text-slate-300 hover:text-green-300" href="#">Docs</a>
            <a className="text-slate-300 hover:text-green-300" href="#">GitHub</a>
            <a className="text-slate-300 hover:text-green-300" href="#">Support</a>
          </div>
          <div className="text-xs text-slate-600 mt-4">© {new Date().getFullYear()} Agent Project</div>
        </div>
      </footer>

      {/* --- LOGIN / SIGNUP MODAL --- */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-md bg-[#021014] border border-green-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-green-800 flex items-center justify-center font-mono text-green-200">AI</div>
                <div>
                  <div className="text-lg font-mono text-green-300">
                    {authMode === "login" ? "Login" : "Create account"}
                  </div>
                  <div className="text-xs text-slate-400">
                    {authMode === "login" ? "Welcome back — sign in" : "Start your AI journey"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsLoginOpen(false)}
                aria-label="Close"
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2 rounded font-mono ${authMode === "login" ? "bg-green-600/80 text-black" : "bg-transparent border border-green-800 text-green-200"}`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`flex-1 py-2 rounded font-mono ${authMode === "signup" ? "bg-green-600/80 text-black" : "bg-transparent border border-green-800 text-green-200"}`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form className="space-y-3">
              {authMode === "signup" && (
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-[#011217] border border-green-900 px-3 py-2 rounded outline-none text-slate-200"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#011217] border border-green-900 px-3 py-2 rounded outline-none text-slate-200"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#011217] border border-green-900 px-3 py-2 rounded outline-none text-slate-200"
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-black py-2 rounded font-semibold hover:brightness-110"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: integrate auth
                  alert(`${authMode === "login" ? "Logged in" : "Account created"} (demo)`);
                  setIsLoginOpen(false);
                }}
              >
                {authMode === "login" ? "Login" : "Create account"}
              </button>

              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="w-full bg-transparent border border-green-800 text-green-200 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderCom;
