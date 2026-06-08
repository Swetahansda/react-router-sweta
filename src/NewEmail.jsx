import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountInfo.css";

function NewEmail({ onUserUpdate }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("emailVerificationPassed")) {
      navigate("/verify-email");
    }
  }, [navigate]);

  if (!isLoggedIn || !user) {
    return (
      <div className="account-info-page">
        <div className="account-wrapper">
          <main className="account-main-right">
            <div className="account-header">
              <h2>Please sign in first</h2>
              <p>You need to be signed in to change your email address.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (!newEmail || !confirmEmail) {
      setError("Please fill in both email fields.");
      return;
    }
    if (newEmail !== confirmEmail) {
      setError("Email addresses do not match. Please try again.");
      return;
    }
    if (!newEmail.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    const updatedUser = { ...user, email: newEmail };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    sessionStorage.removeItem("emailVerificationPassed");
    onUserUpdate?.(updatedUser);
    setSuccessMessage("Email updated successfully!");
    setError("");
    setNewEmail("");
    setConfirmEmail("");

    setTimeout(() => {
      navigate("/account-info");
    }, 1200);
  };

  return (
    <div className="account-info-page">
      <div className="account-wrapper">
        <main className="account-main-right">
          <div className="account-header">
            <div className="account-header-content">
              <h1>Update Email Address</h1>
              <p>Enter your new email address and confirm it to save your profile.</p>
            </div>
          </div>

          {successMessage && (
            <div className="success-banner">
              <span>✓ {successMessage}</span>
            </div>
          )}

          <form className="account-section" onSubmit={handleSave}>
            <div className="section-header">
              <h3>✉️ New Email</h3>
            </div>
            <div className="edit-field">
              <input
                type="email"
                name="newEmail"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter new email address"
              />
              <input
                type="email"
                name="confirmEmail"
                value={confirmEmail}
                onChange={(e) => {
                  setConfirmEmail(e.target.value);
                  setError("");
                }}
                placeholder="Confirm new email address"
              />
              {error && <p className="form-error">{error}</p>}
              <div className="button-group">
                <button className="btn-save" type="submit">
                  Save Email
                </button>
                <button className="btn-cancel" type="button" onClick={() => {
                  sessionStorage.removeItem("emailVerificationPassed");
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

export default NewEmail;
