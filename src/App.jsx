import { useState } from "react";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Addtocart from "./Addtocart";
import About from "./About";
import Signin from "./Signin";
import Signup from "./Signup";
import "./App.css";
import logo from "./assets/logo.png";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import AccountInfo from "./AccountInfo";
import AccountSecurity from "./AccountSecurity";
import Address from "./Address";
import ProductDetails from "./ProductDetails";
import Compare from "./Compare";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import AppSettings from "./AppSettings";
import Policies from "./Policies";
import Feedback from "./Feedback";



 
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = isLoggedIn
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);
  const handleNavigate = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="nav-links">
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          ☰
        </button>

        <div className="brand" onClick={handleLogoClick} role="button" tabIndex="0">
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              style={{ cursor: "pointer" }}
            />
          </div>
          <span className="brand-name">
            <span className="brand-name-primary">Kin</span>
            <span className="brand-name-secondary">nus</span>
          </span>
        </div>

        <div className="nav-search-section">
          <input
            type="text"
            placeholder="🔍 Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/compare">Compare</NavLink>
          {isLoggedIn && currentUser ? (
            <span className="nav-user">Hi, {currentUser.name}</span>
          ) : (
            <>
              <NavLink to="/signin">Signin</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}
          <NavLink to="/cart">Cart</NavLink>
        </nav>
      </div>

      <div className={`mobile-menu-backdrop ${menuOpen ? "active" : ""}`} onClick={closeMenu} />
      <aside className={`mobile-menu-drawer ${menuOpen ? "open" : ""}`}>
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
          ×
        </button>
        <div className="mobile-menu-content">
          {isLoggedIn && currentUser ? (
            <>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/account-info")}>Account Info</button>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/account-security")}>Account Security</button>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/address")}>My Address</button>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/myorders")}>My Order</button>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/settings")}>App Setting</button>
              <div className="mobile-menu-language">
                <button className="mobile-menu-link" onClick={() => setShowLanguageMenu(!showLanguageMenu)}>
                  Language: {currentLanguage}
                </button>
                {showLanguageMenu && (
                  <div className="language-options">
                    <button className={`language-option ${currentLanguage === "English" ? "active" : ""}`} onClick={() => { setCurrentLanguage("English"); setShowLanguageMenu(false); }}>
                      English
                    </button>
                    <button className={`language-option ${currentLanguage === "Nepali" ? "active" : ""}`} onClick={() => { setCurrentLanguage("Nepali"); setShowLanguageMenu(false); }}>
                      नेपली
                    </button>
                  </div>
                )}
              </div>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/policies")}>Policies</button>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/feedback")}>Feedback</button>
              <button
                className="mobile-menu-link mobile-menu-signout"
                onClick={() => {
                  localStorage.setItem("isLoggedIn", false);
                  closeMenu();
                  navigate("/signin");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/signin")}>Signin</button>
              <button className="mobile-menu-link" onClick={() => handleNavigate("/signup")}>Signup</button>
            </>
          )}
        </div>
      </aside>

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/account-security" element={<AccountSecurity />} />
        <Route path="/address" element={<Address />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/settings" element={<AppSettings />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/addtocart" element={<Addtocart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </>
  );
}

export default App;