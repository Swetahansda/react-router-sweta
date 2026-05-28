import { useNavigate } from "react-router-dom";
import { getProductImage } from "./categoryImageMap";
import "./App.css";

function ProductCard(product) {
  const navigate = useNavigate();

  const { id, title, price, originalPrice, discount, rating, reviews } = product;

  const cardImage = getProductImage(product);// help which image to show based on product

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please create your account first to add to cart.");
      navigate("/signup");
      return;
    }

    const cartItem = {
      ...product,
      quantity: 1,
      cartId: Date.now() // Unique ID for cart item
    };
    // ensure cart stores the display image (category/subcategory/local asset)
    try {
      cartItem.image = getProductImage(product);
    } catch (err) {
      // fallback: leave original image
    }
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${title} added to cart!`);
    navigate("/cart");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate(`/product/${id}`, { state: product });
  };

  return (
    <div 
      className="product-card"
      onClick={() => navigate(`/product/${id}`, { state: product })}
    >
      <div className="product-image-wrapper">
        <img
          src={cardImage}
          alt={title}
          className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getProductImage(product);
            }}
        />
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        <div className="product-rating">
          <span className="stars">⭐ {rating}</span>
          <span className="review-count">({reviews} reviews)</span>
        </div>

        <div className="product-price">
          <span className="current-price">Rs. {price}</span>
          <span className="original-price">Rs. {originalPrice}</span>
        </div>

        <div className="product-actions">
          <button 
            onClick={handleAddToCart} 
            className="btn-add-cart"
          >
            🛒 Add to Cart
          </button>
          <button 
            onClick={handleBuyNow} 
            className="btn-buy-now"
          >
            🔥 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;