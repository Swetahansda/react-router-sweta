import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSecurity() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const storageKey = user ? `accountSecurity_${user.email}` : null;
 

  const [securityState, setSecurityState] = useState(() => {
    if (!storageKey) return initialSecurity;
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved || initialSecurity;
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(securityState));
    }
  }, [securityState, storageKey]);

  if (!isLoggedIn || !user) {
    return (
      <div className="no-user">
        <h2>No user found</h2>
        <p>Please sign in to access account security settings.</p>
      </div>
    );
  }

  const updateStatus = (message) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(""), 3200);
  };

  const handleEmailVerification = () => {
    setSecurityState((prev) => ({ ...prev, emailVerified: true }));
    updateStatus("Verification link sent. Check your inbox.");
  };

  const handleMobileVerifySubmit = () => {
    if (otpCode.trim() === "123456") {
      setSecurityState((prev) => ({ ...prev, mobileVerified: true }));
      setOtpCode("");
      setShowMobileForm(false);
      updateStatus("Mobile number verified successfully.");
    } else {
      updateStatus("Invalid OTP. Please try 123456.");
    }
  };

  const handlePasswordVerifySubmit = () => {
    if (passwordConfirm === user.password) {
      setSecurityState((prev) => ({ ...prev, passwordVerified: true }));
      setPasswordConfirm("");
      setShowPasswordForm(false);
      updateStatus("Password verification successful.");
    } else {
      updateStatus("Password did not match. Please try again.");
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === "DELETE") {
      localStorage.removeItem("user");
      localStorage.setItem("isLoggedIn", false);
      localStorage.removeItem(storageKey);
      updateStatus("Account deleted. Redirecting...");
      setTimeout(() => navigate("/signin"), 1200);
    } else {
      updateStatus("Type DELETE to confirm account deletion.");
    }
  };

  return (
    <div className="account-security-page">
      <div className="account-main">
        <div className="account-header">
          <div className="account-header-content">
            <div className="account-avatar account-avatar-large">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1>Account Security</h1>
              <p>
                Keep your ecommerce account protected with email, mobile, and
                password verification.
              </p>
            </div>
          </div>
        </div>

        {statusMessage && (
          <div className="success-banner security-success">
            <span>✓ {statusMessage}</span>
          </div>
        )}

        <div className="security-summary-grid">
          <div className="security-tile">
            <span className="tile-title">Account Status</span>
            <span className="tile-value">Active</span>
            <span className="tile-note">Your account is in good standing.</span>
          </div>
          <div className="security-tile">
            <span className="tile-title">Email Verified</span>
            <span className={`status-badge ${securityState.emailVerified ? "verified" : "pending"}`}>
              {securityState.emailVerified ? "Verified" : "Pending"}
            </span>
            <span className="tile-note">Email verification keeps sign-in secure.</span>
          </div>
          <div className="security-tile">
            <span className="tile-title">Mobile Verified</span>
            <span className={`status-badge ${securityState.mobileVerified ? "verified" : "pending"}`}>
              {securityState.mobileVerified ? "Verified" : "Pending"}
            </span>
            <span className="tile-note">Add a phone number for two-step protection.</span>
          </div>
          <div className="security-tile">
            <span className="tile-title">Password Verified</span>
            <span className={`status-badge ${securityState.passwordVerified ? "verified" : "pending"}`}>
              {securityState.passwordVerified ? "Verified" : "Pending"}
            </span>
            <span className="tile-note">Use password checks for sensitive actions.</span>
          </div>
        </div>

        <div className="security-actions-grid">
          <div className="security-card">
            <header>
              <h2>Verify Email</h2>
              <p>Send a verification link to your registered email address.</p>
            </header>
            <div className="card-body">
              <span className="security-label">{user.email}</span>
              <button
                className="btn-primary"
                onClick={handleEmailVerification}
                disabled={securityState.emailVerified}
              >
                {securityState.emailVerified ? "Email Verified" : "Send Verification Link"}
              </button>
            </div>
          </div>

          <div className="security-card">
            <header>
              <h2>Mobile Verification</h2>
              <p>Confirm your phone number for extra account recovery protection.</p>
            </header>
            <div className="card-body">
              <span className="security-label">Phone number on file</span>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowMobileForm(true);
                  setStatusMessage("");
                }}
                disabled={securityState.mobileVerified}
              >
                {securityState.mobileVerified ? "Mobile Verified" : "Verify Mobile"}
              </button>
              {showMobileForm && !securityState.mobileVerified && (
                <div className="verification-form">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter OTP 123456"
                  />
                  <button className="btn-primary" onClick={handleMobileVerifySubmit}>
                    Submit OTP
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="security-card">
            <header>
              <h2>Password Verification</h2>
              <p>Confirm your identity before making account changes.</p>
            </header>
            <div className="card-body">
              <span className="security-label">Verified with your current password</span>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowPasswordForm(true);
                  setStatusMessage("");
                }}
                disabled={securityState.passwordVerified}
              >
                {securityState.passwordVerified ? "Verified" : "Verify Password"}
              </button>
              {showPasswordForm && !securityState.passwordVerified && (
                <div className="verification-form">
                  <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button className="btn-primary" onClick={handlePasswordVerifySubmit}>
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="delete-zone-card">
          <div>
            <h2>Delete Account</h2>
            <p className="delete-note">
              Permanently remove your account, order history, and saved preferences.
            </p>
            <div className="verification-form deletion-form">
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE to confirm"
              />
              <button className="btn-delete" onClick={handleDeleteAccount}>
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSecurity;
