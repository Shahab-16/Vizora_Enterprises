import React, { useContext, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import UploadWidget from "./UploadWidget";
import { Formik, Form, Field } from "formik";
import { cld } from "../util/cloudinaryConfig";
import editorContext from "../context/editorContext";

const SaveModal = ({
  setShowSaveModal,
  saveModel,
  modelData,
  overwriteModel,
}) => {
  const { model } = useContext(editorContext);

  const initialValues = {
    modelName: modelData ? modelData.modelName : "",
    imageUrl: modelData ? modelData.imageUrl : "",
  };
  const onSubmit = (values) => {
    console.log(values);
    if (modelData) {
      overwriteModel(modelData, values.modelName, values.imageUrl, model);
    } else {
      saveModel(modelData, values.modelName, values.imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blend-darken">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values, dirty }) => (
          <Form className="justify-center w-[300px] relative bg-white p-2">
            <button
              onClick={() => setShowSaveModal(false)}
              className="absolute top-2 right-2 text-lg"
            >
              x
            </button>
            <div className="flex justify-center mb-3 rounded-lg mt-5">
              {values.imageUrl ? (
                <AdvancedImage
                  cldImg={cld
                    .image(`${values.imageUrl}`)
                    .addTransformation("q_auto,c_auto,g_auto,h_200,w_200,r_10")}
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
              className="block bg-gray-300 px-2 py-1 w-full"
              type="text"
              name="modelName"
              placeholder="Model Name"
            />

            {dirty && (
              <button
                className="bg-indigo-600 mt-5 rounded-md text-white font-bold px-3 py-1 flex mx-auto"
                type="submit"
              >
                Save Model
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SaveModal;
