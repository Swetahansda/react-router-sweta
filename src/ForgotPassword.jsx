import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(String(newOtp));
    setShowOtp(true);

    alert('OTP sent to ' + email + ' (Fake OTP: ' + newOtp + ')');
  };

  const handleVerify = () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    if (otp === generatedOtp) {
      alert("OTP verified successfully");
      setShowOtp(false);
      setOtp("");
      navigate("/signin");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p>Reset password</p>
          <h2>Forgot Password</h2>
        </div>

        <p className="auth-subtitle">
          Enter your email to receive a one-time verification code.
        </p>

        <div className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn-primary auth-submit" onClick={handleSendOTP}>
            Send OTP
          </button>

          <p className="auth-toggle">
            Remembered your password? <span onClick={() => navigate("/signin")}>Back to sign in</span>
          </p>
        </div>
      </div>

      {showOtp && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <h3>Enter OTP</h3>
            <p className="auth-modal-note">Check your email for the code.</p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div className="auth-modal-actions">
              <button className="btn-primary" onClick={handleVerify}>Verify</button>
              <button className="btn-secondary" onClick={() => setShowOtp(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
