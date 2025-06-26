import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  long_logo,
  dashboard,
  dashboard_active,
  design,
  design_active,
  products,
  products_active,
  order,
  order_active,
  favourites,
  logo,
  unfavourites,
  logout_black,
  sofa_black,
  user_black,
  order_black,
  design_black,
  dashboard_black,
} from "../assets/icons";
import UserContext from "../context/userContext";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const SideBar = () => {
  const { logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex h-full min-h-screen">
      {/* Collapsed Sidebar - Purple Color */}
      <div className={`bg-primary-purple h-screen w-16 flex flex-col items-center gap-2 py-4 relative`}>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white p-2 rounded flex items-center"
        >
          {isOpen ? (
            <BsChevronLeft className="text-2xl" />
          ) : (
            <BsChevronRight className="text-2xl" />
          )}
        </button>

        {/* Profile Icon */}
        <FaUserCircle 
          onClick={() => navigate('/home')} 
          className="text-white text-4xl mt-18 cursor-pointer" 
        />
      </div>

      {/* Expanded Sidebar Content - Light Gray */}
      {isOpen && (
        <div className="absolute left-16 w-64 min-h-screen bg-[#DFE7EB] text-[#664772] flex flex-col justify-between shadow-lg z-10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <div className="w-44">{long_logo}</div>
            </div>

            <div className="space-y-4 font-poppins font-medium">
              <button 
                onClick={() => navigate('/dashboard/home')}
                className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF]"
              >
                {dashboard}
                <span className="ml-3">Dashboard</span>
              </button>

              <button 
                onClick={() => navigate('/dashboard/products')}
                className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF]"
              >
                {products}
                <span className="ml-3">Products</span>
              </button>

              <button 
                onClick={() => navigate('/dashboard/design')}
                className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF]"
              >
                {design}
                <span className="ml-3">Design</span>
              </button>

              <button 
                onClick={() => navigate('/dashboard/orders')}
                className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF]"
              >
                {order}
                <span className="ml-3">Orders</span>
              </button>

              <button 
                onClick={() => navigate('/dashboard/favourites')}
                className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF]"
              >
                {unfavourites}
                <span className="ml-3">Favourites</span>
              </button>

              <button 
                onClick={() => navigate('/dashboard/editor')}
                className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF]"
              >
                {design}
                <span className="ml-3">Editor</span>
              </button>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={logoutHandler}
              className="w-full py-2 flex items-center justify-center rounded bg-red-500 text-white font-semibold hover:bg-red-700 transition duration-300"
            >
              {logout_black}
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu - White Background */}
      <div className={`${
        !isOpen ? "w-64 px-3 py-4" : "w-0"
      } transform-all duration-200 fixed top-0 right-0 block xl:hidden bg-white z-20`}>
        <div className="relative">
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={toggleSidebar}
          >
            ×
          </button>
          <div className="text-[#664772] font-poppins font-medium pt-20 space-y-6">
            <button
              className="flex px-4 py-1 rounded-lg items-center w-full"
              onClick={() => {
                navigate('/dashboard/home');
                toggleSidebar();
              }}
            >
              {user_black}
              <p className="mx-3">Profile</p>
            </button>
            <button
              className="flex px-4 py-1 rounded-lg items-center w-full"
              onClick={() => {
                navigate('/home');
                toggleSidebar();
              }}
            >
              {dashboard_black}
              <p className="mx-3">Dashboard</p>
            </button>
            <button
              className="flex px-4 py-1 rounded-lg items-center w-full"
              onClick={() => {
                navigate('/dashboard/products');
                toggleSidebar();
              }}
            >
              {sofa_black}
              <p className="mx-3">Products</p>
            </button>
            <button
              className="flex px-4 py-1 rounded-lg items-center w-full"
              onClick={() => {
                navigate('/dashboard/design');
                toggleSidebar();
              }}
            >
              {design_black}
              <p className="mx-3">Design</p>
            </button>
            <button
              className="flex px-4 py-1 rounded-lg items-center w-full"
              onClick={() => {
                navigate('/dashboard/orders');
                toggleSidebar();
              }}
            >
              {order_black}
              <p className="mx-3">Orders</p>
            </button>
            <button
              className="flex px-4 py-1 rounded-lg items-center w-full"
              onClick={logoutHandler}
            >
              {logout_black}
              <p className="mx-3">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;