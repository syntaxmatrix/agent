"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "2px 0",
        backdropFilter: "blur(12px)",
        background: "rgba(34, 35, 35, 0.9)",
        borderBottom: "1px solid rgba(51, 98, 108, 0.25)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              background:
                "linear-gradient(135deg,#22AC80,#24AC96,#2474BE,#247AC9)",
            }}
          />
          <h2
            style={{
              fontWeight: "750",
              fontSize: "1.3rem",
              background:
                "linear-gradient(90deg,#22AC80,#24AC96,#2474BE,#247AC9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Agentic AI
          </h2>
        </div>

        {/* RIGHT (FIXED) */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            href="/login"
            style={{
              background: "transparent",
              color: "#cbd5e1",
              padding: "5px 12px",
              borderRadius: "16px",
              border: "1px solid rgba(34,172,128,0.5)",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Login
          </Link>

          <Link
            href="/signup"
            style={{
              background:
                "linear-gradient(135deg,#22AC80,#24AC96,#2474BE,#247AC9)",
              color: "white",
              padding: "5px 12px",
              borderRadius: "16px",
              fontSize: "0.8rem",
              textDecoration: "none",
              boxShadow: "0 0 12px rgba(36,122,201,0.6)",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
