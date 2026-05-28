import React from "react";

function About() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <div className="about-banner-copy">
          <span className="eyebrow">Discover the story behind our brand</span>
          <h1>About Our Store</h1>
          <p className="banner-text">
            Your trusted online shopping destination with curated products,
            fast delivery, and friendly service.
          </p>
          <div className="banner-tags">
            <span>Fast delivery</span>
            <span>Secure checkout</span>
            <span>Customer-first support</span>
          </div>
        </div>
      </div>

      <section className="about-section about-grid">
        <div>
          <h2>Who We Are</h2>
          <p>
            We are an ecommerce platform committed to providing high-quality
            products at affordable prices with reliable service and fast delivery.
          </p>
        </div>
        <div className="about-highlight-card">
          <h3>Trusted shopping, made simple</h3>
          <p>
            From the moment you browse our collection to the moment your order
            arrives, we focus on quality, speed, and trust.
          </p>
        </div>
      </section>

    
      <section className="about-section about-grid">
        <div>
          <h2>Our Mission</h2>
          <p>
            To make online shopping simple, secure, and accessible for everyone
            with a seamless customer experience.
          </p>
        </div>
        <div className="about-stat-card">
          <div>
            <strong>Fast delivery</strong>
            <p>Get your order delivered quickly with care and tracking updates.</p>
          </div>
          <div>
            <strong>Quality assurance</strong>
            <p>Every product is selected for value, quality, and customer delight.</p>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="about-section">
        <h2>What We Offer</h2>

        <div className="offer-grid">
          <div className="offer-card">Fashion</div>
          <div className="offer-card">Electronics</div>
          <div className="offer-card">Home Essentials</div>
          <div className="offer-card">Accessories</div>
        </div>

      </section>

      <section className="about-section">
        <h2>Why Choose Us</h2>

        <ul className="about-list">
          <li>Trusted and verified products</li>
          <li>Fast and reliable delivery</li>
          <li>Easy return and refund policy</li>
          <li>Secure payment system</li>
        </ul>
      </section>

      
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          We started with a simple idea — to make quality products available
          online at fair prices. Today, we continue to grow with thousands of
          satisfied customers.
        </p>
      </section>

    
      <section className="about-cta">
        <div>
          <h2>Need Support?</h2>
          <p>We are here to help you anytime.</p>
        </div>
        <button className="btn-primary">Contact Us</button>
      </section>

    </div>
  );
}

export default About;