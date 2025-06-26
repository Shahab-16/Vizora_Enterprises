import React, { useEffect, useContext, useState, useCallback } from "react";
import AdminContext from "../contexts/adminContext";
import { Formik, Form, Field } from "formik";
import UploadWidget from "./UploadWidget";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../utils/cloudinaryConfig";

const ProductForm = React.memo(({ initialValues, onSubmit, children }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ setFieldValue, values, dirty }) => (
      <Form className="justify-center space-y-2 w-[300px]">
        <div className="flex justify-center mb-3 bg-blue-gray-100 rounded-lg py-2">
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
          name="productName"
          placeholder="Product Name"
        />

        <Field
          className="block bg-gray-300 px-2 py-1 w-full"
          type="text"
          name="price"
          placeholder="Price"
        />

        <Field
          className="block bg-gray-300 px-2 py-1 w-full"
          type="text"
          name="unit"
          placeholder="Unit"
        />

        <Field
          className="block bg-gray-300 px-2 py-1 w-full"
          type="text"
          name="description"
          placeholder="Description"
        />
        <div className="flex text-sm">
          <label htmlFor="canFly">Fly</label>
          <Field
            className="bg-gray-300 mx-2"
            type="checkbox"
            name="constraints.canFly"
            id="canFly"
          />
        </div>
        <div className="flex text-sm">
          <label htmlFor="canMove">Move</label>
          <Field
            className="bg-gray-300 mx-2"
            type="checkbox"
            name="constraints.canMove"
            id="canMove"
          />
        </div>
        <div className="flex text-sm">
          <label htmlFor="canRotate">Rotate</label>
          <Field
            className="bg-gray-300 mx-2"
            type="checkbox"
            name="constraints.canRotate"
            id="canRotate"
          />
        </div>
        <div className="flex text-sm">
          <label htmlFor="stickWalls">Stick to walls</label>
          <Field
            className="bg-gray-300 mx-2"
            type="checkbox"
            name="constraints.stickWalls"
            id="stickWalls"
          />
        </div>
        <div className="flex text-sm">
          <label htmlFor="stickCeling">Stick to celing</label>
          <Field
            className="bg-gray-300 mx-2"
            type="checkbox"
            name="constraints.stickCeling"
            id="stickCeling"
          />
        </div>

        {Object.keys(values.additionalFields).map((fieldName, index) => {
          return (
            <Field
              key={index}
              className="block bg-gray-300 px-2 py-1 w-full"
              type="text"
              name={`additionalFields.${fieldName}`}
              placeholder={fieldName}
            />
          );
        })}
        <button
          className="flex justify-center"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const fieldName = prompt("Enter Field Name");
            const newObj = { ...values.additionalFields };
            newObj[fieldName] = "";
            console.log("values.additionalFieldss", values.additionalFields);
            setFieldValue("additionalFields", newObj);
          }}
        >
          + Add Field
        </button>

        {values.imageUrl && (
          <UploadWidget
            text="Upload new Image"
            onUploadSuccess={(resultInfo) => {
              setFieldValue("imageUrl", resultInfo.public_id);
            }}
          />
        )}

        <UploadWidget
          text={`Upload ${values.modelUrl ? "new " : " "}model`}
          onUploadSuccess={(resultInfo) => {
            setFieldValue("modelUrl", resultInfo.secure_url);
          }}
        />
        <UploadWidget
          text={`Upload ${values.textureUrl ? "new " : " "}Texture`}
          onUploadSuccess={(resultInfo) => {
            setFieldValue("textureUrl", resultInfo.secure_url);
          }}
        />

        {dirty && (
          <button
            className="bg-indigo-600 mt-5 rounded-md text-white font-bold px-3 py-1 flex mx-auto"
            type="submit"
          >
            Submit
          </button>
        )}
      </Form>
    )}
  </Formik>
));

const Gallery = ({ activeSubcategoryId, activeCategoryId }) => {
  const { getProducts, products, patchProduct, postProduct, delProduct } =
    useContext(AdminContext);

  useEffect(() => {
    getProducts(activeSubcategoryId);
  }, [activeSubcategoryId]);

  const handleSubmit = useCallback(
    (id, values) => {
      if (id) {
        console.log("patching product", id, values);
        patchProduct(id, values);
      } else {
        console.log("posting product", values);

        postProduct(values);
        resetForm();
      }
    },
    [patchProduct, postProduct]
  );

  return (
    <div>
      <h1 className="m-5 font-bold text-xl text-primary-black">Gallery</h1>
      <div className="flex flex-wrap my-8 space-x-5 py-2">
        {products.map((product) => (
          <div key={product._id} className="relative">
            <button
              onClick={() => delProduct(product._id)}
              className="absolute -top-1 right-0 w-fit h-fit px-2 rounded-full bg-red-600 content-center text-white"
            >
              x
            </button>
            <ProductForm
              initialValues={{
                subcategoryId: activeSubcategoryId,
                categoryId: activeCategoryId,
                productName: product.productName,
                price: product.price,
                unit: product.unit,
                imageUrl: product.imageUrl,
                modelUrl: product.modelUrl,
                textureUrl: product?.textureUrl,
                additionalFields: { ...product.additionalFields },
                description: product.description,
                constraints: { ...product.constraints },
              }}
              onSubmit={(values) => handleSubmit(product._id, values)}
            ></ProductForm>
          </div>
        ))}
        <ProductForm
          initialValues={{
            subcategoryId: activeSubcategoryId,
            categoryId: activeCategoryId,
            productName: "",
            price: "",
            unit: "",
            imageUrl: "",
            modelUrl: "",
            textureUrl: "",
            description: "",
            additionalFields: {},
            constraints: {
              canFly: false,
              canMove: true,
              canRotate: true,
              stickCeiling: false,
            },
          }}
          onSubmit={(values, { resetForm }) => handleSubmit(null, values)}
        ></ProductForm>
      </div>
    </div>
  );
};

export default Gallery;
