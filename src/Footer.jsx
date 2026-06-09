import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

function Footer({ searchTerm, setSearchTerm }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = (event) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <footer className="site-footer" aria-label="Footer navigation">
      <div className="footer-shell">
        <div className="footer-navbar">
          <div className="footer-brand-group">
            <div className="brand" onClick={() => navigate("/")} role="button" tabIndex="0">
              <div className="logo">
                <img src={logo} alt="logo" style={{ cursor: "pointer" }} />
              </div>
              <span className="brand-name">
                <span className="brand-name-primary">Kin</span>
                <span className="brand-name-secondary">nus</span>
              </span>
            </div>
          </div>

          <div className="footer-search-actions">
            <div className="footer-search-section">
              <input
                type="text"
                placeholder="🔍 Search for products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="search-input"
              />
            </div>

            <NavLink to="/cart" className="footer-cart-link" aria-label="Open cart">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4h-2l-1 2H1v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 7 21h12v-2H7.42a.25.25 0 0 1-.22-.37L8 17h7.55a2 2 0 0 0 1.8-1.11L21 8H6.21l-.94-2Zm2 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm9 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </svg>
              <span>Cart</span>
            </NavLink>
          </div>

          <div className="footer-main-nav" aria-label="Footer main navigation">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/compare">Compare</NavLink>
          </div>
        </div>

        <div className="footer-social-row" aria-label="Social links">
          <a className="footer-social-link" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.1l.4-3H14v-2c0-.6.4-1 1-1z" />
            </svg>
          </a>
          <a className="footer-social-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm5.75-3.15a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15z" />
            </svg>
          </a>
          <a className="footer-social-link" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.8 12 4.8 12 4.8s-5.6 0-7.5.3a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.3 7.5.3 7.5.3s5.6 0 7.5-.3a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15.2V8.8L15.6 12 10 15.2z" />
            </svg>
          </a>
        </div>

        <div className="footer-grid">
          <section className="footer-column">
            <h3>Shop Links</h3>
            <nav className="footer-links footer-links-vertical" aria-label="Shop Links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/">Shop</NavLink>
              <NavLink to="/">New Arrivals</NavLink>
              <NavLink to="/compare">Compare</NavLink>
              <NavLink to="/cart">Wishlist</NavLink>
            </nav>
          </section>

          <section className="footer-column">
            <h3>Customer Support</h3>
            <nav className="footer-links footer-links-vertical" aria-label="Customer Support">
              <NavLink to="/feedback">Help</NavLink>
              <NavLink to="/feedback">FAQ</NavLink>
              <NavLink to="/myorders">Track Order</NavLink>
              <NavLink to="/checkout">Shipping</NavLink>
              <NavLink to="/checkout">Payment</NavLink>
              <NavLink to="/policies">Cancellation &amp; Return Policy</NavLink>
            </nav>
          </section>

          <section className="footer-column">
            <h3>Policies</h3>
            <nav className="footer-links footer-links-vertical" aria-label="Policies">
              <NavLink to="/policies">Consumer Policy</NavLink>
              <NavLink to="/policies">Terms of Use</NavLink>
              <NavLink to="/account-security">Security</NavLink>
            </nav>
          </section>

          <section className="footer-column">
            <h3>Company</h3>
            <nav className="footer-links footer-links-vertical" aria-label="Company">
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/feedback">Contact Us</NavLink>
            </nav>
          </section>

          <section className="footer-column footer-newsletter footer-newsletter-wide">
            <h3>Newsletter</h3>
            <p>Get product updates, offers, and new arrivals delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
                required
              />
              <button className="newsletter-button" type="submit">Subscribe</button>
            </form>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
