import express from "express";
import multer from "multer";
import path from "path";
import Property from "../models/Property.js";
import { requireAuth, requireAgentOrOwner } from "../middleware/auth.js";

const router = express.Router();

// Image upload setup -- stores property photos locally under /uploads.
// Swap for S3/Cloudinary storage in production.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// GET /api/properties
// Public endpoint -- anyone can browse approved listings, with optional filters.
router.get("/", async (req, res) => {
  try {
    const { type, purpose, maxPrice, query } = req.query;
    const filter = { status: "approved" };

    if (type) filter.type = type;
    if (purpose) filter.purpose = purpose;
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } }
      ];
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// GET /api/properties/:id
// Public endpoint -- single property detail.
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("agent", "name phone email");
    if (!property || property.status !== "approved") {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(404).json({ error: "Property not found" });
  }
});

// POST /api/properties
// Restricted -- only logged-in agents/owners can create listings.
// New listings start as "pending" until reviewed.
router.post("/", requireAuth, requireAgentOrOwner, upload.array("images", 10), async (req, res) => {
  try {
    const { title, type, purpose, location, price, period, beds, baths, area, desc } = req.body;

    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);

    const property = await Property.create({
      title,
      type,
      purpose,
      location,
      price,
      period,
      beds,
      baths,
      area,
      desc,
      images,
      agent: req.user.id,
      status: "pending"
    });

    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: "Failed to create property" });
  }
});

// PUT /api/properties/:id
// Restricted -- only the agent/owner who created the listing can edit it.
router.put("/:id", requireAuth, requireAgentOrOwner, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    if (String(property.agent) !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "You can only edit your own listings" });
    }

    Object.assign(property, req.body, { status: "pending" }); // re-review after edits
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Failed to update property" });
  }
});

// DELETE /api/properties/:id
// Restricted -- only the agent/owner who created the listing (or admin) can delete it.
router.delete("/:id", requireAuth, requireAgentOrOwner, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    if (String(property.agent) !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "You can only delete your own listings" });
    }

    await property.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete property" });
  }
});

// GET /api/properties/mine/all
// Restricted -- agent/owner views their own listings, including pending/rejected.
router.get("/mine/all", requireAuth, requireAgentOrOwner, async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.user.id }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your properties" });
  }
});

export default router;
