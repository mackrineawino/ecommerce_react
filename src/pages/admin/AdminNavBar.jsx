import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-gray-800 p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-pink-500">
            <span className="text-pink-500 text-5xl">C</span>ool
          </span>
          <span className="text-blue-500">
            {" "}
            <span className="text-blue-500 text-5xl">S</span>tuff
          </span>
        </h2>
        <h2 className="text-white mb-4 text-[25px] mt-4">ADMIN DASHBOARD</h2>
        <ul className="list-none text-[18px] mt-10">
          <li className="navitem">
            <Link
              to="/stats"
              className="text-white py-3 block hover:bg-gray-700"
            >
              STATS
            </Link>
          </li>
          <li className="navitem">
            <Link
              to="/viewusers"
              className="text-white py-3 block hover:bg-gray-700"
            >
              USERS
            </Link>
          </li>
          <li className="navitem">
            <Link
              to="/vieworders"
              className="text-white py-3 block hover:bg-gray-700"
            >
              ORDERS
            </Link>
          </li>
          <li className="navitem">
            <Link
              to="/viewproducts"
              className="text-white py-3 block hover:bg-gray-700"
            >
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-white block hover:bg-gray-700 px-4 py-3"
            >
              LOGOUT
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8 bg-blue-100">
        {children}
      </div>
      <div
        id="confirmationModal"
        className="fixed inset-0 hidden justify-center items-center"
      >
        <div className="modal-content bg-blue-200 p-8 rounded-md shadow-md">
          <p>Continue to delete this item? This is irreversible.</p>
          <button
            id="confirmDelete"
            className="bg-pink-500 text-white px-4 py-2 mr-2"
          >
            Yes
          </button>
          <button
            id="cancelDelete"
            className="bg-blue-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
