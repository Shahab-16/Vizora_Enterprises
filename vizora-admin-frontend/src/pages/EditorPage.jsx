import React, { useState, useEffect, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import Editor from "../components/Editor";
import AdminContext from "../contexts/adminContext";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../utils/cloudinaryConfig";
import { logo, search, favourites } from "../../public/assets/icons";
import { WebIO } from "@gltf-transform/core";
import { weld, quantize, dedup } from "@gltf-transform/functions";
import {
  KHRONOS_EXTENSIONS,
  KHRDracoMeshCompression,
} from "@gltf-transform/extensions";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

const io = new WebIO({ credentials: "include" })
  .registerExtensions(KHRONOS_EXTENSIONS)
  .registerDependencies({
    "draco3d.encoder": new DracoEncoderModule(),
    "draco3d.decoder": new DracoDecoderModule(),
  });

const EditorPage = () => {
  const {
    fetchData,
    models,
    getDesignCategories,
    categories,
    getModels,
    getProductModels,
    productModels,
    saveModel,
  } = useContext(AdminContext);

  const [searchText, setSearchText] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [roomModel, setRoomModel] = useState(null);
  const [showDesign, setShowDesign] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const exporter = new GLTFExporter();
  const options = {
    binary: true,
  };

  useEffect(() => {
    fetchData();
    getDesignCategories();
    getProductModels();
    setActiveCategory(categories[0]);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    getModels(category._id);
  };

  const addModel = (model) => {
    setProducts([...products, model]);
  };

  const saveScene = async (scene) => {
    exporter.parse(
      scene,
      async function (glb) {
        const unit8array = new Uint8Array(glb);
        console.log("Before compression = ", unit8array);
        const glbfile = await io.readBinary(unit8array);
        glbfile
          .createExtension(KHRDracoMeshCompression)
          .setRequired(true)
          .setEncoderOptions({
            method: KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,
            encodeSpeed: 5,
            decodeSpeed: 5,
          });
        await glbfile.transform(weld(), quantize(), dedup());
        console.log("After compression = ", glbfile);

        const BinaryData = await io.writeBinary(glbfile);
        console.log("BinaryData = ", BinaryData);
        saveModel(BinaryData, roomModel.modelUrl, roomModel._id);
      },
      function (error) {
        console.log("An error happened", error);
      },
      options
    );
  };

  return (
    <div className="h-screen relative">
      <div
        className={`z-10 absolute border-2 bg-white ${
          showDesign ? "w-[450px]" : "w-0"
        } transform-all duration-200 top-2 left-2 rounded-lg`}
      >
        <div className="relative">
          <button
            onClick={() => setShowDesign(!showDesign)}
            className="absolute top-0 -right-9 text-3xl px-2 text-primary-black bg-white"
          >
            {showDesign ? "<" : ">"}
          </button>
          <nav className={`flex ${showDesign ? "block" : "hidden"}`}>
            <span className="flex w-8 h-18 mx-4 my-2">{logo}</span>
            <div className="flex my-auto mx-5 w-full h-8 rounded-md border-2 border-[#D9D9D9] items-center">
              <input
                type="text"
                placeholder="Search"
                className=" w-full px-4 outline-none border-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="bg-[#D9D9D9] px-4 rounded-r-md h-8">
                <span className="flex mb-2 h-5 w-5">{search}</span>
              </button>
            </div>
          </nav>
        </div>
        <div className={`m-2 ${showDesign ? "block" : "hidden"}`}>
          <h1 className="text-xl text-primary-black font-semibold">
            Designs{" "}
            <span className="text-base font-medium text-gray-500">
              / {activeCategory?.categoryName}
            </span>
          </h1>
          <div className="flex overflow-x-auto my-5">
            {categories.map((category) => (
              <button
                onClick={() => handleCategoryClick(category)}
                key={category._id}
                className={`flex p-2 rounded-lg mr-1 border-2  hover:border-gray-200 ${
                  activeCategory?._id === category._id
                    ? "border-primary-purple"
                    : "border-white"
                }`}
              >
                <div className="min-w-32">
                  <AdvancedImage
                    className="mx-auto"
                    cldImg={cld
                      .image(`${category.imageUrl}`)
                      .addTransformation(
                        "q_auto,c_auto,g_auto,h_100,w_120,r_10"
                      )}
                  />
                  <p className="mt-2 text-center text-xs font-semibold ">
                    {category.categoryName}
                  </p>
                </div>
              </button>
            ))}
          </div>
          {models && (
            <div>
              <div className="flex overflow-x-auto my-5 gap-4">
                {models.map((model) => (
                  <div
                    key={model._id}
                    className="bg-light-gray rounded-md my-3 bg-gray-200"
                  >
                    <div className="rounded-md w-full block">
                      <AdvancedImage
                        className="mx-auto"
                        cldImg={cld
                          .image(`${model.imageUrl}`)
                          .addTransformation(
                            "q_auto,c_auto,g_auto,h_200,w_200,r_10"
                          )}
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setRoomModel(model)}
                        className="py-0.5 px-2 text-sm m-2 text-center font-medium border rounded-[3px] border-primary-purple text-primary-purple"
                      >
                        Apply Design
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Canvas
        gl={{ antialias: true }}
        className="bg-gradient-to-b from-[#9299ae] to-[#32436c]"
      >
        <Editor
          roomModel={roomModel}
          products={products}
          saveScene={saveScene}
        />
      </Canvas>
      <div
        className={`z-10 absolute border-2 bg-white ${
          showProducts ? "w-[450px]" : "w-0"
        } transform-all duration-200 top-2 right-2 rounded-lg`}
      >
        <div className="relative">
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="absolute top-0 -left-9 text-3xl px-2 text-primary-black bg-light-gray bg-white"
          >
            {showProducts ? ">" : "<"}
          </button>
          <nav className={`flex ${showProducts ? "block" : "hidden"}`}>
            <span className="flex w-8 h-18 mx-4 my-2">{logo}</span>
            <div className="flex my-auto mx-5 w-full h-8 rounded-md border-2 border-[#D9D9D9] items-center">
              <input
                type="text"
                placeholder="Search"
                className=" w-full px-4 outline-none border-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="bg-[#D9D9D9] px-4 rounded-r-md h-8">
                <span className="flex mb-2 h-5 w-5">{search}</span>
              </button>
            </div>
          </nav>
        </div>
        <div className={`m-2 ${showProducts ? "block" : "hidden"}`}>
          <h1 className="text-xl text-primary-black font-semibold">Products</h1>
          {productModels && (
            <div>
              <div className="flex overflow-x-auto my-5 gap-4">
                {productModels.map((model) => (
                  <div
                    key={model._id}
                    className="bg-light-gray rounded-md my-3 bg-gray-200"
                  >
                    <div className="rounded-md w-full block">
                      <AdvancedImage
                        className="mx-auto"
                        cldImg={cld
                          .image(`${model.imageUrl}`)
                          .addTransformation(
                            "q_auto,c_auto,g_auto,h_180,w_180,r_10"
                          )}
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => addModel(model)}
                        className="py-0.5 px-2 text-sm m-2 text-center font-medium border rounded-[3px] border-primary-purple text-primary-purple"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
