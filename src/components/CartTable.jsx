import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const CartTable = ({ cartItems, onRemove, total }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = (item) => {
    // Set loading to true when starting the removal process
    setLoading(true);

    // Call the onRemove callback to update the state in the parent component (ItemCart)
    onRemove(item);
    setLoading(false); // Set loading back to false (not in finally block as we are handling it in the parent component)
  };

  return (
    <div className="flex mt-[15px]">
      {/* Cart Items */}
      <div className="flex flex-col gap-4 ml-[40px] w-[70%] bg-white">
        <h2 className="text-center text-[20px] mt-[8px]">Cart</h2>
        <hr />
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center space-x-4 overflow-x-auto"
          >
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="max-w-[100px] max-h-[100px] object-cover mb-4"
            />

            <h3 className="text-lg font-semibold mb-2">{item.productName}</h3>

            <p className="text-gray-600 mb-2">KES {item.price.toFixed(2)}</p>

            <button
              onClick={() => handleRemove(item)}
              className="bg-[var(--primary-pink)] text-white px-4 py-2 rounded hover:bg-[var(--primary-blue)] h-10"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <ImSpinner9 className="animate-spin inline-block mr-2" />
              ) : (
                'Remove'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Totals Card */}
      <div className="bg-white w-[30%] p-4 rounded shadow-md mr-[40px] ml-[30px] h-[300px]">
        <h1 className="text-lg font-semibold mb-2 text-center">CART SUMMARY</h1>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2">Totals</h2>
          <h3> KSh. {total}</h3>
        </div>
        <div className="text-center bg-[var(--primary-pink)] h-[130px]">
          <h2>Delivery</h2>
        </div>

        <div className="mt-[2px]">
          <button className="bg-[var(--primary-pink)] px-4 py-2 text-white rounded w-full hover:bg-[var(--primary-blue)]  disabled={loading} ">
            {loading ? (
              <ImSpinner9 className="animate-spin inline-block mr-2" />
            ) : (
              `CHECKOUT (KES ${total})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
