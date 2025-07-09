import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Dashboard from '../components/Dashboard';
import Products from '../components/Products';
import Design from '../components/Design';
import Orders from '../components/Orders';
import Favourites from '../components/Favourites';
import Cart from '../components/Cart';
import EditorPage from '../pages/EditorPage';
import CartItems from '../components/CartItems';
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState("dashboard");
  const [products,setProducts]=useState([
     {
      id: 1,
      name: "Midnight Velvet Sofa",
      price: 1299.99,
      category: "Furniture",
      image: "luxury_sofa",
      rating: 4.8,
      isFavorite: true,
      color: "bg-purple-900",
      inCart: false,
      state: "Add to cart"
    },
    {
      id: 2,
      name: "Onyx Hexagon Tiles",
      price: 12.99,
      category: "Tiles",
      image: "hex_tiles",
      rating: 4.6,
      isFavorite: false,
      color: "bg-gray-800",
      inCart: false,
      state: "Add to cart"
    },
    {
      id: 3,
      name: "Neon Pendant Light",
      price: 249.99,
      category: "Lighting",
      image: "pendant_light",
      rating: 4.9,
      isFavorite: true,
      color: "bg-pink-900",
      inCart: false,
      state: "Add to cart"
    },
    {
      id: 4,
      name: "Ebony Wood Dining Table",
      price: 899.99,
      category: "Furniture",
      image: "dining_table",
      rating: 4.7,
      isFavorite: false,
      color: "bg-gray-900",
      inCart: false,
      state: "Add to cart"
    },
    {
      id: 5,
      name: "Gold Marble Wall Tiles",
      price: 18.99,
      category: "Tiles",
      image: "gold_tiles",
      rating: 4.5,
      isFavorite: true,
      color: "bg-amber-900",
      inCart: false,
      state: "Add to cart"
    },
    {
      id: 6,
      name: "Cyberpunk Wall Art",
      price: 149.99,
      category: "Decor",
      image: "wall_art",
      rating: 4.3,
      isFavorite: false,
      color: "bg-blue-900",
      inCart: false,
      state: "Add to cart"
    },
  ]);
  const toggleSidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideBar 
        isSidebarOpen={isSidebarOpen} 
        active={active}
        setActive={setActive}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="w-full">
        <div className="">
          <Routes>
            <Route path='/home'  element={<Dashboard />} />
            <Route path='/products'  element={<Products  products={products} setProducts={setProducts} />} />
            <Route path='/design'  element={<Design />} />
            <Route path='/orders'  element={<Orders />} />
            <Route path='/favourites'  element={<Favourites products={products} setProducts={setProducts} />} />
            <Route path='/cart'  element={<Cart />} />
            <Route path='/editor'  element={<EditorPage />} />
            <Route path='/cartItems' element={<CartItems products={products} setProducts={setProducts}/>}/>
            <Route path='*'  element={<Navigate to="/dashboard/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;