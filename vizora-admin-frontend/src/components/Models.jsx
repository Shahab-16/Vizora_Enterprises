import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../utils/cloudinaryConfig";
import UploadWidget from "./UploadWidget";
import AdminContext from "../contexts/adminContext";

const ModelForm = ({
  model,
  patchModel,
  postModel,
  delModel,
  activeCategory,
}) => {
  const isEditing = !!model;
  const handleSubmit = (values) => {
    console.log("Submitting model");
    if (isEditing) {
      patchModel(model._id, values);
    } else {
      postModel(values);
    }
  };
  console.log("ACTIVE CATEGORY", activeCategory);
  console.log("MODEL", model);

  return (
    <div key={model?._id} className="relative w-fit">
      <Formik
        enableReinitialize
        initialValues={{
          imageUrl: model?.imageUrl || "",
          modelUrl: model?.modelUrl || "",
          categoryId: model?.categoryId || activeCategory._id,
          modelName: model?.modelName || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, dirty }) => (
          <Form className="justify-center ">
            <div className="flex justify-center mb-5 bg-blue-gray-100 rounded-lg py-2">
              {values.imageUrl !== "" ? (
                <>
                  {console.log("IMAGE URL", values.imageUrl)}
                  <AdvancedImage
                    cldImg={cld
                      .image(`${values.imageUrl}`)
                      .addTransformation(
                        "q_auto,c_auto,g_auto,h_150,w_150,r_10"
                      )}
                  />
                </>
              ) : (
                <UploadWidget
                  text="Upload Image"
                  onUploadSuccess={(resultInfo) => {
                    setFieldValue("imageUrl", resultInfo.public_id);
                  }}
                />
              )}
            </div>

            <UploadWidget
              text="Upload 3D Model"
              onUploadSuccess={(resultInfo) => {
                setFieldValue("modelUrl", resultInfo.secure_url);
              }}
            />

            <Field
              className="block bg-gray-300 px-2 py-1 w-full"
              type="text"
              name="modelName"
              placeholder="Model Name"
            />

            {dirty && (
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white flex mx-auto px-3 rounded-md "
              >
                {isEditing ? "Update Model" : "Create Model"}
              </button>
            )}
            {isEditing && (
              <button
                type="button"
                className="mt-4 flex mx-auto bg-red-500 text-white px-3 rounded-md absolute -top-5 -right-1"
                onClick={() => delModel(category._id)}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Models = ({ activeCategory }) => {
  const { models, postModel, getModels, patchModel, delModel } =
    useContext(AdminContext);
  useEffect(() => {
    getModels(activeCategory._id);
  }, []);
  return (
    <div className="flex flex-wrap space-x-5">
      {models.length > 0 &&
        models.map((model) => {
          return (
            <ModelForm
              model={model}
              postModel={postModel}
              patchModel={patchModel}
              delModel={delModel}
            />
          );
        })}
      <ModelForm postModel={postModel} activeCategory={activeCategory} />
    </div>
  );
};

export default Models;
