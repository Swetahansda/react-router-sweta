import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountInfo.css";

function NewPassword({ onUserUpdate }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("passwordVerificationPassed")) {
      navigate("/verify-password");
    }
  }, [navigate]);

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

  const handleSave = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    sessionStorage.removeItem("passwordVerificationPassed");
    onUserUpdate?.(updatedUser);
    setSuccessMessage("Password updated successfully!");
    setError("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      navigate("/account-info");
    }, 900);
  };

  return (
    <div className="account-info-page">
      <div className="account-wrapper">
        <main className="account-main-right">
          <div className="account-header">
            <div className="account-header-content">
              <h1>Set a New Password</h1>
              <p>Choose a strong password and confirm it to secure your account.</p>
            </div>
          </div>

          {successMessage && (
            <div className="success-banner">
              <span>✓ {successMessage}</span>
            </div>
          )}

          <form className="account-section" onSubmit={handleSave}>
            <div className="section-header">
              <h3>🔒 New Password</h3>
            </div>
            <div className="edit-field">
              <div className="input-with-toggle">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword((visible) => !visible)}
                >
                  {showNewPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="input-with-toggle">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="button-group">
                <button className="btn-save" type="submit">
                  Save Password
                </button>
                <button className="btn-cancel" type="button" onClick={() => {
                  sessionStorage.removeItem("passwordVerificationPassed");
                  navigate("/account-info");
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default NewPassword;
