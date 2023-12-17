import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './NavBar';

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [successStatus, setSuccessStatus] = useState({});
  const [availability, setAvailability] = useState(0);
  const [cartErrorMessage, setCartErrorMessage] = useState('');

  const token = "Bearer " + localStorage.getItem('token');
  console.log('Authorization token:', token);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await fetch(`/ecommerce/rest/products/list/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });
        const productData = await productResponse.json();
        console.log('Product Details:', productData);

        if (Array.isArray(productData) && productData.length > 0) {
          setProductDetails(productData[0]);

          // Fetch cart items to calculate availability
          const cartResponse = await fetch('/ecommerce/rest/cartItems/list', {
            method: 'GET',
            headers: {
              'Authorization': token,
            },
          });
          const cartData = await cartResponse.json();
          setCartItems(cartData);

          // Calculate availability
          const cartItem = cartData.find(item => item.id === productData[0].id);
          setAvailability(cartItem ? productData[0].availability - cartItem.quantity : productData[0].availability);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id, token]);


  const addToCart = () => {
    if (productDetails) {
      // Check if the product is already in the cart based on productid
      const cartItem = cartItems.find(item => item.productid === productDetails.id);

      // Update availability based on the quantity in the cart
      const updatedAvailability = cartItem ? productDetails.availability - cartItem.quantity : productDetails.availability;
      setAvailability(updatedAvailability);

      // Check if the product is already in the cart
      if (cartItem) {
        setCartErrorMessage('Product is already in the cart.');
      } else if (cartItem && cartItem.quantity >= productDetails.availability) {
        setCartErrorMessage('Product is already in the cart and not available.');
      } else {
        // Clear any previous error messages
        setCartErrorMessage('');

        // Add the product to the cart
        fetch('/ecommerce/rest/cartItems/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({
            id: productDetails.id,
            imageUrl: productDetails.imageUrl,
            productName: productDetails.productName,
            category: productDetails.category,
            productid: productDetails.id,
            price: productDetails.price,
            order: null,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response as needed
            console.log('Item added to cart:', data);
            // Update the success status and reset after a delay
            setSuccessStatus((prevStatus) => ({ ...prevStatus, [productDetails.id]: true }));
            setTimeout(() => setSuccessStatus((prevStatus) => ({ ...prevStatus, [productDetails.id]: false })), 3000);
          })
          .catch((error) => {
            console.error('Error adding item to cart:', error);
          });
      }
    }
  };

  return (
    <div>
      <Nav />

      {productDetails ? (
        <div className='flex'>
          <div className=" mt-8 flex ml-[40px] bg-gray-100 rounded mr-[40px] w-[60%] ">
          
            {/* Image on the left */}
            {productDetails.imageUrl && (
              <img src={productDetails.imageUrl} alt={productDetails.productName} className="w-[400px] h-[400px] rounded p-[20px]" />
            )}

            {/* Product details on the right */}
            <div className="ml-[40px] mt-[60px] bbg-gray-100 w-[400px] h-[">
              <h2 className="text-2xl mb-4">{productDetails.productName}</h2><hr style={{ width: '85%' }} /><br></br>
              <p className="text-gray-600 mb-4">{productDetails.productDescription}</p><hr style={{ width: '85%' }} /><br></br>

              <p className="text-lg font-bold ">Ksh {productDetails.price}</p><br></br>
              <p className="text-gray-600">Availability: {availability} in stock</p>

              {cartErrorMessage && (
                <p className="text-red-500">{cartErrorMessage}</p>
              )}

              <button
                onClick={addToCart}
                className={`bg-[var(--primary-pink)] text-white p-2 rounded mt-[65px] w-[85%] hover:bg-[var(--primary-blue)] ${successStatus[productDetails.id] ? 'bg-blue-500' : ''}`}
              >
                {successStatus[productDetails.id] ? 'Added ✔' : 'Add to Cart'}
              </button>
            </div>
          </div>
          <div className='bg-gray-100 w-[428px] m mt-8 rounded'>
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
