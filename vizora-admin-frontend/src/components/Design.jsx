import React, { useContext, useEffect, useState } from "react";
import DesignCategoryForm from "./DesignCategoryForm";
import AdminContext from "../contexts/adminContext";
import Models from "./Models";

const Design = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const {
    categories,
    getDesignCategories,
    delCategory,
    patchCategory,
    postCategory,
  } = useContext(AdminContext);

  const handleShowGallery = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    getDesignCategories();
  }, []);
  return (
    <>
      <div className="flex my-8 space-x-5 overflow-x-auto py-2">
        {categories.map((category) => {
          return (
            <DesignCategoryForm
              key={category._id}
              category={category}
              delCategory={delCategory}
              patchCategory={patchCategory}
              postCategory={postCategory}
              handleShowGallery={handleShowGallery}
            />
          );
        })}
        <DesignCategoryForm postCategory={postCategory} key={"newForm"} />
      </div>

      {activeCategory && (
        <>
        {console.log("ACTIVE CATEGORY IN DESIGN", activeCategory)}
          <h1 className="my-5 text-2xl font-semibold">Gallery</h1>
          <Models activeCategory={activeCategory} />
        </>
      )}
    </>
  );
};

export default Design;
