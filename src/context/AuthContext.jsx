import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("roba_token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("roba_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (newToken, newUser) => {
    localStorage.setItem("roba_token", newToken);
    localStorage.setItem("roba_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("roba_token");
    localStorage.removeItem("roba_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
