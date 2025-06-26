import React, { useEffect, useContext, useState, useCallback } from "react";
import AdminContext from "../contexts/adminContext";
import CategoryForm from "./CategoryForm";
import SubCategoryForm from "./SubCategoryForm";
import CreateSubCategoryForm from "./CreateSubCategoryForm";
const Category = ({
  updateSubCategoryId,
  updateCategoryId,
  activeCategoryId,
}) => {
  const {
    getCategories,
    categories,
    getSubCategories,
    subCategories,
    patchCategory,
    patchSubCategory,
    delCategory,
    delSubCategory,
    postCategory,
    postSubCategory,
  } = useContext(AdminContext);
  const [activeCategoryName, setActiveCategoryName] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (activeCategoryId) {
      getSubCategories(activeCategoryId);
    }
  }, [activeCategoryId]);

  const handleSubcategoryFetch = useCallback(
    (categoryId, categoryName) => {
      updateCategoryId(categoryId);
      setActiveCategoryName(categoryName);
    },
    [updateCategoryId]
  );

  const handleGalleryFetch = useCallback(
    (subCategoryId) => {
      updateSubCategoryId(subCategoryId);
    },
    [updateSubCategoryId]
  );

  return (
    <>
      <div className="flex my-8 space-x-5 overflow-x-auto py-2">
        {categories.map((category) => (
          <CategoryForm
            key={category._id}
            category={category}
            delCategory={delCategory}
            patchCategory={patchCategory}
            handleSubcategoryFetch={handleSubcategoryFetch}
          />
        ))}
        <CategoryForm postCategory={postCategory} key={"newForm"} />
      </div>
      {activeCategoryId && (
        <>
          <h1 className="font-bold text-xl text-primary-black">
            All {activeCategoryName}
          </h1>
          <div className="flex my-8 space-x-5 overflow-x-auto py-2">
            {subCategories.map((subCategory) => (
              <SubCategoryForm
                key={subCategory._id}
                subCategory={subCategory}
                delSubCategory={delSubCategory}
                patchSubCategory={patchSubCategory}
                handleGalleryFetch={handleGalleryFetch}
              />
            ))}
            {console.log("activeCategoryId = ", activeCategoryId)}
            <CreateSubCategoryForm
              key={activeCategoryId}
              postSubCategory={postSubCategory}
              categoryId={activeCategoryId}
            />
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(Category);
