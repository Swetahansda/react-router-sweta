import React, { useState } from "react";
import "./App.css";

function Feedback() {
  const [productName, setProductName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState("Pending Review");
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Submitted");
    setSubmitted(true);
  };

  return (
    <div className="generic-page feedback-page">
      <div className="feedback-header">
        <h1>Feedback</h1>
        <p>Tell us about your order and product experience so we can improve.</p>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        {submitted && (
          <div className="feedback-success-banner">
            <strong>Thank you!</strong> Your feedback has been submitted successfully.
          </div>
        )}

        <div className="feedback-section">
          <h2>Rating</h2>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`rating-star ${rating >= value ? "active" : ""}`}
                onClick={() => setRating(value)}
              >
                ★
              </button>
            ))}
            <span className="rating-value">{rating} / 5</span>
          </div>
        </div>

        <div className="feedback-section">
          <h2>Feedback Comment</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience"
            rows={6}
          />
        </div>

        <div className="feedback-section">
          <h2>Photo Upload (Optional)</h2>
          <label className="upload-button">
            Add product photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
          {photo && <div className="upload-preview">Selected file: {photo.name}</div>}
        </div>

        <button type="submit" className="btn-primary feedback-submit">
          Submit Feedback
        </button>
      </form>

       </div>
  );
}

export default Feedback;
