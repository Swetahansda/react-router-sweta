import React, { useState } from "react";
import "./App.css";
import placeholderImg from "./assets/Saree.jpg";

function MyOrders() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const user = JSON.parse(localStorage.getItem("user"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const userOrders = orders.filter(
    (order) => order.userEmail === user?.email
  );

  const filteredOrders = userOrders.filter((order) => {
    if (selectedFilter === "all") return true;
    return order.status?.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="my-orders-page">
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>
      <h1>🛍 My Orders</h1>

      <div className="order-filters">
        <button
          className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => setSelectedFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${selectedFilter === "to pay" ? "active" : ""}`}
          onClick={() => setSelectedFilter("to pay")}
        >
          To Pay
        </button>
        <button
          className={`filter-btn ${selectedFilter === "to ship" ? "active" : ""}`}
          onClick={() => setSelectedFilter("to ship")}
        >
          To Ship
        </button>
        <button
          className={`filter-btn ${selectedFilter === "to receive" ? "active" : ""}`}
          onClick={() => setSelectedFilter("to receive")}
        >
          To Receive
        </button>
        <button
          className={`filter-btn ${selectedFilter === "to review" ? "active" : ""}`}
          onClick={() => setSelectedFilter("to review")}
        >
          To Review
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found for this status.</p>
      ) : (
        filteredOrders.reverse().map((order) => (
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