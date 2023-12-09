import React from 'react';
import Nav from "./NavBar";

const Orders = () => {
  const orders = [
    { orderNumber: '001', amountPayable: '$50.00', orderStatus: 'Pending', items: ['Item A', 'Item B'] },
    { orderNumber: '002', amountPayable: '$30.00', orderStatus: 'Shipped', items: ['Item C', 'Item D', 'Item E'] },
  ];

  return (
    <div>
      <Nav />
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
              <td className="border px-4 py-2">{order.amountPayable}</td>
              <td className="border px-4 py-2">{order.orderStatus}</td>
              <td className="border px-4 py-2">{order.items.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
