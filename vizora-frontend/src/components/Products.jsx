import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { images } from "../assets/asset";

import {
  favourites,
  unfavourites,
  next_btn,
  prev_btn,
  back,
  purple_cart,
} from "../assets/icons";
import { cld } from "../util/cloudinaryConfig";
import pendant from "../assets/images/pendant.webp"
import { AdvancedImage } from "@cloudinary/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";
import UserContext from "../context/userContext";

const Products = ({ products, setProducts }) => {
  const { logout } = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Furniture", "Tiles", "Lighting", "Decor", "Kitchen", "Bath"];
  const navigate = useNavigate();
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const addToCartHandler = (id) => {
    const updatedProducts = products.map((prod) =>
      prod.id === id ? { ...prod, inCart: !prod.inCart } : prod
    );
    setProducts(updatedProducts);
    console.log("updated", updatedProducts);
  }
  const isFavoriteHandler = (id) => {
    console.log("product id", id);
    const updatedProducts = products.map((prod) =>
      prod.id === id ? { ...prod, isFavorite: !prod.isFavorite } : prod);
    setProducts(updatedProducts);
    console.log(updatedProducts);
  }

  const toggleFavorite = (productId) => {
    console.log(`Toggled favorite for product ${productId}`);
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 bg-gray-900 text-gray-100 p-4 md:p-8">
      {/* Hero Banner with Glow Effect */}

      <div className="relative md:h-96 rounded-2xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-purple-600 blur-[100px] opacity-20 group-hover:opacity-30 transition">
          </div>
        </div>
        <img className="w-[300px] z-10  absolute right-[6%] rounded-xl flex items-center  " src={images.house_login} alt="" />

        <div className="relative h-full flex flex-col md:flex-row items-center justify-between p-8">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Dark Luxury Collection
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              Elevate your space with our premium dark-themed furniture and decor that blends elegance with edge.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/20">
              Explore Now
            </button>
          </div>
          {/* <div className="hidden md:block relative">
            <div className="w-64 h-64 rounded-full bg-black/30 border border-purple-500/20 backdrop-blur-sm"></div>
          </div> */}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Curated Selection</h2>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search your collections..."
              className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter - Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium ${activeCategory === category
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                } transition-all`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-700 hover:border-purple-500/30 relative group`}
          >
            {/* Product Image Placeholder with Color Accent */}
            <div className={`h-60 ${product.color} flex items-center justify-center relative overflow-hidden`}>
              <img src={pendant} alt="" />
              {/* Favorite Button */}
              <button
                className="absolute top-3 right-3 p-2 bg-gray-900/80 rounded-full backdrop-blur-sm hover:bg-purple-600/80 transition z-10"
                onClick={() => toggleFavorite(product.id)}
              >
                <img
                  src={product.isFavorite ? unfavourites : favourites}
                  alt="Favorite"
                  className="w-5 h-5"
                />
              </button>

              {/* Rating Badge */}
              <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {product.rating}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-lg text-white">{product.name}</h3>
                <span className="text-xs uppercase text-gray-400">{product.category}</span>
              </div>

              <button onClick={() => isFavoriteHandler(product.id)} className="p-2">
                {product.isFavorite ? <FaHeart className="text-red-600" /> : <FaHeart className="text-white" />}

              </button>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                  ${product.price.toFixed(2)}
                </span>

                <button onClick={() => addToCartHandler(product.id)} className=" flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2.5 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-purple-500/30">
                  <p className="p-1">
                    {product.inCart ? "Remove from Cart" : "Add to Cart"}
                  </p>
                </button>


              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-md opacity-20"></div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-4 mb-4 rounded-full bg-gray-800/50 border border-gray-700">
            <svg className="w-12 h-12 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300">No products found</h3>
          <p className="text-gray-500">Try different search or filter combinations</p>
        </div>
      )}
    </div>
  );
};

export default Products;