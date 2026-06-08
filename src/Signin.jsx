import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState(""); //It holds what user types.
  const [password, setPassword] = useState(""); //It is used to change/update the email value
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); //Prevents page reload.

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("isLoggedIn", true);
      alert("Login successful ??");
      navigate("/account-info");
    } else {
      alert("Invalid email or password ?");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p>Welcome Back</p>
          <h2>Sign In</h2>
        </div>

        <p className="auth-subtitle">
          Sign in to access your account, track orders, and enjoy faster checkout.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary auth-submit" type="submit">
            Continue
          </button>

          <p className="auth-forgot" onClick={() => navigate("/forgot-password")}>Forgot Password?</p>

          <p className="auth-toggle">
            New here? <span onClick={() => navigate("/signup")}>Create account</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
