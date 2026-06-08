import { useEffect, useState } from "react";
import { getProductImage } from "./categoryImageMap";
import { useNavigate } from "react-router-dom";
import "./App.css";

const COMPARE_STORAGE_KEY = "compareProducts";

function Compare() {
  const [compareItems, setCompareItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(COMPARE_STORAGE_KEY)) || [];
    setCompareItems(stored);
  }, []);

  const removeItem = (id) => {
    const next = compareItems.filter((item) => item.id !== id);
    setCompareItems(next);
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="compare-page">
      <div className="compare-header">
        <div>
          <h1>Compare Products</h1>
          <p>Compare up to 3 products side-by-side and choose the best deal.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/")}>Back to Home</button>
      </div>

      {compareItems.length === 0 ? (
        <div className="no-products">
          <h2>😔 No products selected for comparison</h2>
          <p>Use the Compare button on product cards to add items here.</p>
        </div>
      ) : (
        <div className="compare-grid">
          {compareItems.map((product) => (
            <div className="compare-card" key={product.id}>
              <img src={getProductImage(product)} alt={product.title} className="compare-image" />
              <div className="compare-body">
                <h3>{product.title}</h3>
                <p className="compare-category">{product.category}</p>
                <p>{product.description}</p>
                <div className="product-price">
                  <span className="current-price">Rs. {product.price}</span>
                  <span className="original-price">Rs. {product.originalPrice}</span>
                </div>
                <div className="product-rating">
                  <span className="stars">⭐ {product.rating}</span>
                  <span className="review-count">({product.reviews} reviews)</span>
                </div>
                <button className="btn-add-cart" onClick={() => removeItem(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Compare;
