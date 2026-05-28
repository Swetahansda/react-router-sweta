import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./Home";
import Addtocart from "./Addtocart";
import About from "./About";
import Signin from "./Signin";
import Signup from "./Signup";
import "./App.css";
import logo from "./assets/logo.png";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";

 
function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = isLoggedIn
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <>
      <div className="nav-links">

        <div className="logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          />
        </div>

        

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/addtocart" element={<Addtocart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </>
  );
}

export default App;