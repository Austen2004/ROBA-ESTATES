import React, { useState, useMemo } from "react";
import { properties } from "./data/properties";
import FilterBar from "./components/FilterBar";
import PropertyCard from "./components/PropertyCard";
import PropertyDetail from "./components/PropertyDetail";
import AgentDashboard from "./components/AgentDashboard";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function AppContent() {
  const [filters, setFilters] = useState({
    query: "",
    type: "",
    purpose: "",
    maxPrice: 24000000,
  });
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("listings"); // "listings" | "dashboard"

  const filtered = useMemo(() => {
    const q = filters.query.toLowerCase();
    return properties.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchesType = !filters.type || p.type === filters.type;
      const matchesPurpose = !filters.purpose || p.purpose === filters.purpose;
      const matchesPrice = p.price <= filters.maxPrice;
      return matchesQuery && matchesType && matchesPurpose && matchesPrice;
    });
  }, [filters]);

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">R</span>
          <div>
            <h1>Roba Estates</h1>
            <p>Buy, rent, or lease houses, apartments and commercial buildings</p>
          </div>
        </div>
        <nav className="site-nav">
          <button
            className="nav-link"
            onClick={() => {
              setView(view === "dashboard" ? "listings" : "dashboard");
              setSelected(null);
            }}
          >
            {view === "dashboard" ? "Browse listings" : "Agent / owner login"}
          </button>
        </nav>
      </header>

      <main className="site-main">
        {view === "dashboard" ? (
          <AgentDashboard onBack={() => setView("listings")} />
        ) : selected ? (
          <PropertyDetail property={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            <FilterBar filters={filters} setFilters={setFilters} />
            {filtered.length === 0 ? (
              <p className="empty-state">
                No properties match your search. Try adjusting your filters.
              </p>
            ) : (
              <div className="grid">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} onSelect={setSelected} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="site-footer">
        <p>Roba Estates &mdash; listings managed by verified agents and owners</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
