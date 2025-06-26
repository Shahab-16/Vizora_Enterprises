import React, { useEffect, useRef, useState, useContext } from "react";
import ShopContext from "../context/shopContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { plus } from "../assets/icons";
import { AdvancedImage } from "@cloudinary/react";
import userContext from "../context/userContext";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const Cart = ({ setShowCart, showCart, setActive }) => {
  const { getCart, cart, removeFromCart, removeOneFromCart, addToCart } =
    useContext(ShopContext);

  const { user } = useContext(userContext);

  useEffect(() => {
    if (user ) {
      getCart();
    }
  }, [user]);

  return (
    <>
      {showCart && (
        <div className="fixed top-0 right-0 bg-white p-4 w-[500px] border-2 h-full overflow-y-auto">
          <div className="flex justify-between">
            <div></div>
            <h1 className="text-center content-center text-xl font-semibold">
              Cart
            </h1>
            <button onClick={() => setShowCart(false)} className="text-2xl">
              x
            </button>
          </div>
          <hr />
          <div className="flex flex-col">
            <div className="flex flex-col justify-between mt-4 space-y-10">
              {cart?.length > 0 ? (
                cart.map((item) => {
                  if (item.product)
                    return (
                      <div key={item.product._id} className="flex ">
                        <div className="flex ml-3 relative">
                          <AdvancedImage
                            className="mx-auto"
                            cldImg={cld
                              .image(`${item.product.imageUrl}`)
                              .addTransformation(
                                "q_auto,c_auto,g_auto,h_150,w_200,r_10"
                              )}
                          />
                          <span className="flex text-gray-500 text-sm absolute bg-white rounded-md border-2 left-16  -bottom-3 h-fit">
                            <button
                              onClick={() => addToCart(item.product._id)}
                              className="px-2"
                            >
                              +
                            </button>
                            <span className="px-2 border-l-2 border-r-2 text-black font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                removeOneFromCart(item.product._id)
                              }
                              className="px-2"
                            >
                              -
                            </button>
                          </span>
                        </div>
                        <div className="ml-4 relative text-left">
                          <h1 className="text-xl h-fit font-medium">
                            {item.product.productName}
                          </h1>
                          <p className="h-fit">
                            {item.product.price} {item.product.unit}
                          </p>
                          <button
                            onClick={() => {
                              removeFromCart(item.product._id);
                            }}
                            className="text-xs text-red-500 absolute bottom-0"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    );
                })
              ) : (
                <h1>No items in cart</h1>
              )}
            </div>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => {
                setActive("orders");
                setShowCart(false);
              }}
              className="bg-primary-purple rounded-sm text-white font-medium px-8 py-0.5 flex mx-auto mb-10 mt-20"
            >
              Proceed
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
