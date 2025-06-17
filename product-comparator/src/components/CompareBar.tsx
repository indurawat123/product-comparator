import React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface CompareBarProps {
  selectedProducts: Product[];
  clearCompare: () => void;
  removeItem: (id: number) => void;
  showTable: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({
  selectedProducts,
  clearCompare,
  removeItem,
  showTable,
}) => (
  <div className="compare-bar">
    <div>
    {selectedProducts.map(p => (
      <div key={p.id}>
        <img src={p.image} alt={p.name} style={{ width: "80px", height: "70px" }} />
        <p>{p.name}</p>
        <button onClick={() => removeItem(p.id)}>❌</button>
      </div>
    ))}
    <div className="actions">
        <button onClick={showTable}>Compare</button>
        <button onClick={clearCompare}>Clear</button>
      </div>
    </div>
    
  </div>
);
