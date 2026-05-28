import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import placeholderImg from "./assets/Saree.jpg";

function Addtocart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + ((item.originalPrice - item.price) * item.quantity),
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please create your account first to checkout.");
      navigate("/signup");
      return;
    }

    navigate("/checkout", { state: { items: cartItems } });
  };

  const subtotal = calculateTotal();
  const discount = calculateDiscount();
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 My Shopping Cart</h1>
        {cartItems.length > 0 && (
          <span className="item-count">{cartItems.length} items</span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button
            onClick={() => navigate("/")}
            className="btn-continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-subtotal">Subtotal</span>
              <span className="col-action">Action</span>
            </div>

            {cartItems.map((item, index) => (
              <div key={item.cartId || index} className="cart-item">
                <div className="col-product">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImg;
                    }}
                  />
                  <div className="product-details">
                    <h4>{item.title}</h4>
                    <p className="category-small">{item.category}</p>
                  </div>
                </div>

                <div className="col-price">
                  <span className="price-value">Rs. {item.price}</span>
                </div>

                <div className="col-qty">
                  <button
                    className="qty-btn-sm"
                    onClick={() =>
                      handleQuantityChange(item.cartId, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.cartId, parseInt(e.target.value) || 1)
                    }
                    className="qty-input-sm"
                    min="1"
                  />
                  <button
                    className="qty-btn-sm"
                    onClick={() =>
                      handleQuantityChange(item.cartId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="col-subtotal">
                  <strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong>
                </div>

                <div className="col-action">
                  <button
                    onClick={() => handleRemoveItem(item.cartId)}
                    className="btn-remove"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row discount">
              <span>Discount:</span>
              <span>-Rs. {discount.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="shipping-note">Free shipping on orders above Rs. 500</p>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <div className="cart-actions">
              <button
                onClick={handleClearCart}
                className="btn-clear-cart"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/")}
                className="btn-continue-shopping"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                className="btn-checkout-primary"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addtocart;