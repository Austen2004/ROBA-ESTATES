import React from "react";
import { formatPrice } from "../data/properties";
import ContactForm from "./ContactForm";

const purposeLabel = { Sale: "For sale", Rent: "For rent", Lease: "For lease" };

export default function PropertyDetail({ property, onBack }) {
  return (
    <div className="detail-view">
      <button className="back-link" onClick={onBack}>
        &larr; Back to listings
      </button>
      <div className="detail-image-wrap">
        <img src={property.image} alt={property.title} className="detail-image" />
        <span className="stamp">{purposeLabel[property.purpose]}</span>
      </div>
      <p className="card-location">{property.location}</p>
      <h2 className="detail-title">{property.title}</h2>
      <p className="detail-price">{formatPrice(property.price, property.period)}</p>
      <div className="detail-meta">
        {property.beds > 0 && <span>{property.beds} bedrooms</span>}
        <span>{property.baths} bathrooms</span>
        <span>{property.area} sqft</span>
        <span>{property.type}</span>
      </div>
      <p className="detail-desc">{property.desc}</p>

      <div className="map-wrap">
        <h3>Location</h3>
        <iframe
          title={`Map showing ${property.location}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            property.location + ", India"
          )}&z=14&output=embed`}
          loading="lazy"
          allowFullScreen
        />
      </div>

      <ContactForm property={property} />
    </div>
  );
}
