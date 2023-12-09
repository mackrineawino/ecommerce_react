import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("home"); // Default active menu

  useEffect(() => {
    // Assuming you have a way to fetch the username, replace the placeholder logic
    const fetchedUsername = "JohnDoe";
    setUsername(fetchedUsername);
  }, []);

  useEffect(() => {
    // Extract the current path from the location object and set the active menu accordingly
    const currentPath = location.pathname.substring(1); // Remove leading '/'
    setActiveMenu(currentPath || "home");
  }, [location]);

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  };

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  return (
    <div className="flex justify-between bg-gray-100 rounded-md p-4 sticky top-0 z-50">
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
        <Link to="/addToCart" className="relative">
          <FaCartPlus className="text-[30px] text-[#49A3C8] cursor-pointer " />
          <span className="absolute top-[-10px] right-[-19px] bg-[#E0588E] text-white rounded-full px-2 py-1 text-xs">
            0
          </span>
        </Link>

        <div
          className="relative user-container"
          onMouseEnter={toggleUserMenu}
          onMouseLeave={toggleUserMenu}
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
              <Link
                to="#"
                className="text-[var(--primary-blue)] text-sm block mb-2"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
