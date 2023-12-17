import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNavBar";
import GenericTable from "../../components/GenericTable";
import { IoMdArchive } from 'react-icons/io';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = "Bearer " + localStorage.getItem('token');

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/ecommerce/rest/orders/list', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [token]); // Empty dependency array ensures the effect runs only once on mount

  const columns = ["orderNumber", "totalAmount", "email", "status", "orderItems", ];

  const handleEdit = (item) => {
    // Implement your edit logic here
    console.log("Edit item:", item);
  };

  const handleDelete = async (orderid) => {
    try {
      // Make a DELETE request to the backend endpoint
      await axios.delete(`/ecommerce/rest/orders/delete/${orderid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },});

      // Remove the deleted item from the local state
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderid));
      
      console.log(`Item with id ${orderid} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="h-screen">
      <AdminNav>
      {orders.length === 0 ? (
        // Display empty order message when there are no orders
        <div className="flex flex-col items-center justify-center h-screen ">
          <div><IoMdArchive className="text-blue-500 text-[90px]" /></div>
          <p className="text-pink-500 text-2xl mt-[30px]">No orders available at the moment.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2>Orders Table</h2>
          <GenericTable data={orders} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )
      }
      </AdminNav>
    </div>
  );
}

export default ViewOrders;
