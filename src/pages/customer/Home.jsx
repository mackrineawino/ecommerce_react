import React, { useState, useEffect } from 'react';
import Nav from './NavBar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductGrid from '../../components/ProductGrid';
import { FaProductHunt } from 'react-icons/fa6';

const Home = () => {
  const [products, setProducts] = useState([]);
  const token = 'Bearer ' + localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ecommerce/rest/products/list', {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        console.log('Data fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

    return () => {
      console.log('Cleaning up effect');
    };
  }, [token]);

  const addToCart = (product) => {
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
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item added to cart:', data);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 2000, 
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false, 
  };

  return (
    <div>
      <Nav />
      <div className='flex justify-between mt-[20px]'>
      <div className='bg-gray-100 ml-[40px] h-[315px] rounded w-[300px]'>
<h1>herseeee</h1>
</div>
      <div className="bg-gray-100 rounded-md   w-[50%] h-[315px]  ml-[30px] mr-[30px]">
        <Slider {...sliderSettings}>
          <div>
            <img
              src="https://taifaonline.com/storage/files/ke/5360/thumb-816x460-c48f75b9ffbc3e82ebd9bb0f80b282fb.jpg"
              alt="Slider1"
              className=" object-cover rounded-md h-[300px] mx-auto"
            />
          </div>
          <div>
            <img
              src="https://images.meesho.com/images/products/224713294/stz9u_512.webp"
              alt="Slider1"
              className=" object-cover rounded-md h-[300px] mx-auto"
            />
          </div>
          <div>
            <img
              src="https://images.yaoota.com/0tP0BoG0keW0zRkc1Rn_rkMwkXY=/trim/fit-in/500x500/filters:quality(80)/yaootaweb-production-ke/media/crawledproductimages/48c3717317c07697fb33b2545aac45f485435645.jpg"
              alt="Slider1"
              className=" object-cover rounded-md h-[300px] mx-auto"
            />
          </div>
          <div>
            <img
              src="https://images.yaoota.com/Cv5uCbo3QldJ3qLl4YY_x_3jd3w=/trim/fit-in/500x500/filters:quality(80)/yaootaweb-production-ke/media/crawledproductimages/cab67f7c060b324dcb8aad3afbea63e880878f32.jpg"
              alt="Slider1"
              className=" object-cover rounded-md h-[300px] mx-auto"
            />
          </div>
          <div>
            <img
              src="https://down-ph.img.susercontent.com/file/e1ca39519c1163a380a4b5bd0821eb05"
              alt="Slider1"
              className=" object-cover rounded-md h-[300px] mx-auto"
            />
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Mf2eBk3jy40HlKIo17fdOxImjUolht9gLA&usqp=CAU"
              alt="Slider2"
              className=" object-cover rounded-md h-[300px] mx-auto"
            />
          </div>
          {/* Add more slider items as needed */}
        </Slider>
      </div>
      <div className='bg-gray-100 mr-[40px] h-[315px] rounded w-[300px]'>
<h1>herseeee</h1>
</div>
      </div>
     
     
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div>
            <FaProductHunt className="text-blue-500 text-[90px]" />
          </div>
          <p className="text-pink-500 text-2xl mt-4">
            No Products Available At The Moment.
          </p>
        </div>
      ) : (
        <ProductGrid products={products} addToCart={addToCart} />
      )}
    </div>
  );
};

export default Home;
