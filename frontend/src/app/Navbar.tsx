"use client";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "14px 0",
        backdropFilter: "blur(12px)",
        background: "rgba(8,15,30,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px", // ✅ FIX
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: "linear-gradient(135deg,#22c55e,#2563eb)",
              boxShadow: "0 0 20px rgba(34,197,94,0.6)"
            }}
          />
          <h2
            style={{
              fontWeight: "800",
              background: "linear-gradient(90deg,#22c55e,#60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            AGENTIC AI
          </h2>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            style={{
              background: "transparent",
              color: "#cbd5e1",
              padding: "8px 18px",
              borderRadius: "20px",
              border: "1px solid #334155"
            }}
          >
            Login
          </button>

          <button
            style={{
              background: "linear-gradient(135deg,#22c55e,#2563eb)",
              color: "white",
              padding: "8px 18px",
              borderRadius: "20px",
              border: "none",
              boxShadow: "0 0 18px rgba(37,99,235,0.6)"
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}