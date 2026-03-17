type Props = {
  text: string;
  sender: "user" | "agent";
};

export default function MessageBubble({ text, sender }: Props) {
  const isUser = sender === "user";

  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "12px"
    }}>
      <div style={{
        background: isUser ? "#2563eb" : "#1e293b",
        padding: "10px 14px",
        borderRadius: "8px",
        maxWidth: "70%"
      }}>
        {text}
      </div>
    </div>
  );
}
