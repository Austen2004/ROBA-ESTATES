import React from "react";
import { formatPrice } from "../data/properties";

export default function FilterBar({ filters, setFilters }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title or location"
        value={filters.query}
        onChange={(e) => update("query", e.target.value)}
        className="filter-search"
      />
      <select value={filters.type} onChange={(e) => update("type", e.target.value)}>
        <option value="">All types</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Building">Building</option>
      </select>
      <select value={filters.purpose} onChange={(e) => update("purpose", e.target.value)}>
        <option value="">Sale, rent or lease</option>
        <option value="Sale">For sale</option>
        <option value="Rent">For rent</option>
        <option value="Lease">For lease</option>
      </select>
      <div className="filter-price">
        <label htmlFor="price-range">Max price</label>
        <input
          id="price-range"
          type="range"
          min="0"
          max="24000000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", Number(e.target.value))}
        />
        <span className="filter-price-out">
          {filters.maxPrice >= 24000000 ? "Any" : formatPrice(filters.maxPrice, "")}
        </span>
      </div>
    </div>
  );
}
