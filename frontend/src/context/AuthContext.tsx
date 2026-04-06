"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  user: any | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  const check = async () => {
    setLoading(true);
    try {
      // use the new /me endpoint to validate session and fetch basic user info
      const res = await axios.get("/api/user/me");
      const ok = res.status === 200 && res.data?.data?.user;
      if (!ok) throw new Error("Not authenticated");
      setUser(res.data.data.user ?? null);
      setIsAuthenticated(true);
    } catch (err: any) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, refresh: check, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
