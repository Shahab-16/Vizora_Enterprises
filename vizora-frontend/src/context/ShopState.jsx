import React, { useContext } from "react";
import ShopContext from "./shopContext";
import { useState } from "react";
import { extractPublicId } from "cloudinary-build-url";
import userContext from "./userContext";

function ShopState(props) {
  const host = import.meta.env.VITE_HOST;
  const { showAlert } = props;
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [productModels, setProductModels] = useState([]);
  const { user } = useContext(userContext);

  // get cart
  const getCart = async () => {
    try {
      const response = await fetch(`${host}/cart`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
        console.log("cart = ", data.data);

        showAlert("Cart loaded succesfully", "success");
      }
    } catch (error) {
      showAlert("Failed to fetch cart", "danger");
      console.log("Error Occured in getCart ShopState", error);
    }
  };

  // add to cart
  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${host}/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.data);

        showAlert("Item Added to cart", "success");
      } else {
        showAlert("Failed to add to cart", "danger");
      }
    } catch (error) {
      showAlert("Failed to add to cart", "danger");
      console.log("Error Occured in addToCart", error);
    }
  };

  // remove from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${host}/cart`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
        showAlert("Item Removed from cart", "info");
      } else {
        showAlert("No cart found", "danger");
      }
    } catch (error) {
      showAlert("Some Error occured while removing", "danger");
      console.log("Error occured in removeFromCart", error);
    }
  };

  //remove one from cart
  const removeOneFromCart = async (productId) => {
    try {
      const response = await fetch(`${host}/removeonefromcart`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);

        showAlert("Item Removed from cart", "info");
      } else {
        showAlert("No cart found", "danger");
      }
    } catch (error) {
      showAlert("Some Error occured while removing", "danger");
      console.log("Error occured in removeFromCart", error);
    }
  };

  // get products
  const getProducts = async (subcategoryId) => {
    try {
      const response = await fetch(`${host}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subcategoryId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        showAlert("Products loaded successfully", "success");
      } else {
        showAlert("Failed to load Products", "danger");
      }
    } catch (error) {
      showAlert("Some Error occured while fetching Products", "danger");
      console.log("Error occured in getProducts", error);
    }
  };

  // get Paints
  const getPaints = async () => {
    try {
      const response = await fetch(`${host}/paints`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setSubCategories(data.subCategories);
        return data.categories;
      }
    } catch (error) {
      props.showAlert("Failed to fetch paints", "danger");
      console.log("Error Occured in getPaints EditorState", error);
    }
  };
  // get Tiles
  const getTiles = async () => {
    try {
      const response = await fetch(`${host}/tiles`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setSubCategories(data.subCategories);
        return data.categories;
      }
    } catch (error) {
      props.showAlert("Failed to fetch tiles", "danger");
      console.log("Error Occured in getTiles EditorState", error);
    }
  };
  // get Wallpapers
  const getWallpapers = async () => {
    try {
      const response = await fetch(`${host}/wallpapers`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setSubCategories(data.subCategories);
        return data.categories;
      }
    } catch (error) {
      props.showAlert("Failed to fetch wallpapers", "danger");
      console.log("Error Occured in getWallpapers EditorState", error);
    }
  };

  //get categories
  const getCategories = async () => {
    try {
      const response = await fetch(host + "/categories", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
        showAlert("Categories Fetched", "success");
      } else {
        showAlert("Failed to fetch Categories", "danger");
      }
    } catch (err) {
      showAlert("Failed to fetch Categories", "danger");
      console.log("Error occured in getCategories", err);
    }
  };

  //get design categories
  const getDesignCategories = async () => {
    const response = await fetch(host + "/designcategory", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setCategories(data.categories);
    } else {
      showAlert("Failed to Fetched Design Categories", "danger");
    }
  };

  //get sub categories
  const getSubCategories = async (categoryId) => {
    try {
      const response = await fetch(host + "/subcategories", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId }),
      });
      const data = await response.json();
      if (!data.success) {
        showAlert("Failed to Fetched Sub Categories", "danger");
      } else {
        setSubCategories(data.subCategories);
        showAlert("Fetched Sub Categories", "success");
      }
    } catch (err) {
      showAlert("Failed to fetch SubCategories", "danger");
      console.log("Error occured in getSubCategories", err);
    }
  };

  // getModels
  const getModels = async (categoryId) => {
    const response = await fetch(`${host}/models/${categoryId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setModels(data.models);
      showAlert("Models fetched", "success");
    } else {
      showAlert("Failed to fetch Models", "danger");
    }
  };

  // get all Models
  const getAllModels = async () => {
    const response = await fetch(`${host}/allmodels`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setModels(data.models);
      showAlert("Models fetched", "success");
    } else {
      showAlert("Failed to fetch Models", "danger");
    }
  };

  // getProductModels
  const getProductModels = async (subcategoryId) => {
    const response = await fetch(`${host}/productmodels`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setProductModels(data.data);
      showAlert("Product Models fetched", "success");
    } else {
      showAlert("Failed to fetch Product Models", "danger");
    }
  };

  // savemodel
  const saveModel = async (model, modelName, imageUrl) => {
    console.log("model = ", model);
    console.log("modelName = ", modelName);
    console.log("imageUrl = ", imageUrl);
    const modelBlob = new Blob([model], { type: "application/octet-stream" });

    const formData = new FormData();
    formData.append("model", modelBlob);
    formData.append("modelName", modelName);
    formData.append("imageUrl", imageUrl);

    const response = await fetch(host + "/savemodel", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      showAlert("Model saved", "success");
    } else {
      showAlert("Model not saved", "danger");
    }
  };

  // overwrite
  const overwriteModel = async (modelData, modelName, imageUrl, model) => {
    const modelId = model._id;
    console.log("modelData = ", modelData);
    console.log("modelName = ", modelName);
    console.log("imageUrl = ", imageUrl);
    console.log("modelId = ", modelId);

    if (!user) {
      showAlert("You are not logged in", "danger");
      return;
    }

    const modelUrl = user.models.filter((model) => model._id === modelId)[0]
      .modelUrl;

    const publicId = extractPublicId(modelUrl);
    const modelBlob = new Blob([modelData], {
      type: "application/octet-stream",
    });

    const formData = new FormData();

    formData.append("model", modelBlob);
    formData.append("modelName", modelName);
    formData.append("imageUrl", imageUrl);
    formData.append("modelId", modelId);
    formData.append("publicId", publicId);

    const response = await fetch(host + "/overwritemodel", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      showAlert("Model saved", "success");
    } else {
      showAlert("Model not saved", "danger");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
        getProducts,
        products,
        setProducts,
        getCategories,
        getDesignCategories,
        getSubCategories,
        getPaints,
        getTiles,
        getWallpapers,
        categories,
        subCategories,
        saveModel,
        overwriteModel,
        getModels,
        models,
        getProductModels,
        productModels,
        getAllModels,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopState;
