import React, { useState } from "react";
import Category from "./Category";
import Gallery from "./Gallery";

const Product = () => {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const updateCategoryId = (categoryId) => {
    setActiveCategoryId((prevActiveCategoryId) => {
      console.log("current active Category was = ", prevActiveCategoryId);
      return categoryId;
    });
  };


  const updateSubCategoryId = (subcategoryId) => {
    setActiveSubcategoryId((prevActiveSubcategoryId) => {
      console.log("current active Subcategory was = ", prevActiveSubcategoryId);
      return subcategoryId;
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-black px-5">Products</h1>
      {activeSubcategoryId ? (
        <Gallery
          activeSubcategoryId={activeSubcategoryId}
          activeCategoryId={activeCategoryId}
        />
      ) : (
        <Category
          updateSubCategoryId={updateSubCategoryId}
          updateCategoryId={updateCategoryId}
          activeCategoryId={activeCategoryId}
        />
      )}
    </div>
  );
};

export default Product;
