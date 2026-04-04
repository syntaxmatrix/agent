"use client";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
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
        {/* LEFT SIDE (LOGO) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#22c55e,#2563eb)",
            }}
          />
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#22c55e",
              letterSpacing: "1px",
            }}
          >
            AGENTIC AI
          </h2>
        </div>

        {/* RIGHT SIDE (BUTTONS) */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            style={{
              padding: "8px 18px",
              borderRadius: "25px",
              border: "1px solid #334155",
              background: "transparent",
              color: "#cbd5f5",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#1e293b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Login
          </button>

          <button
            style={{
              padding: "8px 18px",
              borderRadius: "25px",
              border: "none",
              background: "linear-gradient(135deg,#22c55e,#2563eb)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}