import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products }) => {

  const navigate = useNavigate();


  const handleViewMoreClick = (productId) => {
    // Navigate to the product details page with the product ID
    navigate(`/productDetails/${productId}`);
  };


  return (
    <div className="grid grid-cols-7 gap-4 mt-[40px] pl-[40px] pr-[40px]">
      {products.map((product) => (
        <button onClick={() => handleViewMoreClick(product.id)}><div key={product.id} className="bg-[#C2D7EB] p-4 rounded shadow-md text-center flex flex-col justify-center items-center transition-transform hover:scale-105">

          <img src={product.imageUrl} alt={product.productName} className="h-[150px] w-[150px] rounded mb-5 " />

           <h2 className="text-lg text-blue-500 mb-2">{product.productName}</h2>
          <p className=" mb-2">Ksh {product.price}</p>



        </div>
        </button>
      ))}
    </div>
  );
};

export default ProductGrid;
