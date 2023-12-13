import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './NavBar';

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [successStatus, setSuccessStatus] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/ecommerce/rest/products/list/${id}`);
        const data = await response.json();
        console.log('Product Details:', data);

        // Assuming the API returns an array of products
        if (Array.isArray(data) && data.length > 0) {
          setProductDetails(data[0]); // Use the first product in the array
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = () => {
    // Check if productDetails is not null before trying to add to cart
    if (productDetails) {
      // Construct the data object with required fields
      const data = {
        id: productDetails.id,
        imageUrl: productDetails.imageUrl,
        productName: productDetails.productName,
        category: productDetails.category,
        price: productDetails.price,
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
          setSuccessStatus((prevStatus) => ({ ...prevStatus, [productDetails.id]: true }));
          // Clear the success status after a delay (e.g., 3 seconds)
          setTimeout(() => setSuccessStatus((prevStatus) => ({ ...prevStatus, [productDetails.id]: false })), 3000);
        })
        .catch((error) => {
          console.error('Error adding item to cart:', error);
        });
    }
  };

  return (
    <div>
      <Nav />

      {productDetails ? (
        <div className='flex'>
          <div className=" mt-8 flex ml-[40px] bg-white rounded mr-[40px] w-[60%] ">
            {/* Image on the left */}
            {productDetails.imageUrl && (
              <img src={productDetails.imageUrl} alt={productDetails.productName} className="w-[400px] h-[400px] rounded p-[20px]" />
            )}

            {/* Product details on the right */}
            <div className="ml-[40px] mt-[60px] bg-white w-[400px] h-[">
              <h2 className="text-2xl mb-4">{productDetails.productName}</h2><hr style={{ width: '85%' }} /><br></br>
              <p className="text-gray-600 mb-4">{productDetails.productDescription}</p><hr style={{ width: '85%' }} /><br></br>

              <p className="text-lg font-bold ">Ksh {productDetails.price}</p><br></br>
              <p className="text-gray-600">Availability: {productDetails.availability} in stock</p>

              <button
                onClick={addToCart}
                className={`bg-[var(--primary-pink)] text-white p-2 rounded mt-[65px] w-[85%] hover:bg-[var(--primary-blue)] ${successStatus[productDetails.id] ? 'bg-blue-500' : ''}`}
              >
                {successStatus[productDetails.id] ? 'Added ✔' : 'Add to Cart'}
              </button>
            </div>
          </div>
          <div className='bg-white w-[428px] m mt-8 rounded'>
            <h1>Right</h1>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

    </div>
  );
};

export default ProductDetails;
