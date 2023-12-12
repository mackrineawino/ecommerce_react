import React, { useState } from 'react';

const ProductGrid = ({ products }) => {
  const [successStatus, setSuccessStatus] = useState({});

  const addToCart = (product) => {
    // Construct the data object with required fields
    const data = {
      id: product.id,
      imageUrl: product.imageUrl,
      productName: product.productName,
      category: product.category,
      price: product.price,
      order: null,
    };

    fetch('http://localhost:8080/ecommerce/rest/cartItems/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response as needed
        console.log('Item added to cart:', data);
        // Set success status for this product to true
        setSuccessStatus((prevStatus) => ({ ...prevStatus, [product.id]: true }));
        // Clear the success status after a delay (e.g., 3 seconds)
        setTimeout(() => setSuccessStatus((prevStatus) => ({ ...prevStatus, [product.id]: false })), 3000);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-[40px] pl-[40px] pr-[40px]">
      {products.map((product) => (
        <div key={product.id} className="bg-[#C2D7EB] p-4 rounded shadow-md text-center flex flex-col justify-center items-center transition-transform hover:scale-105">
          {/* Product Image */}
          <img src={product.imageUrl} alt={product.productName} className="h-[250px] w-[250px] rounded mb-5" />

          {/* Product Details */}
          <h2 className="text-lg font-semibold mb-2">Name: {product.productName}</h2>
          <p className="font-semibold mb-2">Price: {product.price}</p>
          <p className="font-semibold mb-4">Availability: {product.availability}</p>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                // Handle view description
                console.log('View Description clicked');
              }}
              className="bg-[var(--primary-pink)] text-white p-2 rounded mr-20"
            >
              View More
            </button>
            <button
              onClick={() => {
                // Handle add to cart
                addToCart(product);
              }}
              className={`bg-[var(--primary-pink)] text-white p-2 rounded ${successStatus[product.id] ? 'bg-blue-500' : ''}`}
            >
              {successStatus[product.id] ? 'Added ✔' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
