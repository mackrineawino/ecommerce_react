import React, { useState, useEffect } from 'react';
import { IoMdArchive } from 'react-icons/io';
import Nav from "./NavBar";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const token = "Bearer " + localStorage.getItem('token');

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
        const userEmail = localStorage.getItem("email");
        const userOrders = data.filter(order => order.email === userEmail);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleViewMore = async (order) => {
    setSelectedOrder(order);
    try {
      const response = await fetch(`/ecommerce/rest/orders/${order.id}/items`, {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });
      const data = await response.json();
      setOrderItems(data);
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
        <div className="flex flex-col items-center justify-center h-screen rounded bg-blue-200 my-30 mx-40">
          <div><IoMdArchive className="text-blue-500 text-90" /></div>
          <p className="text-pink-500 text-2xl mt-30">No orders available at the moment.</p>
        </div>
      ) : (
        <div>
          <table className="table-auto bg-blue-200 mx-auto w-3/4 mt-5">
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
                    <button onClick={() => handleViewMore(order)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-pink-500">View More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
            <div className="mt-5">
              <h2 className='text-white text-[30px] text-center'>Order Items: {selectedOrder.orderNumber}</h2>

              <div className="flex flex-wrap justify-center">
                {orderItems.map((item, index) => (
                  <div key={index} className="bg-blue-200 mx-[40px]  w-[100%] p-4 rounded shadow flex justify-between items-center">
                    <img src={item.imageUrl} alt={item.productName} className="max-w-[100px] max-h-[100px] mb-2" />
                    <p className="text-left text-[20px]">{item.productName}</p>
                    <p className='text-[20px]'>{item.quantity} units</p>
                    <p className='text-[20px]'>Ksh {item.price.toFixed(2)}</p>
                    {/* Add more content or styling as needed */}
                  </div>
                ))}
              </div>

              <button onClick={handleCloseView} className="bg-blue-500 text-white px-3 py-1 rounded mt-3 ml-[650px] hover:bg-pink-500">Close</button>
            </div>

          )}
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default Orders;
