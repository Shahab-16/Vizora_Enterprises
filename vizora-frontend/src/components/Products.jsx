import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  Suspense,
} from "react";
import {
  favourites,
  unfavourites,
  next_btn,
  prev_btn,
  back,
  purple_cart,
} from "../assets/icons";
import product_banner from "../assets/images/product_banner.png";
import product_banner_1 from "../assets/images/product_banner_1.png";
import product_banner_2 from "../assets/images/product_banner_2.png";
import product_banner_3 from "../assets/images/product_banner_3.png";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import ShopContext from "../context/shopContext";
import UserContext from "../context/userContext";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { cld } from "../util/cloudinaryConfig";

const Products = ({ category, setCategory, subCategory, setSubCategory }) => {
  const { addToCart } = useContext(ShopContext);
  const {
    getProducts,
    products,
    getCategories,
    getSubCategories,
    categories,
    subCategories,
  } = useContext(ShopContext);
  const { likedProducts, likeProduct } = useContext(UserContext);

  const scrollContainerRef = useRef(null);
  const [showFilters, setShowFilters] = useState(false);
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    if (category) {
      getSubCategories(category._id);
    }
  }, [category]);

  useEffect(() => {
    if (category === null) {
      getCategories();
      setSubCategory(null);
    }
  }, []);

  //scrollBar setting
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
    console.log("scrolling Left", scrollContainerRef.current);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    console.log("scrolling Right", scrollContainerRef.current);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category) => {
    getSubCategories(category._id);
    setCategory(category);
  };

  const handleSubCategoryClick = (subCategory) => {
    console.log("FETCHING PRODUCTS");
    getProducts(subCategory._id);
    setSubCategory(subCategory);
  };

  const isLiked = (productId) => {
    return likedProducts.includes(productId);
  };

  return (
    <>
      <div className="lg:my-7 grid grid-cols-1 mx-5">
        <div className="flex justify-between my-2">
          {subCategory ? (
            <span className="text-gray-600 text-xs my-auto flex lg:hidden">
              <button
                onClick={() => setSubCategory(null)}
                className="w-fit"
              >{`... > ${category.categoryName}`}</button>
              {`  >  ${subCategory.subcategoryName}`}{" "}
            </span>
          ) : (
            <>
              {category && (
                <span className="text-gray-600 text-xs my-auto flex lg:hidden">
                  <button onClick={() => setCategory(null)} className="w-fit">
                    Products
                  </button>
                  {`  >  ${category.categoryName}`}{" "}
                </span>
              )}
            </>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full w-fit ml-auto lg:hidden bg-light-gray text-xs h-8 px-5 "
          >
            Show Filters
          </button>
        </div>
        <div className="col-span-full">
          <div className="flex">
            {category && (
              <div className="hidden lg:flex">
                <button
                  onClick={() => {
                    setCategory(null);
                    setSubCategory(null);
                  }}
                  className="flex w-10 h-10 my-auto"
                >
                  {back}
                </button>
                <div className="min-w-32 px-5 py-3 rounded-lg mx-5">
                  <AdvancedImage
                    cldImg={cld
                      .image(`${category.imageUrl}`)
                      .addTransformation(
                        "q_auto,c_auto,g_auto,h_120,w_120,r_10"
                      )}
                  />
                  <p className="mt-5 text-center font-semibold text-sm lg:text-base">
                    {category.categoryName}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => scrollLeft()}
              className="hidden md:block mr-3"
            >
              {prev_btn}
            </button>

            <div ref={scrollContainerRef} className="flex overflow-x-auto">
              {category
                ? subCategories.map((subCategory) => (
                    <button
                      onClick={() => handleSubCategoryClick(subCategory)}
                      key={subCategory._id}
                      className="flex py-3 mr-3 lg:py-5 lg:mr-5"
                    >
                      <div className="min-w-32">
                        <AdvancedImage
                          className="mx-auto"
                          cldImg={cld
                            .image(`${subCategory.imageUrl}`)
                            .addTransformation(
                              "q_auto,c_auto,g_auto,h_120,w_150,r_10"
                            )}
                        />
                        <p className="my-2 text-center text-sm lg:text-base">
                          {subCategory.subcategoryName}
                        </p>
                      </div>
                    </button>
                  ))
                : categories.map((category) => (
                    <button
                      onClick={() => handleCategoryClick(category)}
                      key={category._id}
                      className="flex py-2 mr-2 lg:py-5 lg:mr-5"
                    >
                      <div className="min-w-32">
                        <AdvancedImage
                          className="mx-auto"
                          cldImg={cld
                            .image(`${category.imageUrl}`)
                            .addTransformation(
                              "q_auto,c_auto,g_auto,h_120,w_120,r_10"
                            )}
                        />
                        <p className="my-2 text-center text-sm lg:text-base">
                          {category.categoryName}
                        </p>
                      </div>
                    </button>
                  ))}
            </div>

            <button
              onClick={() => scrollRight()}
              className="hidden md:block ml-3"
            >
              {next_btn}
            </button>
          </div>
        </div>

        {subCategory && category ? (
          <>
            <div className="flex justify-between mt-5">
              <h1 className="col-span-full mt-7 mb-3 md:mb-7 text-lg lg:text-xl font-semibold text-primary-black">
                Firefly's Premium {category.categoryName} set
              </h1>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full hidden lg:block bg-light-gray text-sm font-medium h-8 px-5 my-auto"
              >
                Show Filters
              </button>
            </div>
            <div className="flex">
              <div
                className={`${
                  showFilters ? "w-56" : "w-0"
                } overflow-hidden hidden lg:block transform-all duration-200`}
              >
                <ul>
                  {categories.map((category) => (
                    <li className="font-semibold mb-3" key={category._id}>
                      <button
                        onClick={() => {
                          setCategory(category);
                          setSubCategory(null);
                        }}
                      >
                        {category.categoryName}
                      </button>
                    </li>
                  ))}
                </ul>

                <Accordion
                  className="w-full border-t-2 border-dark-gray mt-10"
                  open={open === 1}
                >
                  <AccordionHeader
                    className="flex text-center font-normal text-black mb-3 text-base py-1 relative"
                    onClick={() => handleOpen(1)}
                  >
                    Price{" "}
                    <span className="rotate-90 absolute right-2">{`>`}</span>
                  </AccordionHeader>
                  <AccordionBody className="py-0">
                    <ul className="space-y-2 pl-2">
                      <li>
                        <button>Low to High</button>
                      </li>
                      <li>
                        <button>High to Low</button>
                      </li>
                    </ul>
                  </AccordionBody>
                </Accordion>
              </div>
              <div className="lg:ml-5 flex gap-7 flex-wrap ">
                {products.map((product) => (
                  <div
                    className="bg-light-gray p-2 w-full lg:w-[258px] rounded-lg h-fit"
                    key={product._id}
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
                        onClick={() => {
                          likeProduct(product._id, !isLiked(product._id));
                        }}
                        className="absolute right-0 -bottom-4 bg-[#c8c2cf] rounded-full flex justify-center my-auto mx-2 border border-[#9d9d9d] items-center h-8 w-8 mobile-icon-button"
                      >
                        {isLiked(product._id) ? favourites : unfavourites}
                      </button>
                    </div>
                    <p className="font-medium mt-3 ml-2">
                      {product.productName}
                    </p>
                    <p className="font-medium m-2">{`${product.price}  ${product.currency}`}</p>
                    <div className="flex justify-between">
                      <button className="rounded-sm bg-primary-purple text-white px-3 py-1 mx-2 my-3">
                        Try Product
                      </button>
                      <button
                        onClick={() => addToCart(product._id)}
                        className="relative flex font-medium rounded-sm text-primary-purple border border-primary-purple px-2 py-1 mx-2 my-3"
                      >
                        <span className="flex w-6 h-6 -mt-1.5 mr-2">
                          {purple_cart}
                        </span>
                        Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="col-span-full mt-7 mb-3 md:mb-7 text-xl font-semibold text-primary-black">
              Explore Top Products According to Your Need
            </h1>
            <div className="col-span-full h-48 lg:h-60 md:h-72 rounded-lg w-full overflow-hidden">
              <img
                className="w-full h-[300px]"
                src={product_banner}
                alt="Sofa Banner"
              />
            </div>
            <div className="col-span-full flex">
              <div className="h-32 md:h-60 lg:h-96 rounded-lg w-1/2 overflow-hidden mt-3 lg:mt-5">
                <img
                  className="h-full"
                  src={product_banner_3}
                  alt="Sofa Banner"
                />
              </div>
              <div className="h-32 md:h-60 lg:h-96 rounded-lg w-1/2 ml-3 lg:ml-5 overflow-hidden mt-3 lg:mt-5 ">
                <img
                  className="block h-1/2 w-full"
                  src={product_banner_2}
                  alt="Sofa Banner"
                />
                <img
                  className="block h-1/2 w-full mt-3 lg:mt-5"
                  src={product_banner_1}
                  alt="Sofa Banner"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`${
          showFilters ? "w-56" : "w-0"
        } overflow-hidden block lg:hidden transform-all duration-200 fixed bg-white top-20 right-0`}
      >
        <div className="relative p-5 pt-10">
          <button
            onClick={() => setShowFilters(false)}
            className="absolute top-0 right-5 text-lg font-semibold"
          >
            x
          </button>
          <Accordion
            className="w-full border-t-2 border-dark-gray"
            open={open === 1}
          >
            <AccordionHeader
              className="flex text-center font-normal text-black mb-3 text-base py-1 relative"
              onClick={() => handleOpen(1)}
            >
              Price <span className="rotate-90 absolute right-2">{`>`}</span>
            </AccordionHeader>
            <AccordionBody className="py-0">
              <ul className="space-y-2 pl-2">
                <li>
                  <button>Low to High</button>
                </li>
                <li>
                  <button>High to Low</button>
                </li>
              </ul>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Products;
