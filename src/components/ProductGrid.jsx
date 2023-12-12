import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products }) => {

  const navigate = useNavigate();

  
  const handleViewMoreClick = (productId) => {
    // Navigate to the product details page with the product ID
    navigate(`/productDetails/${productId}`);
  };


  return (
    <div className="grid grid-cols-5 gap-4 mt-[40px] pl-[40px] pr-[40px]">
      {products.map((product) => (
        <button onClick={() => handleViewMoreClick(product.id)}><div key={product.id} className="bg-[#C2D7EB] p-4 rounded shadow-md text-center flex flex-col justify-center items-center transition-transform hover:scale-105">

          <img src={product.imageUrl} alt={product.productName} className="h-[200px] w-[200px] rounded mb-5" />

          <hr /> <h2 className="text-lg font-semibold mb-2">Name: {product.productName}</h2>
          <p className="font-semibold mb-2">Price: {product.price}</p>
          <p className="font-semibold mb-4">Availability: {product.availability}</p>

          {/* Buttons
          <div className="flex justify-between">

            <button
              onClick={() => handleViewMoreClick(product.id)}
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
            </button> */}
          {/* </div> */}
        </div>
        </button>
      ))}
    </div>
  );
};

export default ProductGrid;
