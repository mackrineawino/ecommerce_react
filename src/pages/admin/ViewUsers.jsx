import React from 'react'
import AdminNav from './AdminNavBar'
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import GenericTable from '../../components/GenericTable';


const ViewUsers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ecommerce/rest/users/list');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const columns = ["id", "imageUrl", "productName", "price", "availability", "productDescription", "category"];

  const handleEdit = (item) => {
    // Implement your edit logic here
    console.log("Edit item:", item);
  };

  const handleDelete = async (itemId) => {
    try {
      // Make a DELETE request to the backend endpoint
      await axios.delete(`http://localhost:8080/ecommerce/rest/users/delete/${itemId}`);

      // Remove the deleted item from the local state
      setCustomers((prevProducts) => prevProducts.filter((customer) => customer.id !== itemId));
      
      console.log(`User with id ${itemId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  return (
    <div className="h-screen">
      <AdminNav>
      {customers.length === 0 ? (
        // Display empty order message when there are no orders
        <div className="flex flex-col items-center justify-center h-screen ">
          <div><FaUser className="text-blue-500 text-[90px]" /></div>
          <p className="text-pink-500 text-2xl mt-[30px]">No Customers Available At The Moment.</p>
        </div>
      ) :(
        <div className="flex flex-col items-center">
        <h2>Users Table</h2>
      <GenericTable data={customers} columns={columns} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
      )}
    </AdminNav>
    </div>
  )
}

export default ViewUsers
