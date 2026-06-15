import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  title: "",
  type: "House",
  purpose: "Sale",
  location: "",
  price: "",
  period: "",
  beds: "",
  baths: "",
  area: "",
  desc: ""
};

export default function PropertyUploadForm() {
  const { token } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState(null); // null | "saving" | "success" | "error"
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files).slice(0, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      // period only makes sense for rent/lease
      if (form.purpose === "Sale") data.set("period", "");
      else if (!form.period) data.set("period", "/mo");

      files.forEach((file) => data.append("images", file));

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to create listing");

      setStatus("success");
      setForm(initialForm);
      setFiles([]);
      e.target.reset();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="upload-card">
      <h2>List a property</h2>
      <p className="auth-subtitle">
        New listings are submitted for review and will appear once approved.
      </p>

      <form onSubmit={handleSubmit} className="upload-form" encType="multipart/form-data">
        <label>
          Title
          <input
            type="text"
            placeholder="e.g. Spacious 3BR Apartment"
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </label>

        <div className="upload-row">
          <label>
            Property type
            <select value={form.type} onChange={(e) => update("type", e.target.value)}>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Building">Building</option>
            </select>
          </label>
          <label>
            Listing for
            <select value={form.purpose} onChange={(e) => update("purpose", e.target.value)}>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
              <option value="Lease">Lease</option>
            </select>
          </label>
        </div>

        <label>
          Location
          <input
            type="text"
            placeholder="e.g. Civil Lines, Nagpur"
            required
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </label>

        <div className="upload-row">
          <label>
            Price (\u20B9)
            <input
              type="number"
              min="0"
              required
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
            />
          </label>
          {form.purpose !== "Sale" && (
            <label>
              Period
              <select value={form.period} onChange={(e) => update("period", e.target.value)}>
                <option value="/mo">Per month</option>
                <option value="/yr">Per year</option>
              </select>
            </label>
          )}
        </div>

        <div className="upload-row upload-row-3">
          <label>
            Bedrooms
            <input
              type="number"
              min="0"
              value={form.beds}
              onChange={(e) => update("beds", e.target.value)}
            />
          </label>
          <label>
            Bathrooms
            <input
              type="number"
              min="0"
              required
              value={form.baths}
              onChange={(e) => update("baths", e.target.value)}
            />
          </label>
          <label>
            Area (sqft)
            <input
              type="number"
              min="0"
              required
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            rows="4"
            required
            placeholder="Describe the property, nearby landmarks, amenities..."
            value={form.desc}
            onChange={(e) => update("desc", e.target.value)}
          />
        </label>

        <label>
          Photos of the building
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        {files.length > 0 && (
          <p className="file-hint">{files.length} photo{files.length > 1 ? "s" : ""} selected</p>
        )}

        {status === "error" && <p className="auth-error">{error}</p>}
        {status === "success" && (
          <p className="upload-success">Listing submitted for review. Thank you!</p>
        )}

        <button type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Submitting..." : "Submit listing"}
        </button>
      </form>
    </div>
  );
}
