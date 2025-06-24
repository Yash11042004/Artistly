"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean; // ✅ Add loading to prevent false redirects
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Start with loading

  useEffect(() => {
    const storedLogin = localStorage.getItem("artistly-logged-in");
    setIsLoggedIn(storedLogin === "true");
    setLoading(false); // ✅ Done checking localStorage
  }, []);

  const login = () => {
    localStorage.setItem("artistly-logged-in", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("artistly-logged-in");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
