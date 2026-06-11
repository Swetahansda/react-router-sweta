import { useState, useEffect, useRef } from "react";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Addtocart from "./Addtocart";
import About from "./About";
import Signin from "./Signin";
import Signup from "./Signup";
import "./App.css";

import ForgotPassword from "./ForgotPassword";
import AccountInfo from "./AccountInfo";
import AccountSecurity from "./AccountSecurity";
import DeleteAccountMethod from "./DeleteAccountMethod";
import Address from "./Address";
import ProductDetails from "./ProductDetails";
import Compare from "./Compare";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import AppSettings from "./AppSettings";
import Policies from "./Policies";
import Feedback from "./Feedback";
import VerifyPassword from "./VerifyPassword";
import NewPassword from "./NewPassword";
import VerifyEmail from "./VerifyEmail";
import NewEmail from "./NewEmail";
import Footer from "./Footer";
import  cart  from "./assets/cart.webp";
import logo2 from "./assets/logo2.png";



 
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [currentUser, setCurrentUser] = useState(() => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setShowProfileMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
        setShowLanguageMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowProfileMenu(false);
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };
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
        <div className="nav-brand-group">
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
          </button>
          
          <div className="brand" onClick={handleLogoClick} role="button" tabIndex="0">
            <div className="logo">
              <img
                src={logo2}
                alt="logo"
                style={{ cursor: "pointer" }}
              />
            </div>
           
          </div>

          
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
          <NavLink to="/cart" className="cart-link">
  <img src={cart} alt="Cart" className="cart-icon" />
  <span>Cart</span>
</NavLink>
          {isLoggedIn && currentUser ? (
            <div className="nav-profile-wrap" ref={profileMenuRef}>
              <button
                className="nav-profile-trigger"
                onClick={() => setShowProfileMenu((open) => !open)}
                aria-label="Open profile menu"
                aria-expanded={showProfileMenu}
                type="button"
              >
                {currentUser.avatar ? (
                  <img className="nav-profile-avatar" src={currentUser.avatar} alt="Profile" />
                ) : (
                  <span className="nav-profile-fallback" aria-hidden="true">
                    👤
                  </span>
                )}
              </button>

              {showProfileMenu ? (
                <div className="nav-profile-dropdown" role="menu" aria-label="Profile menu">
                  <div className="nav-profile-header">
                    {currentUser.avatar ? (
                      <img className="nav-profile-header-avatar" src={currentUser.avatar} alt="Profile" />
                    ) : (
                      <div className="nav-profile-header-avatar nav-profile-header-fallback" aria-hidden="true">
                        👤
                      </div>
                    )}
                    <div>
                      <div className="nav-profile-name">{currentUser.name}</div>
                      <div className="nav-profile-subtitle">Profile menu</div>
                    </div>
                  </div>

                  <button className="nav-profile-link" onClick={() => handleNavigate("/account-info")}>Account Info</button>
                  <button className="nav-profile-link" onClick={() => handleNavigate("/account-security")}>Account Security</button>
                  <button className="nav-profile-link" onClick={() => handleNavigate("/address")}>My Address</button>
                  <button className="nav-profile-link" onClick={() => handleNavigate("/myorders")}>My Order</button>
                  <button className="nav-profile-link" onClick={() => handleNavigate("/settings")}>App Setting</button>

                  <div className="nav-profile-language">
                    <button className="nav-profile-link" onClick={() => setShowLanguageMenu(!showLanguageMenu)}>
                      Language: {currentLanguage}
                    </button>
                    {showLanguageMenu && (
                      <div className="language-options nav-profile-language-options">
                        <button className={`language-option ${currentLanguage === "English" ? "active" : ""}`} onClick={() => { setCurrentLanguage("English"); setShowLanguageMenu(false); }}>
                          English
                        </button>
                        <button className={`language-option ${currentLanguage === "Nepali" ? "active" : ""}`} onClick={() => { setCurrentLanguage("Nepali"); setShowLanguageMenu(false); }}>
                          नेपली
                        </button>
                      </div>
                    )}
                  </div>

                  <button className="nav-profile-link" onClick={() => handleNavigate("/policies")}>Policies</button>
                  <button className="nav-profile-link" onClick={() => handleNavigate("/feedback")}>Feedback</button>
                  <button
                    className="nav-profile-link nav-profile-signout"
                    onClick={() => {
                      localStorage.removeItem("isLoggedIn");
                      localStorage.removeItem("user");
                      localStorage.clear();
                      setCurrentUser(null);
                      setIsLoggedIn(false);
                      setShowProfileMenu(false);
                      setShowLanguageMenu(false);
                      closeMenu();
                      navigate("/signin");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
          {isLoggedIn && currentUser ? null : (
            <span className="nav-auth">
              <button className="auth-btn" onClick={() => navigate('/signin')}>Sign in</button>
              <button className="auth-btn" onClick={() => navigate('/signup')}>Sign up</button>
            </span>
          )}
        </nav>
      </div>

      <div className={`mobile-menu-backdrop ${menuOpen ? "active" : ""}`} onClick={closeMenu} />
      <aside className={`mobile-menu-drawer ${menuOpen ? "open" : ""}`}>
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
          ×
        </button>
        <div className="mobile-menu-content">
          <div className="mobile-menu-heading">Explore</div>
          <button className="mobile-menu-link" onClick={() => handleNavigate("/about")}>About Us</button>
          <button className="mobile-menu-link" onClick={() => handleNavigate("/compare")}>Compare Product</button>
          {isLoggedIn && currentUser ? (
            <>
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
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("user");
                  localStorage.clear();
                  setCurrentUser(null);
                  setIsLoggedIn(false);
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
        <Route path="/account-info" element={<AccountInfo onUserUpdate={handleUpdateUser} />} />
        <Route path="/verify-password" element={<VerifyPassword />} />
        <Route path="/new-password" element={<NewPassword onUserUpdate={handleUpdateUser} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/new-email" element={<NewEmail onUserUpdate={handleUpdateUser} />} />
        <Route path="/account-security" element={<AccountSecurity />} />
        <Route path="/delete-account/:method" element={<DeleteAccountMethod />} />
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

      <Footer searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </>
  );
}

export default App;