import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import EditorPage from "./pages/EditorPage";
import Alert from "./components/Alert";
import { useState } from "react";
import UserState from "./context/UserState";
import ShopState from "./context/ShopState";
import EditorState from "./context/EditorState";
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
                <Route path="/landingpage" element={<LandingPage />} />
                <Route path="/editor" element={<EditorPage />} />
              </Routes>
            </GoogleOAuthProvider>
          </ShopState>
        </UserState>
      </EditorState>
    </Router>
  );
}

export default App;
