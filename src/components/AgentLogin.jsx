import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

export default function AgentLogin({ onLoggedIn }) {
  const { login } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "agent" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? `${API_BASE}/api/auth/login` : `${API_BASE}/api/auth/register`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      login(data.token, data.user);
      onLoggedIn();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>{mode === "login" ? "Agent / owner login" : "Create an agent or owner account"}</h2>
      <p className="auth-subtitle">
        Only agents and owners can list properties. Buyers and renters can browse without an account.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <select value={form.role} onChange={(e) => update("role", e.target.value)}>
              <option value="agent">I'm an agent</option>
              <option value="owner">I'm a property owner</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <button
        className="auth-switch"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError("");
        }}
      >
        {mode === "login" ? "Need an account? Register" : "Already have an account? Log in"}
      </button>
    </div>
  );
}
