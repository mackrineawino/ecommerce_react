import React, { useState, useEffect } from 'react';
import Nav from './NavBar';
import ProductGrid from '../../components/ProductGrid';
import { FaProductHunt } from "react-icons/fa6";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/ecommerce/rest/products/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); 

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
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
        console.log('Item added to cart:', data);
       
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div>
      <Nav />
      {products.length === 0 ? (
        // Display empty order message when there are no orders
        <div className="flex flex-col items-center justify-center h-screen ">
          <div><FaProductHunt  className="text-blue-500 text-[90px]" /></div>
          <p className="text-pink-500 text-2xl mt-[30px]">No Products Available At The Moment.</p>
        </div>
      ) :(
      <ProductGrid products={products} addToCart={addToCart} />
      )}
    </div>
  );
}

export default Home;
