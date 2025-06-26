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

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [active, setActive] = useState("dashboard");
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <SideBar 
        isOpen={isSidebarOpen} 
        active={active}
        setActive={setActive}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="p-6">
          <Routes>
            <Route path='/home'  element={<Dashboard />} />
            <Route path='/products'  element={<Products />} />
            <Route path='/design'  element={<Design />} />
            <Route path='/orders'  element={<Orders />} />
            <Route path='/favourites'  element={<Favourites />} />
            <Route path='/cart'  element={<Cart />} />
            <Route path='/editor'  element={<EditorPage />} />
            <Route path='*'  element={<Navigate to="/dashboard/home" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;