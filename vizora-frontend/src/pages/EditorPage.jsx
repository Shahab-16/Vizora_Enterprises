import React, { useState, useEffect, useContext, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Editor from "../components/Editor";
import ShopContext from "../context/shopContext";
import EditorContext from "../context/editorContext";
import UserContext from "../context/userContext";
import { AdvancedImage } from "@cloudinary/react";
import { cld } from "../util/cloudinaryConfig";
import {
  paint,
  save,
  screenshot,
  wallpaper,
  tiles,
  tour,
} from "../assets/icons";
import {
  favourites,
  unfavourites,
  down_arrow,
  logo,
  search,
} from "../assets/icons";
import SaveModal from "../components/SaveModal";
import { Link } from "react-router-dom";

const Controls = ({
  setShowSaveModal,
  goToCategory,
  showPaintsModal,
  showTilesModal,
  showWallpapersModal,
  setShowPaintsModal,
  setShowTilesModal,
  setShowWallpapersModal,
  setModelData,
}) => {
  const { getPaints, getTiles, getWallpapers } = useContext(ShopContext);
  const {
    captureScreenshot,
    compressAndExport,
    lockControls,
    setIsLocked,
    model,
  } = useContext(EditorContext);
  return (
    <div className="fixed z-50 right-5 top-1/3 space-y-3">
      <button
        className="p-2 bg-white border border-gray-300 rounded-full block"
        onClick={() => captureScreenshot()}
      >
        <span className="flex w-8 h-8 items-center">{screenshot}</span>
      </button>
      <button
        className="p-2 bg-white border border-gray-300 rounded-full block"
        onClick={() => {
          setShowSaveModal(true);
          compressAndExport(setModelData);
        }}
      >
        <span className="flex w-8 h-8 items-center">{save}</span>
      </button>

      <button
        className="p-2 bg-white border border-gray-300 rounded-full block"
        onClick={() => {
          setIsLocked(true);
          lockControls();
        }}
      >
        {tour}
      </button>
      {showPaintsModal && (
        <button
          className="p-2 bg-white border border-gray-300 rounded-full block"
          onClick={() => goToCategory(getPaints, setShowPaintsModal)}
        >
          <span className="flex w-8 h-8 items-center overflow-hidden">
            {paint}
          </span>
        </button>
      )}
      {showTilesModal && (
        <button
          className="p-2 bg-white border border-gray-300 rounded-full block"
          onClick={() => goToCategory(getTiles, setShowTilesModal)}
        >
          <span className="flex w-8 h-8 items-center overflow-hidden">
            {tiles}
          </span>
        </button>
      )}
      {showWallpapersModal && (
        <button
          className="p-2 bg-white border border-gray-300 rounded-full block"
          onClick={() => goToCategory(getWallpapers, setShowWallpapersModal)}
        >
          <span className="flex w-8 h-8 items-center overflow-hidden">
            {wallpaper}
          </span>
        </button>
      )}
    </div>
  );
};

const EditorPage = () => {
  const {
    models,
    getCategories,
    categories,
    subCategories,
    getModels,
    getProducts,
    getProductModels,
    productModels,
    products,
    saveModel,
    overwriteModel,
    getSubCategories,
    getDesignCategories,
    setProducts,
  } = useContext(ShopContext);
  const { getUserData, likedProducts, likeProduct, user } =
    useContext(UserContext);
  const { setRoomModel } = useContext(EditorContext);

  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [modal, setModal] = useState("Designs");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [modelData, setModelData] = useState(null);
  const [activeWallColor, setActiveWallColor] = useState([null, 0]);
  const [activeWallTexture, setActiveWallTexture] = useState([null, 0]);
  const [showPaintsModal, setShowPaintsModal] = useState(false);
  const [showTilesModal, setShowTilesModal] = useState(false);
  const [showWallpapersModal, setShowWallpapersModal] = useState(false);
  const [productCost, setProductCost] = useState(0);
  const [wallsCost, setWallsCost] = useState({});

  const getTotalCost = () => {
    var totalCost = 0;
    for (const key in wallsCost) {
      totalCost += wallsCost[key];
    }
    return totalCost + productCost;
  };

  const goToCategory = useCallback(
    async (getCategory, setModalState) => {
      setProducts([]);
      const category = await getCategory();
      setShowModal(true);
      setModal("Products");
      setActiveCategory(category);
      setModalState(true);
    },
    [setActiveCategory, setModal, setShowModal, setProducts]
  );

  useEffect(() => {
    getUserData();
    getDesignCategories();
    getProductModels();
  }, []);

  // todod remove this later
  useEffect(() => {
    console.log(wallsCost, "##", productCost);
  }, [wallsCost, productCost]);

  useEffect(() => {
    if (modal === "Products") {
      getCategories();
    } else {
      getDesignCategories();
    }
  }, [modal]);

  const handleCategoryClick = useCallback(
    (category) => {
      setActiveCategory(category);
      if (modal === "Products") {
        getSubCategories(category._id);
      } else {
        getModels(category._id);
      }
    },
    [modal, getSubCategories, getModels]
  );

  const handleSubCategoryClick = useCallback(
    (subCategory) => {
      setActiveSubCategory(subCategory);
      if (
        ["Paints", "Tiles", "Wallpapers"].includes(activeCategory.categoryName)
      ) {
        getProducts(subCategory._id);
      } else {
        getProductModels(subCategory._id);
      }
    },
    [activeCategory, getProducts, getProductModels]
  );

  const addModel = (model) => {
    setProductsList([...productsList, model]);
    setProductCost(productCost + model.price);
  };

  const isLiked = useCallback(
    (productId) => likedProducts.includes(productId),
    [likedProducts]
  );

  return (
    <div className="h-screen relative">
      {!user && (
        <Link
          to="/login"
          className="z-10 absolute top-0 right-0 text-xl border-2 border-primary-purple text-primary-purple rounded-lg m-5 px-3 py-1"
        >
          Login
        </Link>
      )}
      <div
        className={`z-10 absolute bg-white ${
          showModal ? "w-[400px] border-2" : "w-0 h-0"
        } transform-all duration-200 top-2 left-2 rounded-lg`}
      >
        <div className="relative">
          <button
            onClick={() => setShowModal(!showModal)}
            className="absolute top-0 -right-10 text-3xl px-2 text-primary-black rounded-md bg-white"
          >
            {showModal ? "<" : ">"}
          </button>
          <nav className={`${showModal ? "flex" : "hidden"}`}>
            <span className="flex w-7 h-16 mx-4 my-1.5 items-center">
              {logo}
            </span>
            <div className="flex my-auto mx-4 w-full h-7 rounded-md border-2 border-[#D9D9D9] items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 outline-none border-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="bg-[#D9D9D9] px-3 rounded-r-md h-7">
                <span className="flex mb-1.5 h-5 w-5">{search}</span>
              </button>
            </div>
          </nav>
        </div>
        <div className={`${showModal ? "block" : "hidden"}`}>
          <div className="ml-3 text-lg flex items-center text-primary-black font-semibold">
            <div
              className="relative bg-light-gray rounded-md px-2.5 py-0.5 flex items-center"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              {modal} <span className="ml-2.5 mt-0.5">{down_arrow}</span>
              <button
                hidden={!showDropDown}
                onClick={() => {
                  setModal((prev) =>
                    prev === "Designs" ? "Products" : "Designs"
                  );
                  setActiveCategory(null);
                  setActiveSubCategory(null);
                }}
                className="absolute top-10 left-0 bg-white border-2 rounded-md px-6 py-0.5"
              >
                {modal === "Designs" ? "Products" : "Designs"}
              </button>
            </div>
            {activeCategory?.categoryName && (
              <span
                onClick={() => setActiveSubCategory(null)}
                className="text-sm text-gray-500 font-normal cursor-pointer mx-1.5"
              >
                {activeCategory ? "/ " : " "}
                {" " + activeCategory.categoryName + " "}
              </span>
            )}
            {activeSubCategory?.subcategoryName && (
              <span className="text-sm text-gray-400 font-normal">
                / {" " + activeSubCategory.subcategoryName + " "}
              </span>
            )}
          </div>
          {!activeSubCategory && categories && (
            <div>
              <div className="flex overflow-x-auto py-4 mx-6">
                {categories.map((category) => (
                  <button
                    onClick={() => handleCategoryClick(category)}
                    key={category._id}
                    className={`flex rounded-lg mr-0.5 border-2 ${
                      activeCategory?._id === category._id
                        ? "border-primary-purple shadow-lg"
                        : "border-white"
                    }`}
                  >
                    <div className="min-w-28 p-0.5">
                      <AdvancedImage
                        className="mx-auto"
                        cldImg={cld
                          .image(`${category.imageUrl}`)
                          .addTransformation(
                            "q_auto,c_auto,g_auto,h_70,w_110,r_8"
                          )}
                      />
                      <p className="mt-1.5 text-center text-[10px] font-bold">
                        {category.categoryName}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {categories && activeCategory && modal === "Products" && (
            <div className="flex overflow-x-auto my-4">
              {subCategories.map((subCategory) => (
                <button
                  onClick={() => handleSubCategoryClick(subCategory)}
                  key={subCategory._id}
                  className={`flex p-1.5 rounded-lg mr-0.5 border-2 hover:border-gray-200 ${
                    activeSubCategory?._id === subCategory._id
                      ? "border-primary-purple"
                      : "border-white"
                  }`}
                >
                  <div>
                    <AdvancedImage
                      className="mx-auto"
                      cldImg={cld
                        .image(`${subCategory.imageUrl}`)
                        .addTransformation(
                          "q_auto,c_auto,g_auto,h_70,w_90,r_10"
                        )}
                    />
                    <p className="mt-1.5 text-center text-xs font-semibold">
                      {subCategory.subcategoryName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {categories && activeCategory && modal === "Designs" && (
            <div className="flex flex-wrap my-2 mx-1.5 justify-between h-[60vh] overflow-y-auto">
              {models.map((model) => (
                <div key={model._id} className="bg-light-gray rounded-lg mt-4">
                  <div className="relative">
                    <AdvancedImage
                      cldImg={cld
                        .image(`${model.imageUrl}`)
                        .addTransformation(
                          "q_auto,c_auto,g_auto,h_110,w_180,r_10"
                        )}
                    />
                  </div>
                  <div className="flex m-1.5">
                    <button
                      onClick={() => setRoomModel(model)}
                      className="rounded-sm text-sm border border-primary-purple text-primary-purple px-2.5 py-1 block font-medium"
                    >
                      Apply Design
                    </button>
                    <button
                      onClick={() =>
                        likeProduct(model._id, !isLiked(model._id))
                      }
                      className="bg-[#c8c2cf] rounded-full flex justify-center items-center ml-auto border border-[#9d9d9d] h-6 w-6"
                    >
                      <span className="flex h-3 w-3 m-auto">
                        {isLiked(model._id) ? favourites : unfavourites}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeSubCategory && productModels && (
            <div className="flex flex-wrap">
              {["Paints", "Tiles", "Wallpapers"].includes(
                activeCategory.categoryName
              )
                ? products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-light-gray p-2 w-1/2 rounded-lg h-fit"
                    >
                      <div className="relative">
                        <AdvancedImage
                          className="mx-auto relative"
                          cldImg={cld
                            .image(`${product.imageUrl}`)
                            .addTransformation(
                              "q_auto,c_auto,g_auto,h_200,w_250,r_10"
                            )}
                        />
                      </div>
                      <p className="font-semibold mt-3 ml-2">
                        {product.productName}
                      </p>
                      <p className="font-semibold m-2">{`${product.price} ${product.unit}`}</p>
                      <div>
                        <button
                          onClick={() => {
                            if (activeCategory.categoryName === "Paints") {
                              setActiveWallColor([
                                product.additionalFields.color,
                                product.price,
                              ]);
                            } else {
                              setActiveWallTexture([
                                product.textureUrl,
                                product.price,
                              ]);
                            }
                          }}
                          className="rounded-sm bg-primary-purple text-white px-3 py-1 block w-full"
                        >
                          Try Product
                        </button>
                      </div>
                    </div>
                  ))
                : productModels.map((product) => (
                    <div
                      key={product._id}
                      className="bg-light-gray p-2 w-1/2 rounded-lg h-fit"
                    >
                      <div className="relative">
                        <AdvancedImage
                          className="mx-auto relative"
                          cldImg={cld
                            .image(`${product.imageUrl}`)
                            .addTransformation(
                              "q_auto,c_auto,g_auto,h_200,w_250,r_10"
                            )}
                        />
                        <button
                          onClick={() =>
                            likeProduct(product._id, !isLiked(product._id))
                          }
                          className="absolute right-0 -bottom-4 bg-[#c8c2cf] rounded-full flex justify-center my-auto mx-2 border border-[#9d9d9d] items-center h-8 w-8 mobile-icon-button"
                        >
                          {isLiked(product._id) ? favourites : unfavourites}
                        </button>
                      </div>
                      <p className="font-semibold mt-3 ml-2">
                        {product.productName}
                      </p>
                      <p className="font-semibold m-2">{`${product.price} ${product.currency}`}</p>
                      <div>
                        <button
                          onClick={() => addModel(product)}
                          className="rounded-sm bg-primary-purple text-white px-3 py-1 block w-full"
                        >
                          Try Product
                        </button>
                        <button
                          onClick={() => addToCart(product._id)}
                          className="w-full relative font-medium rounded-sm text-primary-purple border border-primary-purple px-2 py-1 my-1"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
      <Controls
        setShowSaveModal={setShowSaveModal}
        goToCategory={goToCategory}
        showPaintsModal={showPaintsModal}
        showTilesModal={showTilesModal}
        showWallpapersModal={showWallpapersModal}
        setShowPaintsModal={setShowPaintsModal}
        setShowTilesModal={setShowTilesModal}
        setShowWallpapersModal={setShowWallpapersModal}
        setModelData={setModelData}
      />
      <Canvas
        camera={{ position: [0, 15, 45] }}
        gl={{ antialias: true }}
        className="bg-gradient-to-b from-[#9299ae] to-[#32436c]"
      >
        <Editor
          products={productsList}
          setModal={setModal}
          setActiveCategory={setActiveCategory}
          getSubCategories={getSubCategories}
          setShowModal={setShowModal}
          activeWallColor={activeWallColor}
          activeWallTexture={activeWallTexture}
          setProducts={setProducts}
          setShowPaintsModal={setShowPaintsModal}
          setShowTilesModal={setShowTilesModal}
          setShowWallpapersModal={setShowWallpapersModal}
          productCost={productCost}
          setProductCost={setProductCost}
          setWallsCost={setWallsCost}
          wallsCost={wallsCost}
        />
      </Canvas>

      <div className="fixed bottom-0 left-0 bg-white">
        Total cost = {getTotalCost()}
      </div>

      {showSaveModal && (
        <SaveModal
          setShowSaveModal={setShowSaveModal}
          modelData={modelData}
          saveModel={saveModel}
          overwriteModel={overwriteModel}
        />
      )}
    </div>
  );
};

export default EditorPage;
