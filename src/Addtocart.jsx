import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import placeholderImg from "./assets/Saree.jpg";

function Addtocart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    setSelectedItems([]);
  }, []);

  const handleRemoveItem = (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedCart);
    setSelectedItems((current) => current.filter((id) => id !== cartId));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleToggleItem = (cartId) => {
    setSelectedItems((current) =>
      current.includes(cartId)
        ? current.filter((id) => id !== cartId)
        : [...current, cartId]
    );
  };

  const handleToggleAll = () => {
    const allIds = cartItems.map((item) => item.cartId);
    setSelectedItems(selectedItems.length === cartItems.length ? [] : allIds);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    const updatedCart = cartItems.filter((item) => !selectedItems.includes(item.cartId));
    setCartItems(updatedCart);
    setSelectedItems([]);
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

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateDiscount = () =>
    cartItems.reduce(
      (total, item) => total + ((item.originalPrice - item.price) * item.quantity),
      0
    );

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
  const freeShippingThreshold = 500;
  const shippingProgress = Math.max(freeShippingThreshold - subtotal, 0);
  const totalSelected = selectedItems.length;
  const allSelected = cartItems.length > 0 && totalSelected === cartItems.length;

  return (

     
    <div className="cart-container">
    

      <div className="cart-header">
        <div>
          <h1>My Shopping Cart</h1>
          <p className="cart-subtitle">Review items, update quantity, and checkout fast.</p>
        </div>
        {cartItems.length > 0 && <span className="item-count">{cartItems.length} ITEM(S)</span>}
      </div>
      
         <div className="cart-summary">
  <h3>Order Summary</h3>

  <div className="summary-row">
    <span>Subtotal ({cartItems.length} items)</span>
    <span>Rs. {subtotal.toLocaleString()}</span>
  </div>

  <div className="summary-row">
    <span>Shipping Fee</span>
    <span>
      {shipping === 0 ? "FREE" : `Rs. ${shipping.toLocaleString()}`}
    </span>
  </div>

  <hr />

  <div className="summary-row total">
    <span>Total</span>
    <span>Rs. {total.toLocaleString()}</span>
  </div>

  <p className="summary-note">
    Free shipping on orders above Rs. {freeShippingThreshold.toLocaleString()}
  </p>

  <button
    onClick={handleCheckout}
    className="btn-checkout-primary"
  >
    PROCEED TO CHECKOUT ({cartItems.length})
  </button>
</div>



      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate("/")} className="btn-continue-shopping">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-topbar">
              <label className="cart-select-all">
                <input type="checkbox" checked={allSelected} onChange={handleToggleAll} />
                <span>SELECT ALL ({cartItems.length} ITEM(S))</span>
              </label>
              <button type="button" className="cart-delete-all" onClick={handleDeleteSelected}>
                DELETE
              </button>
            </div>

            <div className="cart-items-header">
              <span className="col-product">Product</span>
              <span className="col-price">Price</span>
              <span className="col-qty">Quantity</span>
              <span className="col-subtotal">Subtotal</span>
              <span className="col-action">Action</span>
            </div>

            {cartItems.map((item, index) => (
              <div key={item.cartId || index} className="cart-seller-card">
                <div className="cart-seller-bar">
                  <label className="cart-select">
                    <input
                      type="checkbox"
                      aria-label={`Select ${item.title}`}
                      checked={selectedItems.includes(item.cartId)}
                      onChange={() => handleToggleItem(item.cartId)}
                    />
                    <span />
                  </label>
                  <div className="cart-seller-name">
                    {item.seller || item.category || "Store"}
                  </div>
                </div>

                <div className="cart-item">
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
                    {item.originalPrice ? (
                      <span className="original-price">Rs. {item.originalPrice}</span>
                    ) : null}
                  </div>

                  <div className="col-qty">
                    <button
                      className="qty-btn-sm"
                      onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
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
                      onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
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
                      aria-label={`Remove ${item.title}`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Addtocart;