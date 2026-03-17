"use client";
import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div style={{
      display: "flex",
      gap: "10px",
      padding: "15px",
      borderTop: "1px solid #1e293b",
      background: "#0f172a"
    }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask your AI agent..."
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #334155",
          background: "#020617",
          color: "white"
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          background: "#22c55e",
          color: "white",
          padding: "10px 18px",
          borderRadius: "6px",
          border: "none"
        }}>
        Send
      </button>
    </div>
  );
}
