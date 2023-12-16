import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNav from "./AdminNavBar";
import { FaProductHunt } from "react-icons/fa6";
import GenericTable from "../../components/GenericTable";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const token = "Bearer " + localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ecommerce/rest/products/list', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json(); // Parse JSON here
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, [token]);
  

  const columns = ["id", "imageUrl", "productName", "price", "availability", "productDescription", "category"];

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/ecommerce/rest/products/delete/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== itemId));
      console.log(`Item with id ${itemId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="h-screen">
      <AdminNav>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div><FaProductHunt className="text-blue-500 text-[90px]" /></div>
            <p className="text-pink-500 text-2xl mt-[30px]">No Products Available At The Moment.</p>
            <div className="mb-20 mt-[30px]">
              <Link
                to="/addproducts"
                className="block py-2 px-6 text-white bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-pink-500"
              >
                ADD PRODUCTS
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="sticky top-0 z-50 bg-blue-500 p-4 shadow-md mb-5 hover:bg-pink-500 rounded">
              <Link to="/addproducts" className="text-white   ">
                ADD PRODUCT
              </Link>
            </div>
            <h2 className="mb-5 text-[30px]">Items Table</h2>
            <GenericTable data={products} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )}
      </AdminNav>
    </div>
  );
};

export default ViewProducts;
