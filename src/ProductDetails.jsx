import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { products } from "./data/products";
import placeholderImg from "./assets/Saree.jpg";
import Banarasi from "./assets/Banarasi.jpg";
import Banarasi1 from "./assets/Banarasi1.jpeg";
import Earrings from "./assets/Earring.webp";
import Hero from "./assets/hero.png";
import Jhumka from "./assets/Jhumka.jpg";
import Necklace1 from "./assets/Necklace1.webp";
import Netsaree from "./assets/Netsaree.jpg";
import South from "./assets/south.jpg";
import { getProductImage } from "./categoryImageMap";

const productFallbackImages = {
  "1": Netsaree,
  "2": Banarasi,
  "3": South,
  "4": Banarasi1,
  "5": placeholderImg,
  "6": Earrings,
  "7": Necklace1,
  "8": Jhumka,
  "9": Hero,
  "10": Earrings,
  "11": Hero,
  "12": placeholderImg,
  "13": Banarasi,
  "14": Banarasi1,
  "15": placeholderImg,
  "16": Jhumka,
  "17": Necklace1,
  "18": Banarasi
};

function ProductDetails() {
  const { id } = useParams();  //So it means when I click any product to see the details, it suits the URL. The main use of use parameter is that. only
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state || products.find((p) => String(p.id) === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="error-container">
        <h2>😔 Product not found</h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const requireLogin = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please create your account first to add to cart or buy.");
      navigate("/signup");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireLogin()) return;

    const cartItem = {
      ...product,
      quantity: quantity,
      cartId: Date.now()
    };
    // store the selected display image so cart shows same image as product card
    try {
      cartItem.image = getProductImage(product);
    } catch (err) {}
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${quantity} item(s) of ${product.title} added to cart!`);
    setQuantity(1);
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!requireLogin()) return;

    const cartItem = {
      ...product,
      quantity: quantity,
      cartId: Date.now()
    };
    try {
      cartItem.image = getProductImage(product);
    } catch (err) {}
    navigate("/checkout", { state: cartItem });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details-topbar">
        <button className="back-btn product-back-btn" onClick={() => navigate("/")}>
          ← Back to products
        </button>
        <div className="product-topbar-note">
          <span className="product-stock-dot" />
          <span>In stock and ready to ship</span>
        </div>
      </div>

      <div className="product-details-content">
        <div className="product-gallery-card">
          <div className="product-details-image">
            <img
              src={getProductImage(product)}
              alt={product.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = productFallbackImages[product.id] || placeholderImg;
              }}
            />
            {product.discount > 0 && (
              <span className="discount-badge-large">{product.discount}% OFF</span>
            )}
          </div>

          <div className="product-gallery-highlights">
            <div className="gallery-highlight">
              <strong>Free delivery</strong>
              <span>On orders above Rs. 500</span>
            </div>
            <div className="gallery-highlight">
              <strong>Easy returns</strong>
              <span>Return within 7 days</span>
            </div>
            <div className="gallery-highlight">
              <strong>Secure checkout</strong>
              <span>Safe payment methods</span>
            </div>
          </div>
        </div>

        <div className="product-details-info">
          <div className="product-hero-copy">
            <span className="product-hero-category">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="product-hero-subtitle">
              Premium quality, carefully selected for everyday comfort and better value.
            </p>
          </div>

          <div className="product-header">
            <div className="rating-section">
              <div className="stars-large">
                <span>⭐ {product.rating} / 5</span>
              </div>
              <span className="review-count">({product.reviews} customer reviews)</span>
            </div>
          </div>

          <div className="price-section product-price-card">
            <div className="price-display">
              <div>
                <span className="price-label">Special price</span>
                <span className="current-price-large">Rs. {product.price.toLocaleString()}</span>
              </div>
              <div className="price-meta">
                <span className="original-price-large">Rs. {product.originalPrice.toLocaleString()}</span>
                <span className="discount-percent">Save {product.discount}%</span>
              </div>
            </div>
          </div>

          <div className="product-quick-metrics">
            <div className="metric-chip">
              <strong>4.2</strong>
              <span>Avg. rating</span>
            </div>
            <div className="metric-chip">
              <strong>{product.stock}</strong>
              <span>Stock left</span>
            </div>
            <div className="metric-chip">
              <strong>7 days</strong>
              <span>Easy returns</span>
            </div>
          </div>

          {/* Description */}
          <div className="product-info-card description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Features */}
          <div className="product-info-card features-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {product.features && product.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          {/* Seller & Warranty Info */}
          <div className="product-info-card seller-info">
            <div className="info-item">
              <span className="label">Seller:</span>
              <span className="value">{product.seller}</span>
            </div>
            <div className="info-item">
              <span className="label">Warranty:</span>
              <span className="value">{product.warranty}</span>
            </div>
            <div className="info-item">
              <span className="label">Stock:</span>
              <span className="value">{product.stock} items available</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector product-purchase-card">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="qty-btn"
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity} 
                readOnly 
                className="qty-input"
              />
              <button 
                onClick={() => handleQuantityChange(1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
            <span className="qty-info">Maximum {product.stock} items</span>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons product-action-row">
            <button 
              onClick={handleAddToCart} 
              className="btn-add-to-cart-large"
            >
              🛒 ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow} 
              className="btn-buy-now-large"
            >
              ⚡ BUY NOW
            </button>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <div className="info-box">
              <span>🚚</span>
              <div>
                <h4>Free Delivery</h4>
                <p>On orders above Rs. 500</p>
              </div>
            </div>
            <div className="info-box">
              <span>↩️</span>
              <div>
                <h4>Easy Returns</h4>
                <p>Return within 7 days</p>
              </div>
            </div>
            <div className="info-box">
              <span>🛡️</span>
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;