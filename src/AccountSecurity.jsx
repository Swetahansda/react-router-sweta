import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSecurity() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const [selectedMethod, setSelectedMethod] = useState("");

  if (!isLoggedIn || !user) {
    return (
      <div className="no-user">
        <h2>No user found</h2>
        <p>Please sign in to access account deletion.</p>
      </div>
    );
  }

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
    navigate(`/delete-account/${method}`);
  };

  return (
    <div className="delete-account-page">
      <div className="delete-account-card">
        <div className="delete-header">
          <div className="header-left">
            <div className="warning-icon">⚠️</div>
            <div>
              <h1>Delete Account</h1>
              <p className="delete-subtitle">Choose a verification method to continue.</p>
            </div>
          </div>
        </div>

        <div className="delete-warning-card">
          <div className="warning-content">
            <div className="warning-emoji">🗑️</div>
            <div>
              <strong>Deleting your account is permanent.</strong>
              <p>
                All personal information, orders, addresses, wishlist items, and account data will be removed and cannot be recovered.
              </p>
            </div>
          </div>
        </div>

        <div className="delete-section">
          <h2>Choose a verification method</h2>
          <div className="verification-options">
            <button
              className="verification-option"
              onClick={() => handleMethodClick("email")}
            >
              <div className="option-icon">📧</div>
              <div className="option-body">
                <div className="option-title">Email OTP</div>
                <div className="option-sub">Send a code to your registered email</div>
              </div>
            </button>

            <button
              className="verification-option"
              onClick={() => handleMethodClick("mobile")}
            >
              <div className="option-icon">📱</div>
              <div className="option-body">
                <div className="option-title">Mobile OTP</div>
                <div className="option-sub">Send a code to your phone</div>
              </div>
            </button>

            <button
              className="verification-option"
              onClick={() => handleMethodClick("password")}
            >
              <div className="option-icon">🔒</div>
              <div className="option-body">
                <div className="option-title">Current Password</div>
                <div className="option-sub">Enter your account password</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSecurity;
