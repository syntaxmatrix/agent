export default function Sidebar() {
  return (
    <div style={{
      width: "260px",
      background: "#020617",
      borderRight: "1px solid #1e293b",
      padding: "20px",
      height: "100vh"
    }}>
      <h3>Agent Console</h3>
      <p style={{ color: "#94a3b8", fontSize: "14px" }}>
        Manage your AI chats
      </p>

      <button style={{
        marginTop: "25px",
        width: "100%",
        background: "#2563eb",
        color: "white",
        padding: "10px",
        borderRadius: "6px",
        border: "none"
      }}>
        + New Chat
      </button>
    </div>
  );
}
