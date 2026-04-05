"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setHistory((prev) => [query, ...prev]);
    alert("Your question: " + query);
    setQuery("");
  };

  return (
    <div style={{ display: "flex", background: "#020617" }}>
      
      {/* SIDEBAR */}
      <Sidebar history={history} />

      {/* MAIN */}
      <main
        style={{
          marginLeft: "260px",
          width: "100%",
          color: "#e2e8f0",
        }}
      >
        {/* HERO */}
        <section
          style={{
            padding: "120px 20px 80px",
            textAlign: "center",
            background: "#020617",
          }}
        >
         <h1
  style={{
    fontSize: "3rem",
    fontWeight: "700",
    letterSpacing: "-1px",
    background: "linear-gradient(90deg, #34d399, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Your Autonomous AI Agent
</h1>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "16px",
              fontSize: "1.1rem",
            }}
          >
            Ask. Think. Execute. Experience next-gen intelligence.
          </p>

          {/* SEARCH */}
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "999px",
                padding: "6px",
                width: "60%",
                maxWidth: "700px",
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your AI agent anything..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e2e8f0",
                  fontSize: "1rem",
                  paddingLeft: "15px",
                }}
              />

              <button
                onClick={handleSearch}
                style={{
                  background: "#6366f1",
                  border: "none",
                  borderRadius: "999px",
                  padding: "10px 22px",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                }}
              >
                Ask →
              </button>
            </div>
          </div>

          <p
            style={{
              marginTop: "20px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Try: "Build me a smart e-commerce workflow"
          </p>
        </section>

        {/* FEATURES */}
        <section
          style={{
            padding: "80px 20px",
            background: "#020617",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "600",
            }}
          >
            Why Agentic AI?
          </h2>

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
              maxWidth: "1100px",
              marginInline: "auto",
            }}
          >
            {[
              "Autonomous Reasoning",
              "Task Execution",
              "Tool Integration",
              "Real-Time Intelligence",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#0f172a",
                  padding: "25px",
                  borderRadius: "16px",
                  border: "1px solid #1e293b",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border =
                    "1px solid #6366f1";
                  e.currentTarget.style.transform =
                    "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border =
                    "1px solid #1e293b";
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
              >
                <h3 style={{ fontSize: "1.2rem" }}>{item}</h3>
                <p
                  style={{
                    color: "#94a3b8",
                    marginTop: "8px",
                    fontSize: "0.95rem",
                  }}
                >
                  Advanced AI designed to handle real-world workflows.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}