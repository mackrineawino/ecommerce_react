import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './NavBar';
import Footer from "./Footer"
import { TbTruckDelivery } from "react-icons/tb";
import { GiCardPickup } from "react-icons/gi";
import { GiReturnArrow } from "react-icons/gi";


const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [successStatus, setSuccessStatus] = useState({});
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
          <div className=" mt-8 flex ml-[40px] bg-[#C2D7EB] rounded mr-[40px] w-[60%] ">

            {/* Image on the left */}
            {productDetails.imageUrl && (
              <img src={productDetails.imageUrl} alt={productDetails.productName} className="w-[400px] h-[400px] rounded p-[30px] mt-[30px]" />
            )}

            {/* Product details on the right */}
            <div id="product-details" className="ml-[40px] mt-[20px] bg-gray-100 w-[400px] mr-[20px] mb-[20px] pl-[10px]">
              <h2 className="text-2xl mb-4">{productDetails.productName}</h2><hr style={{ width: '85%' }} /><br></br>
              <p className="text-gray-600 mb-4">{productDetails.productDescription}</p><hr style={{ width: '85%' }} /><br></br>

              <p className="text-lg font-bold ">Ksh {productDetails.price}</p><br></br>

              {cartErrorMessage && (
                <p className="text-red-500">{cartErrorMessage}</p>
              )}
              <button
                id="add-to-cart-btn"
                onClick={addToCart}
                className={`bg-[var(--primary-pink)] text-white p-2 rounded mb-[20px] mt-[50px] w-[85%] hover:bg-[var(--primary-blue)] ${successStatus[productDetails.id] ? 'bg-blue-500' : ''}`}
              >
                {successStatus[productDetails.id] ? 'Added ✔' : 'Add to Cart'}
              </button>
            </div>
          </div>
          <div className='bg-[#C2D7EB] w-[428px] m mt-8 rounded flex flex-col justify-center items-center ' >
            <h1 className='text-[20px]'>Delivery Details</h1><hr/>
            
            <div className='flex flex-col items-center  mt-[20px]  '>
            <TbTruckDelivery className="mr-[10px] text-[40px] text-gray-800 text-pink-500"/>
            <p className='text-blue-500 text-[20px]'>Door Delivery</p>
             <p> Delivery KSh 129 (free delivery if order above KSh 1,999)
              </p>
            </div>
            <div className='flex flex-col items-center  mt-[20px]'>
            <GiCardPickup className='mr-[10px] text-[50px] text-gray-800 text-pink-500'/>

            <p className='text-blue-500 text-[20px]'>Pickup Station Details</p>
              <p>
              Delivery KSh 69 (free delivery if order above KSh 1,999)</p>
            </div>
            <div className='flex flex-col items-center mt-[20px]'>
            <GiReturnArrow className='mr-[10px] text-[30px] text-gray-800 text-pink-500 '/>
            <p className='text-blue-500 text-[20px]'>Return Policy</p>
             <p> Easy Return, Quick Refund.Details</p>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-white'>Loading product details...</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
