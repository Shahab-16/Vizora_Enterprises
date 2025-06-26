import React, { useEffect, useRef, useContext, useState } from "react";
import { favourites, next_btn, prev_btn } from "../assets/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import shopContext from "../context/shopContext";
import editorContext from "../context/editorContext";
import { useNavigate } from "react-router-dom";
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const Design = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const {
    cart,
    addToCart,
    removeFromCart,
    removeOneFromCart,
    getProducts,
    products,
    getCategories,
    getDesignCategories,
    getSubCategories,
    categories,
    subCategories,
    models,
    getModels,
    getAllModels,
  } = useContext(shopContext);

  const { roomModel, setRoomModel } = useContext(editorContext);
  console.log("roomModel = ", roomModel);

  useEffect(() => {
    const handleScroll = (e) => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
          left: -e.deltaY * 2,
          behavior: "smooth",
        });
      }
    };
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getAllModels();
    getDesignCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      console.log(activeCategory);
      getModels(activeCategory._id);
    }
  }, [activeCategory]);

  useEffect(() => {
    console.log("MODELS UPDATED = ", models);
  }, [models]);

  const handleDesignClick = (category) => {
    setActiveCategory(category);
    getModels(category._id);
  };

  return (
    <>
      <div className="my-10 grid grid-cols-1 mx-5 sm:grid-cols-4">
        <div className="col-span-full">
          <h1 className="mx-10 mb-3 text-xl font-semibold text-primary-black">
            Choose Your Room
          </h1>
          <div className="flex overflow-x-auto">
            <button
              onClick={() => scrollLeft()}
              className="hidden md:block mr-3"
            >
              {prev_btn}
            </button>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto py-5 space-x-7 col-span-10"
            >
              {categories?.map((category) => {
                return (
                  <div
                  key={category._id}
                    onClick={() => handleDesignClick(category)}
                    className={`min-w-32 cursor-pointer p-2 mx-2 rounded-lg ${
                      category._id === activeCategory?._id
                        ? "border-2 border-primary-purple shadow-custom"
                        : ""
                    }`}
                  >
                    <AdvancedImage
                      cldImg={cld
                        .image(`${category.imageUrl}`)
                        .addTransformation(
                          "q_auto,c_auto,g_auto,h_120,w_150,r_10"
                        )}
                    />
                    <p className="my-2 text-center text-sm font-medium">
                      {category.categoryName}
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => scrollRight()}
              className="hidden md:block ml-3"
            >
              {next_btn}
            </button>
          </div>
        </div>
        <h1 className="col-span-full mt-5 mb-3 md:mb-7 text-xl font-semibold text-primary-black">
          {activeCategory?.categoryName} Gallery .
          <span className="block md:inline-flex text-xs text-gray-600 font-medium md:mx-5 my-2 ">
            {models?.length} predesigned templates
          </span>
        </h1>
        {models?.map((model) => {
          return (
            <div key={model._id} className="bg-light-gray rounded-md my-3 md:m-0 md:mr-10 md:mb-10 p-1">
              {window.innerWidth > 540 ? (
                <AdvancedImage
                  cldImg={cld
                    .image(`${model.imageUrl}`)
                    .addTransformation("q_auto,c_auto,g_auto,h_250,w_300,r_10")}
                />
              ) : (
                <AdvancedImage
                  cldImg={cld
                    .image(`${model.imageUrl}`)
                    .addTransformation("q_auto,c_auto,g_auto,h_300,w_540,r_10")}
                />
              )}
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setRoomModel(model);
                    navigate("/editor");
                  }}
                  className="py-1 px-3 m-2 text-center font-medium border rounded-[3px] border-primary-purple text-primary-purple"
                >
                  Apply Design
                </button>
                <button className="bg-[#c8c2cf] rounded-full flex justify-center my-auto mx-2 border border-[#9d9d9d] items-center h-8 w-8 mobile-icon-button">
                  {favourites}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Design;
