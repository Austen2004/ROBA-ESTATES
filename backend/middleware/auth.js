import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

// Verifies the JWT and attaches the user payload to req.user.
// Used to ensure only authenticated agents/owners can create or edit listings.
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, role, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Restricts a route to agents, owners, or admins (not plain buyers/renters,
// since this app has no buyer accounts -- but kept for future-proofing).
export function requireAgentOrOwner(req, res, next) {
  if (!req.user || !["agent", "owner", "admin"].includes(req.user.role)) {
    return res.status(403).json({ error: "Only agents or owners can perform this action" });
  }
  next();
}

export { JWT_SECRET };
