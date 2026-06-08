import React, { useState, useRef } from "react";
import "./AccountInfo.css";
import { useNavigate } from "react-router-dom";

function AccountInfo({ onUserUpdate }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const [editingField, setEditingField] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    language: "English",
    gender: "Not specified",
    birthday: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isLoggedIn || !user) {
    return (
      <div className="no-user">
        <h2>No user found</h2>
        <p>Please login to view your account</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatarPreview(dataUrl);
      if (user) {
        const updatedUser = { ...user, avatar: dataUrl };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        onUserUpdate?.(updatedUser);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveFullName = () => {
    if (formData.fullName.trim()) {
      const updatedUser = { ...user, name: formData.fullName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onUserUpdate?.(updatedUser);
      setSuccessMessage("Full name updated successfully!");
      setEditingField(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="account-info-page">
      <div className="account-wrapper">
        <main className="account-main-right">
        {/* Header */}
          <div className="account-header">
            <div className="account-header-left">
              <div className="avatar-wrapper">
                <div className="account-avatar">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="avatar" />
                  ) : (
                    user?.name?.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="avatar-actions">
                  <input ref={fileInputRef} onChange={handleAvatarChange} id="avatarInput" type="file" accept="image/*" style={{ display: "none" }} />
                  <button className="btn-upload" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Upload</button>
                  <button className="btn-remove" onClick={() => {
                    setAvatarPreview(null);
                    if (user) {
                      const updatedUser = { ...user, avatar: null };
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                      onUserUpdate?.(updatedUser);
                    }
                  }}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="account-header-content">
              <div>
                <h1>Manage your Profile</h1>
                <p>Review your profile information, update settings, and keep your account secure.</p>
              </div>
            </div>
          </div>

        {/* Success Message */}
          {successMessage && (
            <div className="success-banner">
              <span>✓ {successMessage}</span>
            </div>
          )}

          <div className="account-summary-grid">
            <div className="summary-card">
              <span className="summary-label">Account status</span>
              <h3>Active</h3>
              <p>Your profile is up to date and ready to shop.</p>
            </div>
            <div className="summary-card">
              <span className="summary-label">Member since</span>
              <h3>2024</h3>
              <p>You've been with us since your first purchase.</p>
            </div>
            
          </div>

        {/* Account Details Grid */}
          <div className="account-details-container">
          {/* Full Name Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>📝 Full Name</h3>
            </div>
            <div className="account-item">
              {editingField === "fullName" ? (
                <div className="edit-field">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                  <div className="button-group">
                    <button
                      className="btn-save"
                      onClick={handleSaveFullName}
                    >
                      Save
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setEditingField(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="account-display">
                    <span className="label">Current Name</span>
                    <span className="value">{formData.fullName}</span>
                  </div>
                  <button
                    className="btn-edit"
                    onClick={() => setEditingField("fullName")}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Email Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>✉️ Email Address</h3>
            </div>
            <div className="account-item">
              <div className="account-display">
                <span className="label">Current Email</span>
                <span className="value">{formData.email}</span>
              </div>
              <button
                className="btn-edit"
                onClick={() => navigate("/verify-email")}
              >
                Change Email
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>🔐 Password</h3>
            </div>
            <div className="account-item">
              <div className="account-display">
                <span className="label">Password</span>
                <span className="value">••••••••</span>
              </div>
              <button
                className="btn-edit"
                onClick={() => navigate("/verify-password")}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>🌐 Language</h3>
            </div>
            <div className="account-item">
              <div className="account-display">
                <span className="label">Preferred Language</span>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="select-field"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gender Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>👤 Gender</h3>
            </div>
            <div className="account-item">
              <div className="account-display">
                <span className="label">Gender</span>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="select-field"
                >
                  <option value="Not specified">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Birthday Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>🎂 Birthday</h3>
            </div>
            <div className="account-item">
              <div className="account-display">
                <span className="label">Date of Birth</span>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="date-field"
                />
              </div>
            </div>
          </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default AccountInfo;
