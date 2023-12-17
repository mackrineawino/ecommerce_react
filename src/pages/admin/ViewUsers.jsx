import React from 'react'
import AdminNav from './AdminNavBar'
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import GenericTable from '../../components/GenericTable';


const ViewUsers = () => {
  const [customers, setCustomers] = useState([]);
  const token = "Bearer " + localStorage.getItem('token');
  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/ecommerce/rest/auth/list', {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [token]); // Empty dependency array ensures the effect runs only once on mount
  const normalUsers = customers.filter((user) => user.userType === "NORMAL_USER");
  const columns = ["id", "username", "email"];

  const handleEdit = (item) => {
    // Implement your edit logic here
    console.log("Edit item:", item);
  };

  const handleDelete = async (userid) => {
    try {
      // Make a DELETE request to the backend endpoint
      await axios.delete(`/ecommerce/rest/auth/delete/${userid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });


      // Remove the deleted item from the local state
      setCustomers((prevUser) => prevUser.filter((customer) => customer.id !== userid));
      
      console.log(`User with id ${userid} deleted successfully.`);
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
        <h2 className='mb-5 text-[30px]'>Customer List</h2>
      <GenericTable data={normalUsers} columns={columns} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
      )}
    </AdminNav>
    </div>
  )
}

export default ViewUsers
