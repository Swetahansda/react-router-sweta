import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import placeholderImg from "./assets/Saree.jpg";


function Checkout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();
  const cartData = location.state;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card"
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please create your account first to checkout.");
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  if (!cartData || (!cartData.items && !cartData.title)) {
    return (
      <div className="error-container">
        <h2>😔 No items to checkout</h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const items = cartData.items || [cartData];

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const discount = items.reduce(
      (sum, item) =>
        sum + ((item.originalPrice - item.price) * (item.quantity || 1)),
      0
    );
    const shipping = subtotal > 500 ? 0 : 100;
    return { subtotal, discount, shipping, total: subtotal + shipping };
  };

  const { subtotal, discount, shipping, total } = calculateTotals();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

   
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill in all required fields");
      return;
    }

  
    const order = {
  orderId: "ORD" + Date.now(),
  date: new Date().toLocaleDateString(),
  items,

  userEmail: user?.email,  

  shippingAddress: formData,
  paymentMethod: formData.paymentMethod,
  totals: { subtotal, discount, shipping, total },
  status: "Order Placed"
};

    const orders = JSON.parse(localStorage.getItem("orders")) || []; //string → object
    orders.push(order);  // add new order
    localStorage.setItem("orders", JSON.stringify(orders)); //save in browser
    localStorage.removeItem("cart"); //after order remove product form cart

    setOrderPlaced(true);

setTimeout(() => {
  navigate("/myorders");  //Wait 2 seconds, then go to My Orders page”
}, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase</p>

        <div className="order-details-success">
          <div className="detail-row">
            <span>Order ID:</span>
            <strong>ORD{Date.now()}</strong>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <strong>Rs. {total.toLocaleString()}</strong>
          </div>
          <div className="detail-row">
            <span>Shipping Address:</span>
            <strong>
              {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
            </strong>
          </div>
          <div className="detail-row">
            <span>Payment Method:</span>
            <strong>
              {formData.paymentMethod === "card"
                ? "Credit/Debit Card"
                : formData.paymentMethod === "upi"
                ? "UPI"
                : "Cash on Delivery"}
            </strong>
          </div>
        </div>

        <p className="tracking-info">
          📧 A confirmation email has been sent to <strong>{formData.email}</strong>
        </p>
        <p className="tracking-info">
          🚚 Your order will be delivered within 3-5 business days
        </p>

        <button onClick={() => navigate("/")} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>📋 Checkout</h1>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {items.map((item, idx) => (
              <div key={idx} className="checkout-item">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
                <div>
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity || 1}</p>
                </div>
                <span className="item-price">
                  Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="price-breakdown">
            <div className="breakdown-row">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="breakdown-row discount">
              <span>Discount:</span>
              <span>-Rs. {discount.toLocaleString()}</span>
            </div>
            <div className="breakdown-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
            </div>
            <div className="breakdown-row total">
              <span>Total:</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <h2>Shipping Address</h2>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="6-digit pincode"
                required
              />
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleInputChange}
              />
              💳 Credit/Debit Card
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={formData.paymentMethod === "upi"}
                onChange={handleInputChange}
              />
              📱 UPI
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleInputChange}
              />
              🚚 Cash on Delivery
            </label>
          </div>

          <div className="checkout-buttons">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="btn-back"
            >
              ← Back to Cart
            </button>
            <button type="submit" className="btn-place-order">
              Place Order (Rs. {total.toLocaleString()})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;