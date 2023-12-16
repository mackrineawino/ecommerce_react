import React, { useState, useEffect } from 'react';
import { IoMdArchive } from 'react-icons/io';
import Nav from "./NavBar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = "Bearer " + localStorage.getItem('token');
  console.log('Authorization token:', token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ecommerce/rest/orders/list', {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
          
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <Nav />
      {orders.length === 0 ? (
        // Display empty order message when there are no orders
        <div className="flex flex-col items-center justify-center h-screen rounded bg-[#C2D7EB] my-[30px] mx-[40px]">
          <div><IoMdArchive className="text-blue-500 text-[90px]" /></div>
          <p className="text-pink-500 text-2xl mt-[30px]">No orders available at the moment.</p>
        </div>
      ) : (
        // Render orders table when there are orders
        <table className="table-auto bg-white mx-auto w-3/4 mt-5">
          <tbody>
            <tr>
              <th className="border px-4 py-2">Order Number</th>
              <th className="border px-4 py-2">Amount Payable</th>
              <th className="border px-4 py-2">Order Status</th>
              <th className="border px-4 py-2">Items</th>
            </tr>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{order.orderNumber}</td>
                <td className="border px-4 py-2">{`$${order.totalAmount.toFixed(2)}`}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">{order.orderItems.map(item => item.itemName).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
