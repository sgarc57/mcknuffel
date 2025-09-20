import React from "react";

export default function Card({ item }) {
  const { image, name, price, sale_price } = item;

  return (
    <div className="card text-center p-2">
      <img className="card-img-top img-fluid rounded shadow-sm mb-2" src={image} alt={name} />
      <h6 className="card-title">{name}</h6>
      <p className="card-text">
        <span className="text-muted text-decoration-line-through me-2">€{price}</span>
        <span>€{sale_price}</span>
      </p>
      <button className="btn btn-sm btn-outline-secondary">Quick buy</button>
    </div>
  );
}
