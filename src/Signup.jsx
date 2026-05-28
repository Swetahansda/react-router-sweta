import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("This email is already registered ? Please sign in instead");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully ??");

    const userData = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", true);
    navigate("/profile");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p>Create account</p>
          <h2>Sign Up</h2>
        </div>

        <p className="auth-subtitle">
          Join now to shop smarter, save favorites, and get special offers.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary auth-submit" type="submit">
            Create Account
          </button>

          <p className="auth-toggle">
            Already have an account? <span onClick={() => navigate("/signin")}>Sign in</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
