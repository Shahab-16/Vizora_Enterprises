import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vizoraLogo from "../assets/images/vizoraLogo.png";
import {
  long_logo,
  dashboard,
  design,
  products,
  order,
  unfavourites,
  logout_black,
} from "../assets/icons";
import UserContext from "../context/userContext";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const SideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`transition-all duration-300 bg-white text-black h-screen flex flex-col justify-between py-4 ${isSidebarOpen ? "w-[17%]" : "w-16"
        } relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 text-black p-2 rounded"
      >
        {isSidebarOpen ? (
          <BsChevronLeft className="text-2xl" />
        ) : (
          <BsChevronRight className="text-2xl" />
        )}
      </button>

      {/* Top Section */}
      <div className="flex flex-col gap-2 items-center mt-9">
          {/* Logout */}
        <div className="px-2 mt-8 w-full">
          <button
            onClick={logoutHandler}
            className="w-full  py-2 flex items-center justify-center rounded bg-red-500 text-black font-semibold hover:bg-red-700 transition duration-300"
          >
            {logout_black}
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
        {/* Optional logo */}
        {isSidebarOpen && (
          <div className="mb-2 mr-3 px-4 w-full">
            <img className="w-[270px] h-[100px]" src={vizoraLogo} alt="" />
          </div>
        )}

        <nav className="w-full space-y-2 font-poppins font-medium px-2">
          <SidebarButton
            icon={dashboard}
            label="Dashboard"
            isSidebarOpen={isSidebarOpen}
            onClick={() => navigate("/dashboard/home")}
          />
          <SidebarButton
            icon={products}
            label="Products"
            isSidebarOpen={isSidebarOpen}
            onClick={() => navigate("/dashboard/products")}
          />
          <SidebarButton
            icon={design}
            label="Design"
            isSidebarOpen={isSidebarOpen}
            onClick={() => navigate("/dashboard/design")}
          />
          <SidebarButton
            icon={order}
            label="Orders"
            isSidebarOpen={isSidebarOpen}
            onClick={() => navigate("/dashboard/orders")}
          />
          <SidebarButton
            icon={unfavourites}
            label="Favourites"
            isSidebarOpen={isSidebarOpen}
            onClick={() => navigate("/dashboard/favourites")}
          />
          <SidebarButton
            icon={design}
            label="Editor"
            isSidebarOpen={isSidebarOpen}
            onClick={() => navigate("/dashboard/editor")}
          />
        </nav>
      </div>

    </div>
  );
};

const SidebarButton = ({ icon, label, onClick, isSidebarOpen }) => (
  <button
    onClick={onClick}
    className="w-full py-2 flex items-center rounded px-4 transition-colors hover:bg-[#F4FBFF] text-black"
  >
    {icon}
    {isSidebarOpen && <span className="ml-3">{label}</span>}
  </button>
);

export default SideBar;
