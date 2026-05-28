import React from "react";
import "./App.css";
import placeholderImg from "./assets/Saree.jpg";

function MyOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

 const userOrders = orders.filter(
  (order) => order.userEmail === user?.email
);

  return (
    
    <div className="my-orders-page">
        <button className="back-btn" onClick={() => window.history.back()}>
      ← Back
    </button>
      <h1>🛍 My Orders</h1>

      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        userOrders.reverse().map((order) => (
          <div key={order.orderId} className="my-order-card">

            <div className="order-top">
              <h3>Order ID: {order.orderId}</h3>
              <span>{order.status}</span>
            </div>

            <p><strong>Date:</strong> {order.date}</p>

            <div className="ordered-products">
              {order.items.map((item, idx) => (
                <div key={idx} className="ordered-item">

                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = placeholderImg;
                    }}
                  />

                  <div>
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Price: Rs. {item.price}</p>
                  </div>

                </div>
              ))}
            </div>

            <div className="order-info">
              <p>
                <strong>Shipping Address:</strong>{" "}
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} -{" "}
                {order.shippingAddress.pincode}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Total:</strong> Rs.{" "}
                {order.totals.total.toLocaleString()}
              </p>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;