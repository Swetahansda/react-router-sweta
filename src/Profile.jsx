import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrdersCount = orders.filter(
    (order) => order.userEmail === user?.email
  ).length;

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/signin");
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="no-user">
        <h2>No user found</h2>
        <p>Please login to view your account</p>
      </div>
    );
  }

  return (
    <div className="profile-page">

      
      <div className="profile-sidebar">
        <h3>My Account</h3>
        <ul className="profile-menu">
          <li>Profile</li>
          <li onClick={() => navigate("/myorders")}>
  My Orders
</li>
    
          <li>Settings</li>
          <li
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main */}
      <div className="profile-card">

        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2>Welcome, {user.name} 👋</h2>

        <div className="profile-info">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Account Type:</b> Customer</p>
        </div>

        <div className="profile-stats">
          <div className="stat-box">
            <h4>{userOrdersCount}</h4>
            <p>Orders</p>
          </div>

          <div className="stat-box">
            <h4>0</h4>
            <p>Wishlist</p>
          </div>

          <div className="stat-box">
            <h4>0</h4>
            <p>Coupons</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;