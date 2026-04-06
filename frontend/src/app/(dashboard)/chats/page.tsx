"use client"

import React from "react";
import { useSearchParams } from "next/navigation";
import ChatWindow from "@/components/ChatWindow";
import RequireAuth from "@/components/RequireAuth";

export default function ChatsPage() {
  const search = useSearchParams();
  const q = search?.get("q") ?? "";

  return (
    <RequireAuth>
      <div className="h-[calc(100vh-180px)] flex flex-col bg-white rounded-[2.5rem] border border-slate-100 human-shadow overflow-hidden">
        <ChatWindow initialQuery={q || undefined} />
      </div>
    </RequireAuth>
  );
}
