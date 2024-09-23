import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./assets/logo.jpg";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginSharp from "@mui/icons-material/LoginSharp";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "./Redux/Slices/modeSlice";
import { setLoggedIn, setLoggedOut } from "./Redux/Slices/userSlice";
import LoginModal from "./Components/LoginModal";
import UserDetailsModal from "./Components/UserDetailsModal";
import { setsearch } from "./Redux/Slices/searchSlice";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [udm, setUdm] = useState(false);
  const [homesearch, sethomeSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const darkMode = useSelector((state) => state.mode);
  const isLoggedIn = useSelector((state) => state.user.loggedstate);
  const searchRef = useRef(null);

  useEffect(() => {
    if (
      localStorage.getItem("user") != null &&
      localStorage.getItem("user") != "" &&
      localStorage.getItem("user") != undefined &&
      localStorage.getItem("user") != "undefined" &&
      localStorage.getItem("user") != "null"
    ) {
      dispatch(setLoggedIn());
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("darkMode") == true ||
      localStorage.getItem("darkMode") == "true"
    ) {
      dispatch(toggleMode());
    }
  }, []);

  const categories = ["Electronics", "Clothing", "Sports", "Kitchen"];

  useEffect(() => {
    axios
      .get("https://mern-project-backend-green.vercel.app/api/users/data")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {
        console.log("error fetching data");
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    sethomeSearch(query);
    dispatch(setsearch(query));

    const filteredSuggestions = products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setSuggestionsVisible(query.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(
      `/${suggestion.category.toLowerCase()}/${suggestion.product_name}`
    );
    setSuggestionsVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSuggestionsVisible(false);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleMode());
    localStorage.setItem("darkMode", !darkMode);
    console.log(localStorage.getItem("darkMode"));
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const usershowdets = () => {
    setUdm(true);
  };

  const handleCloseUserDetailsModal = () => {
    setUdm(false);
  };

  useEffect(() => {
    setsearch("");
    sethomeSearch("");
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between p-4 md:p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center space-x-2 md:space-x-4">
        <Link to={"/"} className="flex items-center space-x-2">
          <img
            className="h-10 w-10 md:h-12 md:w-12 rounded-full"
            src={Logo}
            alt="Logo"
          />
          <h1
            className={`text-lg md:text-xl font-bold hidden sm:block ${
              darkMode ? "text-white" : ""
            }`}
          >
            E Shop
          </h1>
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <IconButton
          style={{ color: darkMode ? "#ffffff" : "black" }}
          aria-label="menu"
          onClick={handleMenuToggle}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <div className="hidden md:flex justify-center space-x-6 text-gray-600">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/${category.toLowerCase()}`}
            className={`hover:text-blue-500 transition duration-300 ${
              darkMode ? "text-white" : ""
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="flex w-48 sm:w-64 mx-2 md:mx-4 relative" ref={searchRef}>
        <form>
          <input
            type="text"
            placeholder="Search"
            value={homesearch}
            className={`w-full px-3 py-2 border ${
              darkMode ? "border-gray-600" : "border-gray-300"
            } rounded-lg focus:outline-none focus:border-blue-500`}
            onChange={handleSearchChange}
          />
        </form>

        {suggestionsVisible && suggestions.length > 0 && (
          <div
            className={`absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg z-10 bg-white text-black"
            }`}
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <img
                  src={suggestion.image_link}
                  alt={suggestion.product_name}
                  className="inline-block w-8 h-8 rounded-full mr-2"
                />
                {suggestion.product_name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/cart">
          <IconButton
            style={{ color: darkMode ? "#ffffff" : "black" }}
            aria-label="shopping cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        {isLoggedIn ? (
          <IconButton
            style={{ color: darkMode ? "#ffffff" : "black" }}
            aria-label="account"
            onClick={usershowdets}
          >
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <IconButton
            style={{ color: darkMode ? "#ffffff" : "black" }}
            aria-label="login"
            onClick={handleLoginClick}
          >
            <LoginSharp />
          </IconButton>
        )}
        <IconButton
          style={{ color: darkMode ? "#ffffff" : "black" }}
          aria-label="dark mode"
          onClick={handleDarkModeToggle}
        >
          <DarkModeIcon />
        </IconButton>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-4 z-10 bg-white shadow-lg rounded-lg p-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase()}`}
              className={`block py-2 hover:text-blue-500 transition duration-300 ${
                darkMode ? "text-black" : ""
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      )}

      <LoginModal open={loginModalOpen} onClose={handleCloseLoginModal} />
      <UserDetailsModal open={udm} onClose={handleCloseUserDetailsModal} />
    </div>
  );
};

export default Header;
