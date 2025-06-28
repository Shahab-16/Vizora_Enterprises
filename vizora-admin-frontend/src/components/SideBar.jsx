import React, { useState } from "react";
import { FaCouch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaThLarge } from 'react-icons/fa';
import {
  long_logo,
  dashboard,
  dashboard_active,
  products_active,
  products,
  design_active,
  design,
} from "../../public/assets/icons";

const SideBar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const [isDropDownMenuProduct, setDropDownMenuProduct] = useState(false);

  const handleDropDownProduct = () => {
    setDropDownMenuProduct(!isDropDownMenuProduct);
  };

  return (
    <div className="h-screen p-10 text-sm sticky top-0  text-white">
      {long_logo}

      <div className="grid text-[#664772] font-poppins font-medium mt-14 space-y-4">

        {/* Dashboard */}
        <div className="flex  items-center hover:cursor-pointer text-white">
          <MdDashboard size={24} className="ml-3" />
          <p onClick={() => navigate("/admin/dashboard")} className="mx-3 text-lg font-medium  text-white">Dashboard</p>
        </div>
        {/* Products Dropdown */}
        <div className="w-[100%]">
          <div
            onClick={handleDropDownProduct}
            className="flex justify-between text-white hover:text-blue-900 items-center w-full hover:bg-gray-200 p-3 rounded-md cursor-pointer shadow-sm transition-all duration-300"
          >
            <div className="flex items-center">
              <FaCouch size={24} className=" " />
              <p className="ml-3 text-lg font-medium">Products</p>
            </div>
            <div>
              {isDropDownMenuProduct ? (
                <FiChevronUp className="text-black" />
              ) : (
                <FiChevronDown className="text-black" />
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropDownMenuProduct && (
            <div className="mt-2 ml-6 flex flex-col gap-2 text-gray-700">


              <NavLink to="/admin/list-product" className=" text-white hover:bg-gray-100 hover:text-blue-900 px-4 py-2 rounded-md cursor-pointer">
                List Product
              </NavLink>
              <NavLink to="/admin/add-product" className=" text-white hover:text-blue-900 hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer">
                Add Product
              </NavLink>
            </div>
          )}
        </div>

        {/* Other /Buttons */}
        {/* <button
          className={`flex px-4 py-1.5 rounded-lg items-center ${active === "product"
            ? "bg-primary-purple text-white"
            : "hover:bg-[#F4FBFF]"
            }`}
          onClick={() => setActive("product")}
        >
          {active === "product" ? products_active : products}
          <p className="mx-3">Products</p>
        </button> */}

        <button
          className={`flex px-4 py-1.5 rounded-lg items-center text-white hover:text-blue-900 ${active === "design"
            ? "bg-primary-purple text-white"
            : "hover:bg-[#F4FBFF]"
            }`}
          onClick={() => setActive("design")}
        >
          <div className="flex justify-center items-center ">
            <FaThLarge size={24} className="" />
            {/* {active === "design" ? design_active : design} */}
            <p className="mx-3">Design</p>

          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
