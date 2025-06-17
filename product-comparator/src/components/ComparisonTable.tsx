import React from "react";

interface Product {
  id: number;
  name: string;
  features: {
    [key: string]: string;
  };
}

interface ComparisonTableProps {
  products: Product[];
  close: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ products, close }) => {
  const keys = Object.keys(products[0].features);

  const getIsDifferent = (key: string): boolean[] => {
    const values = products.map(p => p.features[key]);
    return values.map((val, i) =>
      values.some((v, j) => i !== j && v !== val)
    );
  };

  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {products.map(p => (
              <th key={p.id}>{p.name.toUpperCase()}</th>

            ))}
          </tr>
        </thead>
        <tbody>
          {keys.map(key => {
            const diffs = getIsDifferent(key);
            return (
              <tr key={key}>
                <td>{key}</td>
                {products.map((p, idx) => (
                  <td
                    key={p.id + key}
                    className={diffs[idx] ? "cell-highlight" : ""}
                  >
                    {p.features[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="close-button-container">
        <button onClick={close} className="close-button">Close</button>
      </div>
    </div>
  );
};
