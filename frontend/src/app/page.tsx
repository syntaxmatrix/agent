"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setHistory((prev) => [query, ...prev]); // ✅ store history
    alert("Your question: " + query);
    setQuery("");
  };

  return (
    <div style={{ display: "flex" }}>
      
      {/* ✅ SIDEBAR */}
      <Sidebar history={history} />

      {/* ✅ MAIN CONTENT */}
      <main
        style={{
          marginLeft: "260px", // sidebar space
          width: "100%",
        }}
      >
        {/* HERO */}
        <section
          style={{
            padding: "100px 0",
            paddingTop: "120px", // adjust for navbar
            textAlign: "center",
            background:
              "radial-gradient(circle at top, #000000, #184d48)",
          }}
        >
          <div className="container">
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "700",
                background: "linear-gradient(90deg,#22c55e,#2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Autonomous AI Agent
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "20px",
                fontSize: "1.2rem",
              }}
            >
              Ask. Think. Execute. Experience next-gen intelligence.
            </p>

            {/* SEARCH */}
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: "40px",
                  padding: "6px",
                  width: "65%",
                  boxShadow: "0 0 30px rgba(37,99,235,0.2)",
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
                    color: "white",
                    fontSize: "1rem",
                    paddingLeft: "15px",
                  }}
                />
                <button
                  onClick={handleSearch}
                  style={{
                    background:
                      "linear-gradient(135deg,#22c55e,#2563eb)",
                    border: "none",
                    borderRadius: "30px",
                    padding: "10px 22px",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Ask →
                </button>
              </div>
            </div>

            <p
              style={{
                marginTop: "25px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Try: "Build me a smart e-commerce workflow"
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section
          style={{
            padding: "80px 0",
            background: "#020617",
          }}
        >
          <div className="container">
            <h2 style={{ textAlign: "center", fontSize: "2.2rem" }}>
              Why Agentic AI?
            </h2>

            <div
              style={{
                marginTop: "50px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "25px",
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
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                  }}
                >
                  <h3>{item}</h3>
                  <p style={{ color: "#94a3b8", marginTop: "8px" }}>
                    Advanced AI designed to handle real-world workflows.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}