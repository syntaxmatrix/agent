"use client";

export default function Sidebar({ history }: { history: string[] }) {
  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "#020617",
        borderRight: "1px solid #1e293b",
        padding: "20px",
        position: "fixed",
        top: "70px",
        left: 0,
      }}
    >
      <h3 style={{ color: "white", marginBottom: "15px" }}>
        Recent Searches
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {history.length === 0 ? (
          <p style={{ color: "#64748b" }}>No searches yet</p>
        ) : (
          history.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "#0f172a",
                color: "#cbd5f5",
              }}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}