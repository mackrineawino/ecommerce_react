import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNavBar';

const AdminHome = ({ totalCategories = 9 }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const token = "Bearer " + localStorage.getItem('token');

  useEffect(() => {
    // Fetch totalProducts data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/ecommerce/rest/products/list' , {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        setTotalProducts(data.length);
      } catch (error) {
        console.error('Error fetching totalProducts:', error);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() => {
    // Fetch totalProducts data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/ecommerce/rest/auth/list' , {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.error('Error fetching totalProducts:', error);
      }
    };

    fetchData();
  }, [token]); 
  useEffect(() => {
    // Fetch totalProducts data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/ecommerce/rest/orders/list' , {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        setTotalOrders(data.length);

      } catch (error) {
        console.error('Error fetching totalProducts:', error);
      }
    };

    fetchData();
  }, [token]); 

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
