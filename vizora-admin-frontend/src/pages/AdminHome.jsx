import React, { useState, useEffect, useContext } from "react";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import Product from "../components/Product";
import Design from "../components/Design";
import AdminContext from "../contexts/adminContext";

const AdminHome = () => {
  const { fetchData, user } = useContext(AdminContext);

  useEffect(() => {
    console.log("USER", user);
    if (user) {
      fetchData();
    }
  }, []);

  const [active, setActive] = useState("dashboard");

  return (
    <div className="grid grid-cols-5">
      {/* <div className="col-span-1 bg-black">
        <SideBar active={active} setActive={setActive} />
      </div> */}

      <div className="col-span-4 py-10 px-14 c">
        {active === "dashboard" && <Dashboard />}
        {active === "product" && <Product />}
        {active === "design" && <Design />}
      </div>
    </div>
  );
};

export default AdminHome;
