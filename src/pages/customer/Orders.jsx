import React, { useState, useEffect } from 'react';
import { IoMdArchive } from 'react-icons/io';
import Nav from "./NavBar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
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
        console.log(data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleViewMore = async (order) => {
    setSelectedOrder(order);
    console.log(order);
    try {
      const response = await fetch(`/ecommerce/rest/orders/${order.id}/items`, {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      setOrderItems(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const handleCloseView = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

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
        <div>
          {/* Render orders table when there are orders */}
          <table className="table-auto bg-gray-100 mx-auto w-3/4 mt-5">
            <tbody>
              <tr>
                <th className="border px-4 py-2">Order Number</th>
                <th className="border px-4 py-2">Amount Payable</th>
                <th className="border px-4 py-2">Order Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{order.orderNumber}</td>
                  <td className="border px-4 py-2">{`$${order.totalAmount.toFixed(2)}`}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleViewMore(order)}>View More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Display order items in a table when the "View More" button is clicked */}
          {selectedOrder && (
            <div className="mt-5">
              <h2>Order Items - {selectedOrder.orderNumber}</h2>
              <table className="table-auto bg-white mx-auto w-3/4 mt-5">
                <tbody>
                  {/* Render order items here */}
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.productName}</td>
                      {/* Add more columns as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleCloseView}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
