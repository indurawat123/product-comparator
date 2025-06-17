import { useEffect, useState } from "react";
import { CompareBar } from "./components/CompareBar";
import { ComparisonTable } from "./components/ComparisonTable";
import { ProductCard } from "./components/ProductCard";
import { products } from "./data/products";
import './styles.css';


function App() {
  const [compareList, setCompareList] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("compare") || "[]")
  );
  const [showCompare, setShowCompare] = useState(false);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const toggleCompare = (id: number) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev.slice(0, 2), id]
    );
  };

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareList));
  }, [compareList]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
useEffect(() => {
  if (compareList.length >= 2) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}, [compareList]);
  return (
    <div className={dark ? "dark" : ""}>
      <header>
        <div>
          <h2>Product Comparator</h2>
        </div>
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setDark(!dark)} className="toggle-button">Toggle Theme</button>
      </header>

      <div className="product-grid">
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            selected={compareList.includes(p.id)}
            toggleCompare={toggleCompare}
          />
        ))}
      </div>

      {compareList.length >= 2 && (
        <CompareBar
          selectedProducts={products.filter(p => compareList.includes(p.id))}
          clearCompare={() => {
  setCompareList([]);
  setShowCompare(false);
}}

          removeItem={id => setCompareList(prev => prev.filter(i => i !== id))}
          showTable={() => setShowCompare(true)}
        />
      )}

      {showCompare && (
        <ComparisonTable
          products={products.filter(p => compareList.includes(p.id))}
          close={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
export default App;