<<<<<<< HEAD
"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    alert("Your question: " + query);
  };
=======
// app/page.tsx
import React from "react";
import Navbar from "./components/Header";
import Hero from "./components/Hero";
import Features from "@/app/components/Features";
import FeatureCards from "@/app/components/FeatureCards";
import { landingData } from "@/app/data/landingData";
import { categoryData } from "@/app/data/categoryData";
>>>>>>> a0fb7a80230e5d1f3da56a8c78da0abac2f5db7b

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          padding: "120px 0",
          textAlign: "center",
          background:
            "radial-gradient(circle at top, #035151 0%, #011e20 45%, #a0e1e8 100%)",
        }}
      >
        <div className="container">

          {/* Heading Gradient */}
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              background: `linear-gradient(90deg,
                #22AC80 0%,
                #24AC96 35%,
                #2474BE 70%,
                #247AC9 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
             Agentic AI
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

          {/* Search Bar */}
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
                background: "rgb(227, 239, 241)",
                border: "1px solid rgb(19, 47, 76)",
                borderRadius: "40px",
                padding: "6px",
                width: "65%",
                boxShadow:
                  "0 0 25px rgba(34,172,128,0.35), 0 0 40px rgba(36,122,201,0.35)",
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
                  background: `linear-gradient(135deg,
                    #22AC80 0%,
                    #24AC96 40%,
                    #2474BE 70%,
                    #247AC9 100%)`,
                  border: "none",
                  borderRadius: "30px",
                  padding: "10px 22px",
                  color: "white",
                  fontWeight: "600",
                  cursor: "pointer",
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
      <section style={{
          padding: "120px 0",
          textAlign: "center",
          background:
            "radial-gradient(circle at top, #035151 0%, #011e20 45%, #a0e1e8 100%)",
        }}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", color: "white" }}>
            Why Agentic AI?
          </h2>

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
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
                  color: "white",
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
  );
}
