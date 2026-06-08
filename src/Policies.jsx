import React from "react";
import "./App.css";

function Policies() {
  return (
    <div className="generic-page">
      <h1>Policies</h1>
      <p>Read our return, shipping, and privacy policies.</p>
      <div className="settings-card">
        <h3>Return Policy</h3>
        <p>Products can be returned within 7 days of delivery in original condition.</p>
        <h3>Privacy Policy</h3>
        <p>We respect your privacy and protect your data using secure practices.</p>
      </div>
    </div>
  );
}

export default Policies;
