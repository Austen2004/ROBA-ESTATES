import express from "express";
import Inquiry from "../models/Inquiry.js";
import Property from "../models/Property.js";
import { requireAuth, requireAgentOrOwner } from "../middleware/auth.js";

const router = express.Router();

// POST /api/inquiries
// Public endpoint -- anyone browsing can send an inquiry about a property.
router.post("/", async (req, res) => {
  try {
    const { propertyId, name, email, message } = req.body;

    if (!propertyId || !name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ error: "Property not found" });

    const inquiry = await Inquiry.create({ property: propertyId, name, email, message });
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to send inquiry" });
  }
});

// GET /api/inquiries/property/:propertyId
// Restricted -- only the listing's agent/owner can view inquiries for it.
router.get("/property/:propertyId", requireAuth, requireAgentOrOwner, async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property) return res.status(404).json({ error: "Property not found" });

    if (String(property.agent) !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "You can only view inquiries for your own listings" });
    }

    const inquiries = await Inquiry.find({ property: req.params.propertyId }).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

export default router;
