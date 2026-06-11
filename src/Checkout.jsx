import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import placeholderImg from "./assets/Saree.jpg";


function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const cartData = useMemo(() => {
    const state = location.state;
    if (state && (state.items || state.title)) {
      return state;
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return { items: savedCart };
  }, [location.state]);

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

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const redirectTimeoutRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please create your account first to checkout.");
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!user) return;

    const storedAddresses = JSON.parse(localStorage.getItem(`addresses_${user.email}`)) || [];
    setSavedAddresses(storedAddresses);

    const [firstName = "", ...restName] = (user.name || "").split(" ");
    const lastName = restName.join(" ");

    if (storedAddresses.length > 0) {
      const latestAddress = storedAddresses[0];
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || prev.email,
        phone: latestAddress.phone || prev.phone,
        address: latestAddress.address || prev.address,
        city: latestAddress.city || prev.city,
        state: latestAddress.region || prev.state,
        pincode: latestAddress.pincode || prev.pincode,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  const items = cartData?.items?.length ? cartData.items : cartData?.title ? [cartData] : [];
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (items.length === 0) {
    return (
      <div className="error-container">
        <h2>😔 No items to checkout</h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

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

  const getShippingAddress = () => {
    if (savedAddresses.length === 0) return null;
    const latestAddress = savedAddresses[0];
    return {
      recipient: latestAddress.recipient,
      address: latestAddress.address,
      city: latestAddress.city,
      state: latestAddress.region,
      pincode: latestAddress.pincode || "",
      phone: latestAddress.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
  };

  const handlePlaceOrder = (e) => {
    if (e) e.preventDefault();

    const shippingAddress = getShippingAddress();
    if (!shippingAddress) {
      alert("Please save an address first before placing your order.");
      return;
    }

    if (
      !shippingAddress.recipient ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.phone
    ) {
      alert("Please save a valid shipping address before placing your order.");
      return;
    }

    const order = {
      orderId: "ORD" + Date.now(),
      date: new Date().toLocaleDateString(),
      items,
      userEmail: user?.email,
      shippingAddress,
      paymentMethod: formData.paymentMethod,
      totals: { subtotal, discount, shipping, total },
      status: "Order Placed",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || []; //string → object
    orders.push(order);  // add new order
    localStorage.setItem("orders", JSON.stringify(orders)); //save in browser
    localStorage.removeItem("cart"); //after order remove product form cart

    setOrderInfo({ orderId: order.orderId, date: order.date });
    setOrderPlaced(true);

    redirectTimeoutRef.current = setTimeout(() => {
      navigate("/myorders");
    }, 2000);
  };

  const handleContinueShopping = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }
    navigate("/");
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
            <strong>{orderInfo?.orderId || "ORD000"}</strong>
          </div>
          <div className="detail-row">
            <span>Order Date:</span>
            <strong>{orderInfo?.date || ""}</strong>
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

        <button
          onClick={handleContinueShopping}
          className="btn-primary"
        >
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
          <div className="summary-header checkout-summary-header">
            <div>
              <span className="summary-kicker">Before you pay</span>
              <h2>Order Summary</h2>
            </div>
            <span className="summary-badge">{itemCount} units</span>
          </div>
          {savedAddresses.length > 0 ? (
            <div className="saved-address-card">
              <h3>Saved Shipping Address</h3>
              <p>
                <strong>
                  {savedAddresses[0].recipient || `${formData.firstName} ${formData.lastName}`}
                </strong>
              </p>
              <p>{savedAddresses[0].address}</p>
              <p>
                {savedAddresses[0].city}, {savedAddresses[0].region}
                {savedAddresses[0].pincode ? ` - ${savedAddresses[0].pincode}` : ""}
              </p>
              <p>Phone: {savedAddresses[0].phone}</p>
            </div>
          ) : (
            <div className="saved-address-card no-address">
              <h3>No saved address found</h3>
              <p>Please save your address on the My Address page before placing your order.</p>
            </div>
          )}
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
                <div className="checkout-item-details">
                  <div className="checkout-item-top">
                    <div className="checkout-item-copy">
                      <h4>{item.title}</h4>
                      <p className="checkout-item-meta">
                        {item.category || item.seller || "Product"}
                      </p>
                    </div>
                    <span className="checkout-item-qty">Qty {item.quantity || 1}</span>
                  </div>

                  <div className="checkout-item-footer">
                    <span className="checkout-item-unit">
                      Rs. {item.price.toLocaleString()} each
                    </span>
                    <span className="item-price">
                      Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                </div>
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

          <p className="summary-footnote checkout-footnote">
            Free shipping applies on orders above Rs. 500. Final payment is confirmed after checkout.
          </p>
        </div>

        {/* Checkout Form */}
        <div className="checkout-form">
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
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="btn-place-order"
            >
              Place Order (Rs. {total.toLocaleString()})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;