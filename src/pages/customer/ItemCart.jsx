import React, { useState, useEffect } from "react";
import CartTable from "../../components/CartTable";
import Nav from "./NavBar";
import { FaCartPlus } from "react-icons/fa6";

const ItemCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/ecommerce/rest/cartItems/list"
        );
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleRemove = (item) => {

    console.log("Remove item:", item);
  };


  const total = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );

  return (
    <div>
      <Nav />
      {cartItems.length > 0 ? (
        <CartTable cartItems={cartItems} onRemove={handleRemove} total={total} />
      ) : (
        // Display this when cart is empty
        <div className="flex flex-col items-center justify-center h-screen rounded bg-[#C2D7EB] my-[30px] mx-[40px]">
          <div><FaCartPlus className="text-2xl text-blue-500 cursor-pointer text-[90px]" /></div>
          <p className="text-pink-500 text-3xl mt-5 mb-10">Your Cart is Empty.</p>
          <div className="mb-20">
            <a
              href="/home"
              className="block py-2 px-6 text-white bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-pink-500"
            >
              START SHOPPING
            </a>
          </div>
        </div>

      )}
    </div>
  );
};

export default ItemCart;
