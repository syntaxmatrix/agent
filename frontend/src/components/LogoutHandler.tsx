"use client"

import { useEffect } from "react";
import axios from "@/lib/axios";

export default function LogoutHandler() {
  useEffect(() => {
    (window as any).logoutHandler = async () => {
      try {
        await axios.post('/api/user/logout');
      } catch (err) {
        // ignore
      }
      window.location.href = '/login';
    };

    return () => {
      try {
        delete (window as any).logoutHandler;
      } catch (e) {}
    };
  }, []);

  return null;
}
