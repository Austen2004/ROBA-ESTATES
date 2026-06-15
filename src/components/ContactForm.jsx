import React, { useState } from "react";

export default function ContactForm({ property }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with POST to backend, e.g.
    // fetch(`/api/properties/${property.id}/inquiries`, { method: "POST", body: JSON.stringify(form) })
    console.log("Inquiry submitted", { propertyId: property.id, ...form });
    setSent(true);
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
      <button type="submit">Send inquiry</button>
    </form>
  );
}
