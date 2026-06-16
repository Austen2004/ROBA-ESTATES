// Base URL for the backend API.
// In local dev, Vite's proxy forwards /api to http://localhost:4000 (see vite.config.js),
// so an empty string works fine locally.
// In production (e.g. Netlify), there's no proxy, so we point directly at the deployed backend.
export const API_BASE = import.meta.env.VITE_API_BASE || "https://roba-estates.onrender.com";
