import "./App.css";
import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminHome from "./pages/AdminHome";
import EditorPage from "./pages/EditorPage";
import AdminState from "./contexts/AdminState";
import AddProduct from "./components/AddProduct";
import ListProduct from "./components/ListProduct";
import ProductInfo from "./components/ProductInfo";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <Router>
      <AdminState showAlert={showAlert}>
        <Alert alert={alert} closeAlert={closeAlert} />
      {/* <div className="flex flex-1">
      <SideBar/>
      </div> */}
      <div className=" flex w-full">

      <div className=" flex w-[20%] bg-black">
        <SideBar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="admin/dashboard" element={<Dashboard/>} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="signup" element={<AdminSignup />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="/admin/add-product" element={<AddProduct/>}/>
          <Route path="/admin/list-product" element={<ListProduct/>}/>
          <Route path="/admin/product-info" element={<ProductInfo/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
        </Routes>

      </div>
      </div>
      </AdminState>
    </Router>
  );
}

export default App;
