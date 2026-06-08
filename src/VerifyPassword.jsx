import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountInfo.css";

function VerifyPassword() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isLoggedIn || !user) {
    return (
      <div className="account-info-page">
        <div className="account-wrapper">
          <main className="account-main-right">
            <div className="account-header">
              <h2>Please sign in first</h2>
              <p>You need to be signed in to change your password.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (currentPassword === user.password) {
      sessionStorage.setItem("passwordVerificationPassed", "true");
      navigate("/new-password");
    } else {
      setError("Current password is incorrect. Please try again.");
    }
  };

  return (
    <div className="account-info-page">
      <div className="account-wrapper">
        <main className="account-main-right">
          <div className="account-header">
            <div className="account-header-content">
              <h1>Verify Current Password</h1>
              <p>Enter your current password to continue to the password update flow.</p>
            </div>
          </div>

          <form className="account-section" onSubmit={handleSubmit}>
            <div className="section-header">
              <h3>🔐 Current Password</h3>
            </div>
            <div className="edit-field">
              <div className="input-with-toggle">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword((visible) => !visible)}
                >
                  {showCurrentPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="button-group">
                <button className="btn-save" type="submit">
                  Continue
                </button>
                <button className="btn-cancel" type="button" onClick={() => navigate("/account-info")}>Cancel</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default VerifyPassword;
