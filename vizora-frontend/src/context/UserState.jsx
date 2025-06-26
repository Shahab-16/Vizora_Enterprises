import React from "react";
import UserContext from "./userContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "../util/firebase-config";

function UserState(props) {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_HOST;
  const { showAlert } = props;
  const [user, setUser] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [userModels, setUserModels] = useState([]);

  const getUserData = async () => {
    if (user) {
      return user;
    } else {
      const response = await fetch(`${host}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        showAlert("You are Not Logged In", "info");
        return;
      }
      setUser(data.user);
      setLikedProducts(data.user.likedProducts);
      setUserModels(data.user.models);
      showAlert("User Data fetched successfully", "success");
    }
  };

  const login = async (values) => {
    const url = `${host}/login`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log("data post login=> ", data);
    if (data.success) {
      getUserData();
      props.showAlert("LoggedIn successfully", "success");
      navigate("/");
    } else {
      showAlert("Failed to LogIn", "danger");
    }
  };

  const signup = async (values) => {
    const url = `${host}/signin`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.success) {
      getUserData();
      props.showAlert("LoggedIn successfully", "success");
      navigate("/");
    } else {
      showAlert("Failed to SignUp", "danger");
    }
  };

  const googleSignin = async () => {
    console.log("Google Login");
    const provider = new GoogleAuthProvider();
    console.log("provider = ", provider);
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log("User = ", user);
      console.log("HOST = ", host);

      fetch(`${host}/googlesignin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          password: user.uid,
        }),
      }).then((response) => {
        console.log("response => ", response);
        if (response.ok) {
          getUserData();
          showAlert("LoggedIn successfully", "success");
          navigate("/");
        } else {
          showAlert("Failed to SignUp", "danger");
        }
      });
    });
  };

  const logout = async () => {
    console.log("Logout");
    const url = `${host}/logout`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setUser(null);
      showAlert("Logged out Successfully", "info");
    }
  };

  const likeProduct = async (productId, like) => {
    try {
      const response = fetch(host + "/likeproduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, like }),
      });
      const data = (await response).json();
      if (data) {
        if (like) {
          setLikedProducts([...likedProducts, productId]);
        } else {
          setLikedProducts(likedProducts.filter((item) => item !== productId));
        }
      } else {
        showAlert("Failed to Liked", "danger");
      }
    } catch (err) {
      showAlert("Failed to like Product", "danger");
      console.log("Error occured in likeProduct", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        googleSignin,
        getUserData,
        likeProduct,
        likedProducts,
        userModels,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
