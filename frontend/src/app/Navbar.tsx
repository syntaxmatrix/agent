"use client";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState<"login" | "signup" | null>(null);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: "#020617",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#e2e8f0",
          }}
        >
          Agentic AI
        </h2>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          
          {/* LOGIN */}
          <button
            onClick={() => setActive("login")}
            style={{
              padding: "6px 16px",
              borderRadius: "8px",
              border:
                active === "login"
                  ? "1px solid #6366f1"
                  : "1px solid #1e293b",
              background:
                active === "login"
                  ? "rgba(99,102,241,0.1)"
                  : "transparent",
              color: "#cbd5f5",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (active !== "login") {
                e.currentTarget.style.background = "#0f172a";
              }
            }}
            onMouseLeave={(e) => {
              if (active !== "login") {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            Login
          </button>

          {/* SIGNUP */}
          <button
            onClick={() => setActive("signup")}
            style={{
              padding: "6px 16px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              background:
                active === "signup" ? "#6366f1" : "#0f172a",
              color: "#e2e8f0",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (active !== "signup") {
                e.currentTarget.style.background = "#1e293b";
              }
            }}
            onMouseLeave={(e) => {
              if (active !== "signup") {
                e.currentTarget.style.background = "#0f172a";
              }
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}