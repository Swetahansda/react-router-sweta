import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteAccountMethod() {
  const navigate = useNavigate();
  const { method } = useParams();
  const [user, setUser] = useState(null);
  const maskEmail = (email = "") => {
    const parts = email.split("@");
    if (!parts[0]) return email;
    const name = parts[0];
    const visible = name.slice(0, 2);
    const hidden = "*".repeat(Math.max(0, name.length - 2));
    return `${visible}${hidden}@${parts[1] || ""}`;
  };
  const [emailInput, setEmailInput] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (method !== "email" && method !== "mobile" && method !== "password") {
      navigate("/account-security", { replace: true });
    }
  }, [method, navigate]);

  if (!user) {
    return (
      <div className="no-user">
        <h2>Not signed in</h2>
        <p>Please sign in to continue.</p>
      </div>
    );
  }

  const methodLabel =
    method === "email"
      ? "Email OTP"
      : method === "mobile"
      ? "Mobile OTP"
      : "Current Password";

  const handleSendOtp = () => {
    if (method === "email") {
      const email = emailInput.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        setMessage("Please enter your registered email before sending OTP.");
        return;
      }
      if (!emailPattern.test(email)) {
        setMessage("Please enter a valid email address.");
        return;
      }
      if (email !== user.email) {
        setMessage("The email does not match your registered email.");
        return;
      }
    }

    setOtpSent(true);
    setShowOtpPopup(true);
    setMessage("OTP sent. Enter 123456 to verify in this demo.");
  };

  const handleVerify = () => {
    if (method === "email" || method === "mobile") {
      if (!otpSent) {
        setMessage("Please send the OTP first.");
        return;
      }
      if (otp.trim() === "123456") {
        setVerified(true);
        setMessage("Verification successful. You can now delete your account.");
      } else {
        setMessage("Invalid OTP. Please enter 123456.");
      }
      return;
    }

    if (method === "password") {
      if (password === user.password) {
        setVerified(true);
        setMessage("Password verified. You can now delete your account.");
      } else {
        setMessage("Current password did not match.");
      }
    }
  };

  const handleDelete = () => {
    if (!verified) {
      setMessage("Please verify your identity before deleting your account.");
      return;
    }
    setShowModal(true);
  };

  const performDelete = () => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const remaining = users.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(remaining));
    } catch (error) {
      // ignore missing user list
    }
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="delete-account-page">
      <div className="delete-account-card">
        <div className="delete-header">
          <div className="header-left">
            <div className="warning-icon-large">⚠️</div>
            <div>
              <h1>Delete Account</h1>
              <p className="delete-subtitle">Verification method: {methodLabel}</p>
              <div className="registered-info">
                {method === "email" && <small>Registered email: {maskEmail(user.email)}</small>}
                {method === "mobile" && <small>Registered mobile: *****{user.phone ? user.phone.slice(-3) : ""}</small>}
              </div>
            </div>
          </div>
        </div>

        <div className="delete-warning-card">
          <strong>Deleting your account is permanent.</strong>
          <p>
            This will remove your account, orders, addresses, wishlists, and personal data permanently.
          </p>
        </div>

        <div className="delete-section">
          <div className="verification-panel">
            <h3>{methodLabel} verification</h3>
            <p className="verification-instruction">
              {method === "email" && "Send a one-time code to your registered email and enter it below."}
              {method === "mobile" && "Send a one-time code to your mobile number and enter it below."}
              {method === "password" && "Enter your current password to verify your account."}
            </p>

            {method === "email" && (
              <div className="method-card">
                <div className="method-head">
                  <div className="method-icon">📧</div>
                  <div>
                    <h4>Verify by Email</h4>
                    <div className="muted">Enter your registered email to receive an OTP.</div>
                  </div>
                </div>

                <div className="input-with-icon">
                  <input
                    type="email"
                    placeholder="Enter registered email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>

                <div className="verification-row">
                  <button className="btn-secondary btn-wide" onClick={handleSendOtp}>
                    Send OTP
                  </button>
                  <input
                    type="text"
                    className="otp-input"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {verified && <div className="verified-badge">Verified ✓</div>}
              </div>
            )}

            {method === "mobile" && (
              <div className="method-card">
                <div className="method-head">
                  <div className="method-icon">📱</div>
                  <div>
                    <h4>Verify by Mobile</h4>
                    <div className="muted">Send an OTP to your registered phone number.</div>
                  </div>
                </div>

                <div className="verification-row">
                  <button className="btn-secondary btn-wide" onClick={handleSendOtp}>
                    Send OTP
                  </button>
                  <input
                    type="text"
                    className="otp-input"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {verified && <div className="verified-badge">Verified ✓</div>}
              </div>
            )}

            {method === "password" && (
              <div className="method-card">
                <div className="method-head">
                  <div className="method-icon">🔒</div>
                  <div>
                    <h4>Verify with Password</h4>
                    <div className="muted">Enter your current account password to confirm.</div>
                  </div>
                </div>

                <div className="input-with-icon">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="show-hide-btn" onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {verified && <div className="verified-badge">Verified ✓</div>}
              </div>
            )}
          <div className="center-container">
                        <div className="verification-actions">
              <button className="btn-primary btn-wide" onClick={handleVerify}>
                Verify
              </button>
            </div>

            {message && <div className="delete-message">{message}</div>}

            {verified && (
              <div className="action-row">
                <button className="btn-delete" onClick={handleDelete}>
                  Delete Account
                </button>
              </div>
            )}

            <div className="action-row action-row-last">
              <button className="btn-secondary btn-outline" onClick={() => navigate("/account-security")}>
                Back  
              </button>
            </div>
            </div>

          </div>
        </div>
      </div>

      {showOtpPopup && (
        <div className="otp-popup-backdrop">
          <div className="otp-popup">
            <h2>OTP Sent</h2>
            <p>Your one-time verification code is:</p>
            <div className="otp-code">123456</div>
            <button className="btn-primary" onClick={() => setShowOtpPopup(false)}>
              Okay
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="delete-confirm-modal-backdrop">
          <div className="delete-confirm-modal">
            <h2>Confirm deletion</h2>
            <p>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="delete-confirm-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-delete" onClick={performDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccountMethod;
