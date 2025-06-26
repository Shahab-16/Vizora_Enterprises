import React, { useContext, useEffect, useState } from "react";
import shopContext from "../context/shopContext";
import userContext from "../context/userContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const Orders = () => {
  const [checkout, setCheckout] = useState(false);
  const { getCart, cart, removeFromCart, removeOneFromCart, addToCart } =
    useContext(shopContext);

  const { user } = useContext(userContext);

  const getTotalPrice = () => {
    var price = 0;
    cart.forEach((item) => {
      if (item.product) {
        price += item.product.price * item.quantity;
      }
    });
    return price;
  };

  const getNetPrice = (discount = 0) => {
    var price = 0;
    cart.forEach((item) => {
      if (item.product) {
        price += item.product.price * item.quantity;
      }
    });
    return price - discount;
  };

  const handleProceedToCheckout = () => {
    setCheckout(true);
  };

  useEffect(() => {
    if (user && !cart) {
      getCart();
    }
  }, [user]);
  return (
    <div className="grid grid-cols-12 my-7">
      {checkout && (
        <div className="col-span-12 text-xl text-center border-b-2 pb-3 relative">
          Checkout
          <span className="absolute right-3 text-sm text-gray-700">
            {" "}
            Secure Payment
          </span>
        </div>
      )}
      {!checkout ? (
        <div className="col-span-8">
          <div className="flex justify-between">
            <div className="text-xl lg:text-2xl font-semibold text-primary-black">
              Your Cart ({cart.length} items)
            </div>
            <div className="flex">
              <div className="h-10 border-2 rounded-lg content-center">
                <input
                  className="text-sm pl-3"
                  type="text"
                  placeholder="Enter Pin Code"
                />
                <button className="bg-primary-purple text-white h-full px-3 rounded-r-lg text-sm">
                  Check
                </button>
              </div>
              <button className="text-sm text-primary-purple mx-5">
                Locate
              </button>
            </div>
          </div>
          <div className="border-2 rounded-lg mt-5">
            {cart &&
              cart.map((item) => {
                if (item.product)
                  return (
                    <div key={item.id} className="flex justify-between p-5">
                      <div className="flex">
                        <div className="relative">
                          <AdvancedImage
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
                        <div className="ml-5 relative">
                          <div className="text-lg font-semibold">
                            {item.product.productName}
                          </div>

                          <div className="text-sm text-primary-black">
                            ₹{item.product.price} {item.product.unit}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-red-500 text-xs font-medium absolute bottom-0"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                      <div>Delivery Date</div>
                    </div>
                  );
              })}
          </div>
        </div>
      ) : (
        <div className="col-span-8 relative">
          <button
            onClick={() => setCheckout(false)}
            className="absolute right-3 top-5 text-sm text-primary-purple"
          >
            close X
          </button>
          <div className="text-xl lg:text-2xl font-semibold text-primary-black mt-5 ">
            1. Choose Shipping Address
          </div>
          <div className="border-2 rounded-lg m-2">
            <button className="bg-primary-purple text-white font-medium py-0.5 px-5 flex  rounded-sm m-2">
              Add Shipping address
            </button>
          </div>
          <hr className=" text-gray-500 mx-auto border border-gray-300 my-5" />
          <div className="text-xl lg:text-2xl font-semibold text-primary-black mt-5 ">
            2. Payment Method
          </div>
          <div className="border-2 rounded-lg mx-5 my-3 p-3">
            {" "}
            TODO: RAZORPAY PAYMENT GATEWAY INTEGRATION
          </div>
          <hr className=" text-gray-500 mx-auto border border-gray-300 my-5" />
        </div>
      )}

      <div className="col-span-4">
        <div className="m-3 border-2 border-gray-400 bg-gray-100 rounded-lg">
          <h1 className="text-xl lg:text-2xl font-semibold text-primary-black p-3">
            Order Summary
          </h1>
          <div className="grid grid-cols-2 mx-3">
            <div className="space-y-2">
              <p>Price ({cart.length} items) : </p>
              <p>Delivery : </p>
              <p>Total : </p>
            </div>
            <div className=" space-y-2">
              <p>₹ {getTotalPrice()}</p>
              <p>FREE</p>
              <p>₹ {getNetPrice()}</p>
            </div>
          </div>
          <hr className="w-11/12 text-gray-500 mx-auto border border-gray-400 my-3" />
          <p className="ml-3 text-green-400 font-semibold">You Saved : ₹</p>
          <ol className="ml-3 list-disc">
            <li className="ml-4">Free Delivery</li>
            <li className="ml-4">Discount</li>
          </ol>
          <hr className="w-11/12 text-gray-500 mx-auto border border-gray-400 my-3" />
          <p className="ml-3 text-lg font-semibold">
            Total Amount Payable :{" "}
            <span className="text-red-600 ml-3">₹{getNetPrice()}</span>
          </p>
          <hr className="w-11/12 text-gray-500 mx-auto border border-gray-400 my-3" />
          <button
            onClick={() => handleProceedToCheckout()}
            className=" bg-primary-purple text-white font-medium py-1 px-12 flex mx-auto text-lg rounded-sm"
          >
            Proceed to Checkout
          </button>
          <p className="text-wrap text-xs mx-3 text-center my-3">
            By placing your order, you agree to Firefly’s{" "}
            <span className="text-primary-purple">privacy notice</span> and
            <span className="text-primary-purple">conditions to use</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
