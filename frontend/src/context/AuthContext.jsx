/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ LOGIN
  const login = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", Date.now());
    setToken(token);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    setToken(null);
    window.location.href = "/login";
  };

  // ✅ CHECK TOKEN EXPIRY ON APP LOAD
  useEffect(() => {
    const checkExpiry = () => {
      const storedToken = localStorage.getItem("token");
      const loginTime = localStorage.getItem("loginTime");

      if (storedToken && loginTime) {
        const now = Date.now();
        const diff = now - parseInt(loginTime);

        const limit = 24 * 60 * 60 * 1000; // 24 hours

        if (diff > limit) {
          logout();
        } else {
          setToken(storedToken);
        }
      }
    };

    checkExpiry();
  }, []);

  // ✅ LIVE AUTO LOGOUT (every 1 min)
  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem("loginTime");

      if (loginTime) {
        const now = Date.now();
        const diff = now - parseInt(loginTime);

        if (diff > 24 * 60 * 60 * 1000) {
          logout();
        }
      }
    }, 60000); // check every 60 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};