import React from "react";
import { Formik, Form, Field } from "formik";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../utils/cloudinaryConfig";
import UploadWidget from "./UploadWidget";

const CategoryForm = ({
  category,
  postCategory,
  patchCategory,
  delCategory,
  handleSubcategoryFetch,
  key,
}) => {
  const isEditing = !!category;
  const initialValues = {
    categoryName: category?.categoryName || "",
    imageUrl: category?.imageUrl || "",
  };

  const handleSubmit = (values) => {
    if (isEditing) {
      console.log("Updating category:", values);
      patchCategory(category._id, values);
    } else {
      console.log("Creating category:", values);
      postCategory(values);
      values.categoryName = "";
      values.imageUrl = "";
    }
  };
  return (
    <div key={key} className="relative">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values, dirty }) => (
          <Form className="justify-center ">
            <div className="flex justify-center mb-5 bg-blue-gray-100 rounded-lg py-2">
              {console.log("VALUES IN CATEGORY FORM = ", values)}
              {values.imageUrl !== "" ? (
                <AdvancedImage
                  cldImg={cld
                    .image(`${values.imageUrl}`)
                    .addTransformation("q_auto,c_auto,g_auto,h_150,w_150,r_10")}
                />
              ) : (
                <UploadWidget
                  text="Upload Image"
                  onUploadSuccess={(resultInfo) => {
                    setFieldValue("imageUrl", resultInfo.public_id);
                  }}
                />
              )}
            </div>
            <Field
              className="bg-gray-300 px-2 py-1"
              type="text"
              name="categoryName"
              placeholder="Category Name"
            />
            {dirty && (
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white flex mx-auto px-3 rounded-md "
              >
                {isEditing ? "Update Category" : "Create Category"}
              </button>
            )}
            {isEditing && (
              <button
                type="button"
                className="mt-4 flex mx-auto bg-red-500 text-white px-3 rounded-md absolute -top-5 -right-1"
                onClick={() => delCategory(category._id)}
              >
                x
              </button>
            )}

            {isEditing && (
              <UploadWidget
                text="Upload new Image"
                onUploadSuccess={(resultInfo) => {
                  setFieldValue("imageUrl", resultInfo.public_id);
                }}
              />
            )}
            {isEditing && (
              <button
                type="button"
                className="mt-4 flex mx-auto  px-3 rounded-full text-primary-purple border border-primary-purple text-sm "
                onClick={() =>
                  handleSubcategoryFetch(category._id, category.categoryName)
                }
              >
                Show Subcategories
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoryForm;
