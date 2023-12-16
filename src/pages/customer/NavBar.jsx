import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("home"); // Default active menu
  const navigate = useNavigate();
  const token = "Bearer " + localStorage.getItem("token");
  // State to track the number of items in the cart
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Extract the current path from the location object and set the active menu accordingly
    const currentPath = location.pathname.substring(1); // Remove leading '/'
    setActiveMenu(currentPath || "home");

    // Extract the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch cart items count or any other logic to determine the count
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Fetch cart items count
  const fetchData = async () => {
    try {
      const response = await fetch("/ecommerce/rest/cartItems/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const cartItems = await response.json();

      // Assuming the API returns an array of cart items
      setCartItemCount(cartItems.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      // Make the API call to remove the item from the cart
      await fetch(`/ecommerce/rest/cartItems/remove/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      // After successful removal, fetch the updated cart item count
      fetchData();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  };

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  const handleLogout = () => {
    // Clear the authentication token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Redirect to the login page (adjust the path as needed)
    navigate("/");
  };

  return (
    <div className="flex justify-between bg-gray-100 rounded-md p-4 sticky top-0 z-50 ml-[40px] mr-[40px]">
      <div className="mt-1 ml-4">
        <h2 className="text-6xl font-bold">
          <Link
            to="/home"
            className={`text-[var(--primary-pink)] text-4xl cursor-pointer ${
              activeMenu === "home" ? "active" : ""
            }`}
          >
            <span className="text-[50px] text-[var(--primary-pink)]">C</span>
            <span className="text-[var(--primary-pink)] text-[30px]">ool</span>
            <span className="text-[50px] text-[var(--primary-blue)]">S</span>
            <span className="text-[var(--primary-blue)] text-[30px]">tuff</span>
          </Link>
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/home"
          className={`text-[var(--primary-blue)] text-[20px] pr-10 ${
            activeMenu === "home" ? "active" : ""
          }`}
        >
          HOME
        </Link>
        <Link
          to="/orders"
          className={`text-[var(--primary-blue)] text-[20px] pr-10 ${
            activeMenu === "orders" ? "active" : ""
          }`}
        >
          ORDERS
        </Link>
        <Link
          to="/about"
          className={`text-[var(--primary-blue)] text-[20px] pr-10 ${
            activeMenu === "about" ? "active" : ""
          }`}
        >
          ABOUT
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/cart" className="relative">
          <FaCartPlus className="text-[30px] text-[#49A3C8] cursor-pointer" />
          {cartItemCount > 0 && (
            <span className="absolute top-[-10px] right-[-19px] bg-[#E0588E] text-white rounded-full px-2 py-1 text-xs">
              {cartItemCount}
            </span>
          )}
        </Link>

        <div
          className="relative user-container"
          onClick={toggleUserMenu} // Handle the click event on the user container
        >
          <div className="user-initials bg-[var(--primary-blue)] text-white text-xl w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
            {getInitials(username)}
          </div>
          {userMenuVisible && (
            <div className="user-menu absolute top-10 right-0 bg-gray-100 shadow-md p-2">
              <Link
                to="/profile"
                className="text-[var(--primary-blue)] text-sm block mb-2"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-[var(--primary-blue)] text-sm block mb-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
