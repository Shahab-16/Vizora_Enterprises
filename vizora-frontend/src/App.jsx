import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import EditorPage from "./pages/EditorPage";
import Alert from "./components/Alert";
import { useState } from "react";
import UserState from "./context/UserState";
import ShopState from "./context/ShopState";
import EditorState from "./context/EditorState";
import DashboardLayout from "./pages/Dashboard";
import Sidebar from "./components/SideBar";
import { Navbar } from "@material-tailwind/react";
import AdminLogin from "./components/Auth/AdminLogin";
import UserLogin from "./components/Auth/UserLogin";
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
      <EditorState showAlert={showAlert}>
        <UserState showAlert={showAlert}>
          <ShopState showAlert={showAlert}>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <Alert alert={alert} closeAlert={closeAlert} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/editor" element={<EditorPage />} />
                <Route path="/dashboard/*" element={<DashboardLayout/>} />
                <Route path="/login/user" element={<UserLogin/>}/>
                <Route path="/login/admin" element={<AdminLogin/>}/>
              </Routes>
            </GoogleOAuthProvider>
          </ShopState>
        </UserState>
      </EditorState>
    </Router>
  );
}

export default App;
