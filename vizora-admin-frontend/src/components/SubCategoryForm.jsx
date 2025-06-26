import React from "react";
import { Formik, Form, Field } from "formik";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../utils/cloudinaryConfig";
import UploadWidget from "./UploadWidget";

const SubCategoryForm = ({
  key,
  subCategory,
  delSubCategory,
  patchSubCategory,
  handleGalleryFetch,
}) => {
  // console.log(`subcategory = ${subCategory}`);

  const initialValues = {
    categoryId: subCategory.categoryId,
    subcategoryName: subCategory.subcategoryName,
    imageUrl: subCategory.imageUrl,
  };
  // console.log("InitialValues.categoryId = ", initialValues.categoryId);

  const handleSubmit = (values) => {
    console.log("Updating subcategory:", values);
    patchSubCategory(subCategory._id, values);
  };

  return (
    <div key={key} className="relative">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values, dirty }) => (
          <Form className="justify-center">
            <div className="flex justify-center mb-5 bg-blue-gray-100 rounded-lg py-2">
              <AdvancedImage
                cldImg={cld
                  .image(`${values.imageUrl}`)
                  .addTransformation("q_auto,c_auto,g_auto,h_150,w_150,r_10")}
              />
            </div>
            <Field
              className="bg-gray-300 px-2 py-1"
              type="text"
              name="subcategoryName"
              placeholder="Sub Category Name"
            />
            {dirty && (
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white flex mx-auto px-3 rounded-md "
              >
                Update Sub Category
              </button>
            )}

            <button
              type="button"
              className="mt-4 flex mx-auto bg-red-500 text-white px-3 rounded-md absolute -top-5 -right-1"
              onClick={() => delSubCategory(subCategory._id)}
            >
              x
            </button>

            <UploadWidget
              text="Upload Image"
              onUploadSuccess={(resultInfo) => {
                setFieldValue("imageUrl", resultInfo.public_id);
              }}
            />

            <button
              type="button"
              className="mt-4 flex mx-auto  px-3 rounded-full text-primary-purple border border-primary-purple text-sm "
              onClick={() =>
                handleGalleryFetch(subCategory._id, subCategory.categoryName)
              }
            >
              Show Gallery
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubCategoryForm;
