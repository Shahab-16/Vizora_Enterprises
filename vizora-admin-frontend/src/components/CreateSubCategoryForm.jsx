import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../utils/cloudinaryConfig";
import UploadWidget from "./UploadWidget";

const CreateSubCategoryForm = ({ categoryId, postSubCategory }) => {
  useEffect(() => {
    console.log("categoryId currently in CREATE FORM", categoryId);
  }, [categoryId]);
  console.log(`categoryid in Create SubCategoryform  = ${categoryId}`);

  const initialValues = {
    categoryId: categoryId,
    subcategoryName: "",
    imageUrl: "",
  };
  console.log("InitialValues.categoryId = ", initialValues.categoryId);

  const handleSubmit = (values) => {
    console.log("Updating subcategory:", values);
    postSubCategory(values);
  };
  return (
    <div className="relative">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values, dirty }) => (
          <Form className="justify-center">
            <div className="flex justify-center mb-5 bg-blue-gray-100 rounded-lg py-2">
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
              name="subcategoryName"
              placeholder="Sub Category Name"
            />
            {dirty && (
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white flex mx-auto px-3 rounded-md "
              >
                Create
              </button>
            )}

            {values.imageUrl !== "" && (
              <UploadWidget
                text="Upload new Image"
                onUploadSuccess={(resultInfo) => {
                  setFieldValue("imageUrl", resultInfo.public_id);
                }}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSubCategoryForm;
