import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountInfo() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    language: "English",
    gender: "Not specified",
    birthday: "",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", false);
    navigate("/signin");
  };

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

  const handleSaveFullName = () => {
    if (formData.fullName.trim()) {
      const updatedUser = { ...user, name: formData.fullName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccessMessage("Full name updated successfully!");
      setEditingField(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleChangePassword = () => {
    if (
      formData.newPassword &&
      formData.newPassword === formData.confirmPassword
    ) {
      const updatedUser = { ...user, password: formData.newPassword };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccessMessage("Password changed successfully!");
      setShowPasswordModal(false);
      setFormData((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleChangeEmail = () => {
    if (formData.email && formData.email.includes("@")) {
      const updatedUser = { ...user, email: formData.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccessMessage("Email updated successfully!");
      setShowEmailModal(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="account-info-page">
      <div className="account-main">
        {/* Header */}
        <div className="account-header">
          <div className="account-header-content">
            <div className="account-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1>Personal Details</h1>
              <p>Manage and update your account information</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-banner">
            <span>✓ {successMessage}</span>
          </div>
        )}

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
              {!showEmailModal ? (
                <>
                  <div className="account-display">
                    <span className="label">Current Email</span>
                    <span className="value">{formData.email}</span>
                  </div>
                  <button
                    className="btn-edit"
                    onClick={() => setShowEmailModal(true)}
                  >
                    Change Email
                  </button>
                </>
              ) : (
                <div className="edit-field">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter new email address"
                  />
                  <div className="button-group">
                    <button
                      className="btn-save"
                      onClick={handleChangeEmail}
                    >
                      Update Email
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setShowEmailModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Password Section */}
          <div className="account-section">
            <div className="section-header">
              <h3>🔐 Password</h3>
            </div>
            <div className="account-item">
              {!showPasswordModal ? (
                <>
                  <div className="account-display">
                    <span className="label">Password</span>
                    <span className="value">••••••••</span>
                  </div>
                  <button
                    className="btn-edit"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change Password
                  </button>
                </>
              ) : (
                <div className="edit-field">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="New Password"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                  />
                  <div className="button-group">
                    <button
                      className="btn-save"
                      onClick={handleChangePassword}
                    >
                      Update Password
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setShowPasswordModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
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

        {/* Account Security Info */}
        <div className="account-security-section">
          <h3>🛡️ Account Security</h3>
          <div className="security-info-grid">
            <div className="security-item">
              <span className="security-label">Account Status</span>
              <span className="security-value">Active ✓</span>
            </div>
            <div className="security-item">
              <span className="security-label">Member Since</span>
              <span className="security-value">2024</span>
            </div>
            <div className="security-item">
              <span className="security-label">Verification</span>
              <span className="security-value">Email Verified ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
