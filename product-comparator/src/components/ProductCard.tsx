import React from "react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  features: {
    battery: string;
    screen: string;
    weight: string;
  };
}

interface Props {
  product: Product;
  selected: boolean;
  toggleCompare: (id: number) => void;
}

export const ProductCard: React.FC<Props> = ({ product, selected, toggleCompare }) => {
  return (
    <div className={`card ${selected ? "selected" : ""}`}>
      <img src={product.image} alt={product.name} width={150} height={150} />
      <h3>{product.name}</h3>
      <p>{product.brand}</p>
      <p>{product.price}</p>
      <ul>
        <li>Battery: {product.features.battery}</li>
        <li>Screen: {product.features.screen}</li>
        <li>Weight: {product.features.weight}</li>
      </ul>
      <button onClick={() => toggleCompare(product.id)}>
        {selected ? "Remove from Compare" : "Add to Compare"}
      </button>
    </div>
  );
};
