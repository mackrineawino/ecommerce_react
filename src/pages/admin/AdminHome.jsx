import React from 'react';
import AdminNav from './AdminNavBar';

const AdminHome = ({ totalUsers = 100, totalProducts = 1000, totalOrders = 50, totalCategories = 9 }) => {
  return (
    <div className="h-screen">
      <AdminNav>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8 p-10 text-center">
            {/* Total Users */}
            <a href="viewUsers" className="stats-card-link" style={{ textDecoration: 'none', color: 'white' }}>
              <div className="stats-card bg-gray-800 w-[380px] h-[230px] p-8 rounded-[10px] flex flex-col justify-center items-center shadow-md transition-transform hover:scale-105">
                <h2 className="text-3xl">Total Customers</h2>
                <p className="text-2xl pt-10">{totalUsers}</p>
              </div>
            </a>

            {/* Total Products */}
            <a href="viewproducts" className="stats-card-link" style={{ textDecoration: 'none', color: 'white' }}>
              <div className="stats-card bg-gray-800 w-[380px] h-[230px] p-8 rounded-[10px] flex flex-col justify-center items-center shadow-md transition-transform hover:scale-105">
                <h2 className="text-3xl">Total Products</h2>
                <p className="text-2xl pt-10">{totalProducts}</p>
              </div>
            </a>

            {/* Total Orders */}
            <a href="vieworders" className="stats-card-link" style={{ textDecoration: 'none', color: 'white' }}>
              <div className="stats-card bg-gray-800 w-[380px] h-[230px] p-8 rounded-[10px] flex flex-col justify-center items-center shadow-md transition-transform hover:scale-105">
                <h2 className="text-3xl">Total Orders</h2>
                <p className="text-2xl pt-10">{totalOrders}</p>
              </div>
            </a>

            {/* Total Categories */}
            <a href="viewproducts" className="stats-card-link" style={{ textDecoration: 'none', color: 'white' }}>
              <div className="stats-card bg-gray-800 w-[380px] h-[230px] p-8 rounded-[10px] flex flex-col justify-center items-center shadow-md transition-transform hover:scale-105">
                <h2 className="text-3xl">Total Categories</h2>
                <p className="text-2xl pt-10">{totalCategories}</p>
              </div>
            </a>
          </div>
        </div>
      </AdminNav>
    </div>
  );
};

export default AdminHome;
