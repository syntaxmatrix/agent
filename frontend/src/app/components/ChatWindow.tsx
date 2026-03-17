"use client";
import { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

type Message = {
  text: string;
  sender: "user" | "agent";
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I am your AI Agent. How can I help you?", sender: "agent" }
  ]);

  const handleSend = (text: string) => {
    const userMsg: Message = { text, sender: "user" };
    const agentMsg: Message = {
      text: "🤖 Thinking... (backend connection coming soon)",
      sender: "agent"
    };

    setMessages((prev) => [...prev, userMsg, agentMsg]);
  };

  return (
    <div style={{
      marginTop: "40px",
      background: "#020617",
      border: "1px solid #1e293b",
      borderRadius: "10px",
      maxWidth: "900px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      height: "500px"
    }}>
      <div style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto"
      }}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

