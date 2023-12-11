import React, { useState, useEffect } from 'react';
import Nav from './NavBar'
import ProductGrid from '../../components/ProductGrid'

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


  return (
   
    <div>
       <Nav/>
       <ProductGrid products={products} />
    </div>
  )
}

export default Home
