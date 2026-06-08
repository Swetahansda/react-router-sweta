import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
  const storageKey = user ? `addresses_${user.email}` : null;

  const [addresses, setAddresses] = useState(() => {
    if (!storageKey) return [];
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState({
    region: "",
    city: "",
    address: "",
    landmark: "",
    recipient: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(addresses));
    }
  }, [addresses, storageKey]);

  useEffect(() => {
    if (addresses.length > 0) {
      setFormData(addresses[selectedIndex] || addresses[0]);
    }
  }, [addresses, selectedIndex]);

  if (!isLoggedIn || !user) {
    return (
      <div className="no-user">
        <h2>No user found</h2>
        <p>Please sign in to manage your addresses.</p>
      </div>
    );
  }

  const resetForm = () => {
    setFormData({
      region: "",
      city: "",
      address: "",
      landmark: "",
      recipient: "",
      phone: "",
    });
    setSelectedIndex(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    if (!formData.region || !formData.city || !formData.address || !formData.recipient || !formData.phone) {
      setMessage("Please fill in all required fields before saving.");
      return;
    }

    const updatedAddresses = [...addresses];
    if (selectedIndex >= 0 && selectedIndex < updatedAddresses.length) {
      updatedAddresses[selectedIndex] = formData;
      setMessage("Address updated successfully.");
    } else {
      updatedAddresses.push(formData);
      setSelectedIndex(updatedAddresses.length - 1);
      setMessage("Address saved successfully.");
    }

    setAddresses(updatedAddresses);
    setTimeout(() => setMessage(""), 2600);
  };

  const handleDeleteAddress = () => {
    if (selectedIndex < 0 || selectedIndex >= addresses.length) {
      setMessage("No address selected to delete.");
      return;
    }

    const updatedAddresses = addresses.filter((_, index) => index !== selectedIndex);
    setAddresses(updatedAddresses);
    setSelectedIndex(updatedAddresses.length > 0 ? 0 : -1);
    setFormData(updatedAddresses[0] || {
      region: "",
      city: "",
      address: "",
      landmark: "",
      recipient: "",
      phone: "",
    });
    setMessage("Address deleted.");
    setTimeout(() => setMessage(""), 2600);
  };

  return (
    <div className="address-page">
      <div className="address-main">
        <div className="account-header">
          <div className="account-header-content">
            <div className="account-avatar account-avatar-large">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1>My Address</h1>
              <p>Save your delivery address for faster checkout and seamless orders.</p>
            </div>
          </div>
        </div>

        {message && (
          <div className="success-banner">
            <span>✓ {message}</span>
          </div>
        )}

        <div className="address-content-grid">
          <div className="address-list-card">
            <div className="section-title">Saved Addresses</div>
            {addresses.length === 0 ? (
              <p className="empty-text">No addresses saved yet. Add one below.</p>
            ) : (
              addresses.map((item, index) => (
                <button
                  key={index}
                  className={`address-card ${selectedIndex === index ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedIndex(index);
                    setFormData(item);
                  }}
                >
                  <strong>{item.recipient}</strong>
                  <span>{item.address}</span>
                  <span>{item.city}, {item.region}</span>
                </button>
              ))
            )}
            <button className="btn-secondary" onClick={resetForm}>
              Add New Address
            </button>
          </div>

          <div className="address-form-card">
            <div className="section-title">Address Details</div>
            <label>
              Region / City / District *
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Region / City / District"
              />
            </label>
            <label>
              Address *
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address, apartment, suite, etc."
              />
            </label>
            <label>
              Landmark (optional)
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="Landmark, building name, nearby spot"
              />
            </label>
            <label>
              Recipient Name *
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                placeholder="Recipient name"
              />
            </label>
            <label>
              Phone Number *
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </label>

            <div className="address-form-actions">
              <button className="btn-delete" onClick={handleDeleteAddress}>
                Delete Address
              </button>
              <button className="btn-primary" onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
