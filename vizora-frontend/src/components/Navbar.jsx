import React, { useState } from "react";
import {
  logo,
  cart,
  user_logo,
  search,
  mobile_cart,
  mobile_ham,
  mobile_heart,
  mobile_search,
} from "../assets/icons";
import { Link } from "react-router-dom";

const Navbar = ({ active, user, logout, toggleSidebar, setShowCart }) => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [searchText, setSearchText] = useState("");
  const [viewUser, setViewUser] = useState(false);

  return (
    <>
      <div className="mobile-nav flex xl:hidden bg-[#eef1f2] py-3 px-5 justify-between">
        <div>{logo}</div>
        {user ? (
          <div className="content-center space-x-7">
            <button>{mobile_search}</button>
            <button onClick={() => setShowCart(true)}>{mobile_cart}</button>
            <button>{mobile_heart}</button>
            <button onClick={(e) => toggleSidebar(e)}>{mobile_ham}</button>
          </div>
        ) : (
          <Link
            to="/login"
            className="border-2 border-primary-purple text-primary-purple px-3 py-2 rounded-sm text-lg font-medium"
          >
            Login
          </Link>
        )}
      </div>
      <div className="desktop-nav hidden xl:grid grid-cols-12">
        <h1 className="text-primary-black text-2.5xl font-bold col-span-3 flex items-center">
          {capitalize(active)}
        </h1>
        <div className="flex h-10 col-span-5 rounded-md border-2 border-[#D9D9D9] items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-4 w-full outline-none border-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-[#D9D9D9] px-4 rounded-r-md h-10">
            {search}
          </button>
        </div>
        <div
          className="col-span-4 ml-auto"
          style={user !== null ? { display: "none" } : { display: "block" }}
        >
          <Link
            to="/login"
            className="border-2 border-primary-purple text-primary-purple px-3 py-2 rounded-sm text-lg font-medium"
          >
            Login
          </Link>
        </div>

        <div
          className="col-span-4 ml-auto"
          style={user === null ? { display: "none" } : { display: "block" }}
        >
          <button
            onClick={() => {
              setShowCart(true);
            }}
            className="mr-16"
          >
            {cart}
          </button>
          <button
            onClick={() => {
              setViewUser(!viewUser);
            }}
            className="relative"
          >
            {user_logo}
            <div
              onClick={() => logout()}
              hidden={!viewUser}
              className="absolute top-10 right-0 hover:bg-light-gray shadow w-44 rounded-md px-2 py-1 my-2"
            >
              Logout
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
