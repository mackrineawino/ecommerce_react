import React, { useState, useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import { loadStripe } from "@stripe/stripe-js";
import useForceUpdate  from 'use-force-update';
import { TbTruckDelivery } from "react-icons/tb";



const CartTable = ({ cartItems, onAddMore, onReduceQuantity, onRemove }) => {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const forceUpdate = useForceUpdate();

  const token = "Bearer " + localStorage.getItem('token');

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeObj = await loadStripe('pk_test_51OGzlhGFDR8x86eFVSQr2mFCHNmLahJEQXjFNeNob8wzollbBjys7mQ8uBwbmaNjOWJrnWsLyo9bR2b6HOeWrxSM002WcnIaTj');
      setStripe(stripeObj);
    };

    initializeStripe();
  }, []);

  const handleRemove = async (item) => {
    setRemoveLoading(true);

    try {
      await onRemove(item);
    } finally {
      setRemoveLoading(false);
    }
  };

  const handleAddMore = async (item) => {
    try {
      await onAddMore(item);
      forceUpdate();
    } catch (error) {
      console.error('Error adding more quantity:', error);
    }
  };
  const handleReduceQuantity = async (item) => {
    try {
      await onReduceQuantity(item);
      forceUpdate();
    } catch (error) {
      console.error('Error adding more quantity:', error);
    }
  };

  const calculateItemTotal = (item) => {
    // Calculate the total for a specific item (price * quantity)
    return item.price * item.quantity;
  };

  const calculateCartTotal = () => {
    // Calculate the total for the entire cart
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    try {
      const userEmail = localStorage.getItem("email");

      const response = await fetch("/ecommerce/rest/checkout/session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          totalPrice: calculateCartTotal(), // Use the calculated cart total
          userEmail: userEmail,
        }),
      });

      const result = await response.json();
      console.log(result.sessionId);

      if (result && result.sessionId && stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: result.sessionId });

        if (error) {
          alert(error.message);
        }
      } else {
        throw new Error('Invalid session data or missing Stripe object');
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="flex mt-[15px]">
      {/* Cart Items */}
      <div className="flex flex-col gap-4 ml-[40px] w-[70%] bg-[#C2D7EB]">
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

            <p className="text-gray-600 mb-2"> {item.quantity} Units</p>
            {/* ... */}
            <p className="text-gray-600 mb-2 text-[40px] text-center">
              <span
                className={`inline-block w-[35px] h-[35px] bg-[var(--primary-pink)] hover:bg-[var(--primary-blue)] text-white rounded-full text-[35px] leading-[35px] cursor-pointer ${item.quantity === 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                onClick={() => handleReduceQuantity(item)}
                disabled={item.quantity === 1}
              >
                -
              </span>
            </p>
            {/* ... */}

            <p className="text-gray-600 mb-2 text-[40px] text-center">
  <span className="inline-block w-[35px] h-[35px] bg-[var(--primary-pink)] hover:bg-[var(--primary-blue)] text-white rounded-full text-[35px] leading-[35px] cursor-pointer" onClick={() => handleAddMore(item)}>+</span>
</p>


            <button
              onClick={() => handleRemove(item)}
              className="bg-[var(--primary-pink)] text-white px-4 py-2 rounded hover:bg-[var(--primary-blue)] h-10"
              disabled={removeLoading}
            >
              {removeLoading ? (
                <ImSpinner9 className="animate-spin inline-block mr-2" />
              ) : (
                'Remove'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Totals Card */}
      <div className="bg-[#C2D7EB] w-[30%] p-4 rounded shadow-md mr-[40px] ml-[30px] h-[300px]">
        <h1 className="text-lg font-semibold mb-2 text-center">CART SUMMARY</h1>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2">SubTotal</h2>
          <h3> KSh. {calculateCartTotal()}</h3>
        </div>
        <div className="text-center h-[130px] mb-[10px] rounded text-gray-800 ">
          <h1 className="bg-gray-400 font-bold text-black rounded ">Delivery</h1>
        <TbTruckDelivery className="text-[40px] ml-[150px] mb-[10px]"/>
          <h2 className="mb-[10px]" >Get free Delivery</h2>
          <p> For items above Ksh: 10,000</p>
          

        </div>

        <div className="mt-[2px]">
          <button
            onClick={handleCheckout}
            className="bg-[var(--primary-pink)] px-4 py-2 text-white rounded w-full hover:bg-[var(--primary-blue)]"
            disabled={checkoutLoading}
          >
            {checkoutLoading ? (
              <ImSpinner9 className="animate-spin inline-block mr-2" />
            ) : (
              `CHECKOUT (KES ${calculateCartTotal()})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
