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

  const [selectedIndex, setSelectedIndex] = useState(() => {
    return 0;
  });
  const [previewIndex, setPreviewIndex] = useState(() => {
    return addresses.length > 0 ? 0 : -1;
  });
  const [showForm, setShowForm] = useState(() => {
    return addresses.length === 0;
  });
  const [formData, setFormData] = useState({
    region: "",
    city: "",
    address: "",
    landmark: "",
    recipient: "",
    phone: "",
    pincode: "",
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
      setPreviewIndex((currentPreviewIndex) => (currentPreviewIndex >= 0 ? currentPreviewIndex : 0));
      setShowForm((currentShowForm) => (addresses.length === 0 ? true : currentShowForm));
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
      pincode: "",
    });
    setSelectedIndex(-1);
    setPreviewIndex(-1);
    setShowForm(true);
  };

  const handleEditAddress = () => {
    if (addresses.length === 0) {
      resetForm();
      return;
    }

    const indexToEdit = selectedIndex >= 0 && selectedIndex < addresses.length ? selectedIndex : 0;
    setSelectedIndex(indexToEdit);
    setPreviewIndex(indexToEdit);
    setFormData(addresses[indexToEdit]);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    if (!formData.region || !formData.city || !formData.address || !formData.recipient || !formData.phone || !formData.pincode) {
      setMessage("Please fill in all required fields before saving.");
      return;
    }

    const updatedAddresses = [...addresses];
    if (selectedIndex >= 0 && selectedIndex < updatedAddresses.length) {
      updatedAddresses[selectedIndex] = formData;
      setMessage("Address updated successfully.");
    } else {
      updatedAddresses.push(formData);
      setMessage("Address saved successfully.");
    }

    setAddresses(updatedAddresses);
    const savedIndex = selectedIndex >= 0 && selectedIndex < updatedAddresses.length ? selectedIndex : updatedAddresses.length - 1;
    setSelectedIndex(savedIndex);
    setPreviewIndex(savedIndex);
    setShowForm(false);
    setTimeout(() => setMessage(""), 2600);
  };

  const handleDeleteAddress = () => {
    if (addresses.length === 0) {
      setMessage("No address selected to delete.");
      return;
    }

    const updatedAddresses = addresses.slice(1);
    setAddresses(updatedAddresses);
    setSelectedIndex(updatedAddresses.length > 0 ? 0 : -1);
    setPreviewIndex(updatedAddresses.length > 0 ? 0 : -1);
    setFormData(updatedAddresses[0] || {
      region: "",
      city: "",
      address: "",
      landmark: "",
      recipient: "",
      phone: "",
    });
    setShowForm(updatedAddresses.length === 0);
    setMessage("First saved address deleted.");
    setTimeout(() => setMessage(""), 2600);
  };

  return (
    <div className="address-page">
      <div className="address-main">
        <div className="account-header">
          <div className="account-header-content">
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

        {!showForm && addresses.length > 0 && previewIndex >= 0 && addresses[previewIndex] ? (
          <div className="saved-address-feature">
            <div className="saved-address-feature-badge">Saved Address</div>
            <h2>{addresses[previewIndex].recipient}</h2>
            <p>{addresses[previewIndex].address}</p>
            <p>
              {addresses[previewIndex].city}, {addresses[previewIndex].region}
              {addresses[previewIndex].pincode ? ` - ${addresses[previewIndex].pincode}` : ""}
            </p>
            {addresses[previewIndex].landmark ? <p>{addresses[previewIndex].landmark}</p> : null}
            <p>{addresses[previewIndex].phone}</p>
            <div className="saved-address-actions">
              <button className="btn-secondary" onClick={handleEditAddress}>
                Edit Address
              </button>
            </div>
          </div>
        ) : null}

        {showForm ? (
          <div className="address-form-card">
            <div className="section-title">Address Details</div>
            <label>
              Region / State *
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Region / State"
              />
            </label>
            <label>
              City / District *
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City / District"
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
              Pincode *
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
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
        ) : null}
      </div>
    </div>
  );
}

export default Address;
