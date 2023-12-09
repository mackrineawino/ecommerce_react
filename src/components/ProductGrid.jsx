import React from 'react';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-5 pl-[40px]">
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
                console.log('Add to Cart clicked');
              }}
              className="bg-[var(--primary-pink)] text-white p-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
