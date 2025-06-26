import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Products from "../components/Products";
import Design from "../components/Design";
import Orders from "../components/Orders";
import Favourites from "../components/Favourites";
import { useContext } from "react";
import UserContext from "../context/userContext";
import Cart from "../components/Cart";

const Home = () => {
  const [active, setActive] = useState("products");
  const [viewSideBar, setViewSideBar] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const userContext = useContext(UserContext);
  const { user, logout, getUserData } = userContext;

  useEffect(() => {
    console.log("USER", user);
    if (user) {
      setActive("dashboard");
    } else {
      setActive("products");
    }
  }, [user]);

  useEffect(() => {
    window.innerWidth > 1280 ? setViewSideBar(true) : setViewSideBar(false);
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const toggleSidebar = (event) => {
    event.stopPropagation();
    setViewSideBar(!viewSideBar);
  };

  return (
    <div className="flex">
      {user && (
        <SideBar
          active={active}
          setActive={setActive}
          viewSideBar={viewSideBar}
          toggleSidebar={toggleSidebar}
        />
      )}

      <div className="xl:py-6 xl:px-10 w-full">
        <Navbar
          active={active}
          user={user}
          logout={logout}
          toggleSidebar={toggleSidebar}
          setShowCart={setShowCart}
        />
        {active === "dashboard" && user && <Dashboard />}
        {active === "favourites" && user && <Favourites />}
        {active === "orders" && user && <Orders />}
        {active === "products" && (
          <Products
            category={category}
            setCategory={setCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
          />
        )}
        {active === "design" && <Design />}
        <Cart
          setShowCart={setShowCart}
          showCart={showCart}
          setActive={setActive}
        />
      </div>
    </div>
  );
};

export default Home;
