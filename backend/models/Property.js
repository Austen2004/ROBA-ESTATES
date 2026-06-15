import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["House", "Apartment", "Building"], required: true },
    purpose: { type: String, enum: ["Sale", "Rent", "Lease"], required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, default: "" }, // e.g. "/mo" for rent/lease
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    area: { type: Number, required: true }, // in sqft
    images: [{ type: String }], // URLs to uploaded images
    desc: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
