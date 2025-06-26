import React, { useState, useEffect, useContext } from "react";
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

const SideBar = ({ active, setActive, viewSideBar, toggleSidebar }) => {
  const { logout } = useContext(UserContext);
  const [viewSidebarButton, setViewSidebarButton] = useState(false);


  return (
    <>
      <div
        onMouseEnter={() => setViewSidebarButton(true)}
        onMouseLeave={() => setViewSidebarButton(false)}
        className={`relative hidden xl:block ${
          viewSideBar ? "min-w-72" : "min-w-24 max-w-24"
        } transition-all duration-200 bg-[#DFE7EB]`}
      >
        <div
          className={`h-[100vh] ${
            viewSideBar ? "px-8" : "px-5"
          } py-6 text-sm sticky top-0`}
        >
          <div className="w-44 flex">{viewSideBar ? long_logo : logo}</div>
          <div className="grid grid-col-1 text-[#664772] font-poppins font-medium mt-10 space-y-6">
            <button
              className={`flex px-4 py-1 rounded-lg items-center ${
                active === "dashboard"
                  ? "bg-primary-purple text-white"
                  : "hover:bg-[#F4FBFF]"
              }`}
              onClick={() => setActive("dashboard")}
            >
              {active === "dashboard" ? dashboard_active : dashboard}{" "}
              {viewSideBar && <p className="mx-3">Dashboard</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center ${
                active === "design"
                  ? "bg-primary-purple text-white"
                  : "hover:bg-[#F4FBFF]"
              }`}
              onClick={() => setActive("design")}
            >
              {active === "design" ? design_active : design}{" "}
              {viewSideBar && <p className="mx-3">Design</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center ${
                active === "products"
                  ? "bg-primary-purple text-white"
                  : "hover:bg-[#F4FBFF]"
              }`}
              onClick={() => setActive("products")}
            >
              {active === "products" ? products_active : products}{" "}
              {viewSideBar && <p className="mx-3">Products</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center ${
                active === "orders"
                  ? "bg-primary-purple text-white"
                  : "hover:bg-[#F4FBFF]"
              }`}
              onClick={() => setActive("orders")}
            >
              {active === "orders" ? order_active : order}{" "}
              {viewSideBar && <p className="mx-3">My Orders</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center ${
                active === "favourites"
                  ? "bg-primary-purple text-white"
                  : "hover:bg-[#F4FBFF]"
              }`}
              onClick={() => setActive("favourites")}
            >
              {active === "favourites" ? favourites : unfavourites}{" "}
              {viewSideBar && <p className="mx-3">Favourites</p>}
            </button>
          </div>
        </div>
        <button
          hidden={!viewSidebarButton}
          onClick={(e) => {
            console.log(viewSideBar);
            toggleSidebar(e);
          }}
          className="absolute top-0 -right-9 text-3xl border-2 px-2 text-primary-black bg-light-gray"
        >
          {viewSideBar ? "<" : ">"}
        </button>
      </div>
      <div
        className={`${
          viewSideBar ? "w-64 lg:w-96 px-3 py-4" : "w-0"
        } transform-all duration-200 hamburger-menu fixed top-0 z-10 right-0 block xl:hidden bg-white `}
      >
        <div className="relative">
          <button
            hidden={!viewSideBar}
            className="absolute top-0 right-4 text-2xl"
            onClick={(e) => {
              console.log(viewSideBar);
              toggleSidebar(e);
            }}
          >
            x
          </button>
          <div className="text-[#664772] font-poppins font-medium pt-20 space-y-6">
          <button
              className={`flex px-4 py-1 rounded-lg items-center w-full`}
              onClick={() => setActive("dashboard")}
            >
              {user_black}
              {viewSideBar && <p className="mx-3">Profile</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center w-full`}
              onClick={() => setActive("dashboard")}
            >
              {dashboard_black}
              {viewSideBar && <p className="mx-3">Dashboard</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center w-full`}
              onClick={() => setActive("products")}
            >
              {sofa_black}
              {viewSideBar && <p className="mx-3">Products</p>}
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center w-full`}
              onClick={() => setActive("design")}
            >
              {design_black} <p className="mx-3">Design</p>
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center w-full`}
              onClick={() => setActive("orders")}
            >
              {order_black} <p className="mx-3">My Orders</p>
            </button>
            <button
              className={`flex px-4 py-1 rounded-lg items-center w-full`}
              onClick={() => logout()}
            >
              {logout_black} <p className="mx-3">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
