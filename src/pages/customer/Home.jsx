import React, { useState, useEffect } from 'react';
import Nav from './NavBar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductGrid from '../../components/ProductGrid';
import { GiBoots } from "react-icons/gi";
import { MdOutlineLiveHelp } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { PiSneakerFill } from "react-icons/pi";
import { GiBallerinaShoes } from "react-icons/gi";
import { GiHighHeel } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import Footer from "./Footer"





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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  };
  const sliderDetails = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
  };

  return (
    <div>
      <Nav />
      <div className='flex justify-between mt-[20px]'>
        <div className='bg-[#C2D7EB] ml-[40px] h-[315px] rounded w-[200px] flex flex-col justify-center text-left pl-[30px]'>
          <h1 className='text-[25px] text-gray-800'>CATEGORIES</h1>
          <a href='https://hub.docker.com/' className='flex items-center ml-2 mt-[30px] text-[20px]'>
            <GiBoots
              className='text-[30px] mr-[10px] text-gray-800' />
            <p className='text-[var(--primary-pink)] font-bold'>Boots</p>
          </a>
          <a href='https://hub.docker.com/' className='flex items-center ml-2 mt-[10px] text-[20px]'>
            <PiSneakerFill className='text-[30px] mr-[10px] text-gray-800' />
            <p className='text-[var(--primary-pink)] font-bold'>Sneakers</p>
          </a>
          <a href='https://hub.docker.com/' className='flex items-center ml-2 mt-[10px] text-[20px]'>
            <GiBallerinaShoes className='text-[30px] mr-[10px] text-gray-800' />
            <p className='text-[var(--primary-pink)] font-bold'>Dolls</p>
          </a>
          <a href='https://hub.docker.com/' className='flex items-center ml-2 mt-[10px] text-[20px]'>
            <GiHighHeel className='text-[30px] mr-[10px] text-gray-800' />
            <p className='text-[var(--primary-pink)] font-bold'>Stilettos</p>
          </a>
        </div>

        <div className="bg-gray-100 rounded-md  w-[62%] h-[315px] mx-[10px]">
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
        
       
        <div className='bg-[#C2D7EB] mr-[40px] h-[315px] rounded w-[200px] flex flex-col justify-center pl-[20px] ' >
          <a href='' className='flex mb-[40px]'> <MdOutlineLiveHelp className='mr-[10px] text-[30px] text-gray-800' /><p className='text-[var(--primary-pink)] font-bold'>HELP CENTER</p></a> 
         <a href='' className='flex mb-[40px]'><GiReturnArrow className='mr-[10px] text-[30px] text-gray-800'/><p className='text-[var(--primary-pink)] font-bold'>EASY RETURN</p></a> 
          <a href='' className='flex mb-[40px]'><GiTakeMyMoney className='mr-[10px] text-[30px]  text-gray-800'/>
<p className='text-[var(--primary-pink)] font-bold'>SELL WITH US</p></a> 
        </div>
      </div>
      <p className="text-white  text-center text-[30px] mt-[30px]">With CoolStuff, You Step Out with Confidence!</p>
      <div className="bg-gray-100 rounded-md  w-[90%] h-[200px] mx-auto mt-[20px]">
          <Slider {...sliderDetails}>
            <div>
              <img
                src="https://i.ebayimg.com/thumbs/images/g/XmMAAOSwB9dkWequ/s-l500.jpg"
                alt="Slider1"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://cdn.walletmonitor.com/img/4301d6e0d25d0c74327fbc7af4ce45ec.jpg"
                alt="Slider1"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://backyardshoez.co.ke/wp-content/uploads/2023/03/DSC_2226.jpg"
                alt="Slider1"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://backyardshoez.co.ke/wp-content/uploads/2023/03/DSC_2305.jpg"
                alt="Slider1"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://backyardshoez.co.ke/wp-content/uploads/2023/03/DSC_4686-scaled.jpg"
                alt="Slider1"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://static-01.daraz.com.bd/p/81922308e0ba3814358e8f7b2b405738.jpg_750x750.jpg_.webp"
                alt="Slider2"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/52897f902562f039849a63b1dd9102e9.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
                alt="Slider2"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://i.ebayimg.com/thumbs/images/g/x6wAAOSw0ctiGePc/s-l96.jpg"
                alt="Slider2"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://i.insider.com/55a966f3371d22c6178b62ed?width=700"
                alt="Slider2"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://i.ebayimg.com/images/g/h8QAAOSwj5JgVZ5-/s-l960.png"
                alt="Slider2"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            <div>
              <img
                src="https://cdn.walletmonitor.com/img/e1f18aedc8d01b2f0c5bbc170475e2d2.jpg"
                alt="Slider2"
                className=" object-cover rounded-md h-[200px] mx-auto"
              />
            </div>
            {/* Add more slider items as needed */}
          </Slider>
        </div>
        
<p className="text-white  text-center text-[30px] mt-[30px]">SHOP NOW</p>

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
      <Footer/>
    </div>
  );
};

export default Home;
