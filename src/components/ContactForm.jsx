import React, { useState } from "react";
import { API_BASE } from "../config";

export default function ContactForm({ property }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property.id, ...form })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send inquiry");
      }
      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (sent) {
    return (
      <div className="contact-success">
        <p>Inquiry sent. {property.agent.name} will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Contact about this property</h3>
      <p className="agent-line">
        Listed by {property.agent.name} &middot; {property.agent.phone}
      </p>
      <input
        type="text"
        placeholder="Your name"
        required
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <input
        type="email"
        placeholder="Your email"
        required
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <textarea
        placeholder="Message"
        rows="4"
        required
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />
      {error && <p className="auth-error">{error}</p>}
      <button type="submit">Send inquiry</button>
    </form>
  );
}
