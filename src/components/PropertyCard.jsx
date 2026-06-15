import React from "react";
import { formatPrice } from "../data/properties";

const purposeLabel = { Sale: "For sale", Rent: "For rent", Lease: "For lease" };

export default function PropertyCard({ property, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(property)}>
      <div className="card-image-wrap">
        <img src={property.image} alt={property.title} className="card-image" />
        <span className="stamp">{purposeLabel[property.purpose]}</span>
      </div>
      <div className="card-body">
        <p className="card-location">{property.location}</p>
        <h3 className="card-title">{property.title}</h3>
        <p className="card-price">{formatPrice(property.price, property.period)}</p>
        <div className="card-meta">
          {property.beds > 0 && <span>{property.beds} bed</span>}
          <span>{property.baths} bath</span>
          <span>{property.area} sqft</span>
        </div>
      </div>
    </div>
  );
}
