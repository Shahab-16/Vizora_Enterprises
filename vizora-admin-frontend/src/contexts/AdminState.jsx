import React from "react";
import AdminContext from "./adminContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractPublicId } from "cloudinary-build-url";

const AdminState = (props) => {
  const host = import.meta.env.VITE_HOST;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [models, setModels] = useState([]);
  const { showAlert } = props;
  const [productModels, setProductModels] = useState([]);

  // getAdminData
  const fetchData = async () => {
    const response = await fetch(host + "/login", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      console.log("fetchdata => ", data);
      showAlert("Logged in succesfully", "success");
      setUser(data.user);
    } else if (!data.success) {
      navigate("/login");
      showAlert("You are not logged In", "info");
    }
  };

  // Login
  const Login = async (values) => {
    const response = await fetch(host + "/login", {
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
      await fetchData();
      navigate("/");
    } else if (!data.success) {
      showAlert("Login Failed", "danger");
    }
  };

  // Signup
  const Signin = async (values) => {
    const response = await fetch(host + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log("data post Signup=> ", data);
    if (data.success) {
      await fetchData();
      navigate("/");
    } else {
      showAlert("Signin Failed", "danger");
    }
  };

  // Logout
  const Logout = async () => {
    const response = await fetch(host + "/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      navigate("/login");
      setUser(null);
      showAlert("Logged out succesfully", "info");
    } else {
      showAlert("Faied to logout", "danger");
    }
  };

  // getCategories
  const getCategories = async () => {
    const response = await fetch(host + "/category", {
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
      showAlert("Failed to Fetched Categories", "danger");
    }
  };

  //get design category
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

  // postCategory
  const postCategory = async (values) => {
    console.log("AdminState", JSON.stringify(values));
    const response = await fetch(host + "/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.success) {
      const category = data.category;
      setCategories([...categories, category]);
      showAlert("Category added", "success");
    } else {
      showAlert("Category not added", "danger");
    }
  };

  // patchCategory(categoryId)
  const patchCategory = async (categoryId, values) => {
    const response = await fetch(`${host}/category/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log("data patch category=> ", data);
    if (data.success) {
      const newCategories = categories.map((category) => {
        if (category._id === categoryId) {
          return data.category;
        }
        return category;
      });
      setCategories(newCategories);
      showAlert("Category added", "success");
    } else {
      showAlert("Category not added", "danger");
    }
  };

  // delCategory(categoryId)
  const delCategory = async (categoryId) => {
    const response = await fetch(`${host}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      const newCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategories(newCategories);
      showAlert("Category deleted", "success");
    } else {
      showAlert("Category not deleted", "danger");
    }
  };

  // getSubCategories
  const getSubCategories = async (categoryId) => {
    const response = await fetch(host + "/getsubcategory", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId }),
    });
    const data = await response.json();
    if (data.success) {
      setSubCategories(data.subCategories);
      showAlert("Fetched Sub Categories", "success");
    } else {
      showAlert("Failed to Fetched Sub Categories", "danger");
    }
  };

  // postSubCategory
  const postSubCategory = async (values) => {
    const response = await fetch(host + "/subcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.success) {
      const subCategory = data.subCategory;
      setSubCategories([...subCategories, subCategory]);
      showAlert("SubCategory added", "success");
    } else {
      showAlert("SubCategory not added", "danger");
    }
  };

  // patchSubCategory(SubCategoryId)
  const patchSubCategory = async (subCategoryId, values) => {
    const response = await fetch(`${host}/subcategory/${subCategoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.success) {
      const newSubCategories = subCategories.map((subCategory) => {
        if (subCategory._id === subCategoryId) {
          return data.subCategory;
        }
        return subCategory;
      });
      setSubCategories(newSubCategories);
      showAlert("SubCategory added", "success");
    } else {
      showAlert("SubCategory not added", "danger");
    }
  };

  // delSubCategory(SubCategoryId)
  const delSubCategory = async (subCategoryId) => {
    const response = await fetch(`${host}/subcategory/${subCategoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      const newSubCategories = subCategories.filter(
        (subCategory) => subCategory._id !== subCategoryId
      );
      setSubCategories(newSubCategories);
      showAlert("SubCategory deleted", "success");
    } else {
      showAlert("SubCategory not deleted", "danger");
    }
  };

  // getProducts
  const getProducts = async (subCategoryId) => {
    const response = await fetch(host + "/getproduct", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subCategoryId }),
    });
    const data = await response.json();
    if (data.success) {
      setProducts(data.product);
      showAlert("Products fetched", "success");
    } else {
      showAlert("Failed to fetch Products", "danger");
    }
  };

  // postProduct
  const postProduct = async (values) => {
    const response = await fetch(host + "/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.success) {
      const product = data.product;
      setProducts([...products, product]);
      showAlert("Product added", "success");
    } else {
      showAlert("Product not added", "danger");
    }
  };

  // patchProduct(productId)
  const patchProduct = async (productId, values) => {
    const response = await fetch(`${host}/product/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.success) {
      const newProducts = products.map((product) => {
        if (product._id === productId) {
          return data.product;
        }
        return product;
      });
      setProducts(newProducts);
      showAlert("Product added", "success");
    } else {
      showAlert("Product not added", "danger");
    }
  };

  // delProduct(productId)
  const delProduct = async (productId) => {
    const response = await fetch(`${host}/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      const newProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(newProducts);
      showAlert("Product deleted", "success");
    } else {
      showAlert("Product not deleted", "danger");
    }
  };

  // postModel
  const postModel = async (values) => {
    const response = await fetch(host + "/model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.success) {
      const model = data.model;
      setModels([...models, model]);
      showAlert("Model added", "success");
    } else {
      showAlert("Model not added", "danger");
    }
  };

  // getProductModels
  const getProductModels = async (categoryId) => {
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

  // patchModel
  const patchModel = async (modelId, values) => {
    const response = await fetch(`${host}/model/${modelId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (data.success) {
      const newModels = models.map((model) => {
        if (model._id === modelId) {
          return data.model;
        }
        return model;
      });
      setModels(newModels);
      showAlert("Model added", "success");
    } else {
      showAlert("Model not added", "danger");
    }
  };

  // delModel
  const delModel = async (modelId) => {
    const response = await fetch(`${host}/model/${modelId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      const newModels = models.filter((model) => model._id !== modelId);
      setModels(newModels);
      showAlert("Model deleted", "success");
    } else {
      showAlert("Model not deleted", "danger");
    }
  };

  // savemodel
  const saveModel = async (model, url, modelId) => {
    console.log("model = ", model);
    const publicId = extractPublicId(url);
    console.log(" publicId = ", publicId);

    const modelBlob = new Blob([model], { type: "application/octet-stream" });

    const formData = new FormData();
    formData.append("model", modelBlob);
    formData.append("publicId", publicId);
    formData.append("modelId", modelId);

    const response = await fetch(host + "/savemodel", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    // if (data.success) {
    //   const model = data.model;
    //   setModels([...models, model]);
    //   showAlert("Model added", "success");
    // } else {
    //   showAlert("Model not added", "danger");
    // }
  };

  return (
    <AdminContext.Provider
      value={{
        fetchData,
        user,
        categories,
        subCategories,
        products,
        productModels,
        Login,
        Signin,
        Logout,
        getCategories,
        getDesignCategories,
        postCategory,
        patchCategory,
        delCategory,
        getSubCategories,
        postSubCategory,
        patchSubCategory,
        delSubCategory,
        getProducts,
        postProduct,
        patchProduct,
        delProduct,
        getProductModels,
        models,
        postModel,
        saveModel,
        getModels,
        patchModel,
        delModel,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
