import React, { useContext, useEffect, useState } from "react";
import { phone_white, plus } from "../assets/icons";
import userContext from "../context/userContext";
import shopContext from "../context/shopContext";
import editorContext from "../context/editorContext";
import { cld } from "../util/cloudinaryConfig";
import { AdvancedImage } from "@cloudinary/react";
import { useNavigate } from "react-router-dom";
import FloorPlanUploadModal from "./FloorPlanUploadModal";

const Dashboard = () => {
  const { models, getAllModels } = useContext(shopContext);
  const { userModels, user } = useContext(userContext);
  const { setRoomModel, setIsEditing, setModel } = useContext(editorContext);
  const navigate = useNavigate();
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);

  useEffect(() => {
    getAllModels();
  }, []);

  const getDaysAgo = (date) => {
    const today = new Date();
    const created = new Date(date);
    const diffTime = Math.abs(today - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `Completed ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  };

  return (
    <div className="grid grid-cols-12 my-10 mx-2 lg:mx-5 xl:mx-0">
      <div className="col-span-full bg-light-gray rounded-lg pt-4 px-5 lg:px-10">
        <div className="flex justify-between">
          <h1 className="text-xl lg:text-2xl font-semibold text-primary-black">
            My Projects
          </h1>
          <button className="flex text-sm lg:text-base px-3 py-2 text-white bg-primary-purple rounded-md">
            <span className="flex h-5 w-5 mr-2 -mt-0.5 lg:mt-0 lg:h-auto lg:w-auto">
              {phone_white}
            </span>
            Book a consultant
          </button>
        </div>
        <div className="flex w-full overflow-x-auto py-5 lg:space-x-10">
          <button
            className="hidden lg:block border-2 border-dashed border-primary-black rounded-lg min-w-44"
            onClick={() => {
              setShowFloorPlanModal(true);
            }}
          >
            <div className="flex justify-center">{plus}</div>
            <p className="font-semibold text-lg">
              Click to <br />
              Add Your Home
            </p>
          </button>
          <div className="space-x-10 flex ">
            {userModels &&
              userModels.map((model) => {
                return (
                  <div className="bg-dark-gray border-2 border-dark-gray rounded-lg p-2 min-w-44">
                    <AdvancedImage
                      cldImg={cld
                        .image(model.imageUrl)
                        .addTransformation(
                          "q_auto,c_auto,g_auto,h_200,w_200,r_10"
                        )}
                    />

                    <p className="mt-2.5 text-sm font-medium text-green-600">
                      Ready to use
                    </p>
                    <h3 className="my-1.5 font-semibold text">
                      {model.modelName}
                    </h3>
                    <p className="mb-2.5 text-[10px] font-semibold text-gray-600">
                      {getDaysAgo(model.createdAt)}
                    </p>
                    <button
                      onClick={() => {
                        setModel(model);
                        setIsEditing(true);
                        setRoomModel(model);
                        navigate("/editor");
                      }}
                      className="w-full py-1 text-center text-sm font-medium border rounded-[3px] border-primary-purple text-primary-purple"
                    >
                      Edit Design
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="col-span-full">
        <button className="block lg:hidden border-2 border-dashed border-primary-black rounded-lg w-full bg-light-gray mt-5 py-10">
          <div className="flex justify-center ">{plus}</div>
          <p className="font-semibold text-lg">
            Click to <br />
            Add Your Home
          </p>
        </button>
      </div>
      <div className="col-span-full lg:hidden  space-y-5 ">
        <h1 className="text-2xl font-semibold text-primary-black my-5">
          Help Videos
        </h1>
        <div className="flex overflow-x-auto space-x-5 pb-3 w-full">
          <div className="grid grid-cols-2 bg-dark-gray rounded-lg p-2 min-w-60">
            <img
              className="h-28 w-28 rounded-lg"
              src="https://via.placeholder.com/200"
              alt="Helping Vedio"
            />
            <div className="ml-2 relative">
              <p className="text-sm font-medium text-gray-600">How To</p>
              <p className="text-sm mt-2 font-medium text-primary-black">
                Move Products
              </p>
              <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
                30sec
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-dark-gray rounded-lg p-2 min-w-60">
            <img
              className="h-28 w-28 rounded-lg"
              src="https://via.placeholder.com/200"
              alt="Helping Vedio"
            />
            <div className="ml-2 relative">
              <p className="text-sm font-medium text-gray-600">How To</p>
              <p className="text-sm mt-2 font-medium text-primary-black">
                Move Products
              </p>
              <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
                30sec
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-dark-gray rounded-lg p-2 min-w-60">
            <img
              className="h-28 w-28 rounded-lg"
              src="https://via.placeholder.com/200"
              alt="Helping Vedio"
            />
            <div className="ml-2 relative">
              <p className="text-sm font-medium text-gray-600">How To</p>
              <p className="text-sm mt-2 font-medium text-primary-black">
                Move Products
              </p>
              <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
                30sec
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-dark-gray rounded-lg p-2 min-w-60">
            <img
              className="h-28 w-28 rounded-lg"
              src="https://via.placeholder.com/200"
              alt="Helping Vedio"
            />
            <div className="ml-2 relative">
              <p className="text-sm font-medium text-gray-600">How To</p>
              <p className="text-sm mt-2 font-medium text-primary-black">
                Move Products
              </p>
              <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
                30sec
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-dark-gray rounded-lg p-2 min-w-60">
            <img
              className="h-28 w-28 rounded-lg"
              src="https://via.placeholder.com/200"
              alt="Helping Vedio"
            />
            <div className="ml-2 relative">
              <p className="text-sm font-medium text-gray-600">How To</p>
              <p className="text-sm mt-2 font-medium text-primary-black">
                Move Products
              </p>
              <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
                30sec
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-dark-gray rounded-lg p-2 min-w-60">
            <img
              className="h-28 w-28 rounded-lg"
              src="https://via.placeholder.com/200"
              alt="Helping Vedio"
            />
            <div className="ml-2 relative">
              <p className="text-sm font-medium text-gray-600">How To</p>
              <p className="text-sm mt-2 font-medium text-primary-black">
                Move Products
              </p>
              <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
                30sec
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-9 col-span-full">
        <div className="bg-light-gray rounded-lg py-4 px-5 lg:px-10 mt-5 lg:mr-5">
          <h1 className="text-2xl font-semibold text-primary-black">
            Get Free 3D Demos
          </h1>
          <div className="flex w-full py-5 space-x-10 overflow-x-auto">
            <div className="bg-dark-gray border-2 border-dark-gray rounded-lg p-2 min-w-44">
              <img
                className="rounded-md w-full h-32"
                src="https://via.placeholder.com/200"
                alt="Rooms"
              />
              <p className="mt-2 text-sm font-medium text-green-600">
                Ready to use
              </p>
              <h3 className="mt-0.5 mb-1.5  font-semibold text">
                1 Bedroom Flat
              </h3>
              <button className="w-full py-1 text-center text-sm font-medium border rounded-[3px] border-primary-purple text-primary-purple">
                Try Demo
              </button>
            </div>
            <div className="bg-dark-gray border-2 border-dark-gray rounded-lg p-2 min-w-44">
              <img
                className="rounded-md w-full h-32"
                src="https://via.placeholder.com/200"
                alt="Rooms"
              />
              <p className="mt-2 text-sm font-medium text-green-600">
                Ready to use
              </p>
              <h3 className="mt-0.5 mb-1.5 font-semibold text">
                2 Bedroom Flat
              </h3>

              <button className="w-full py-1 text-center text-sm font-medium border rounded-[3px] border-primary-purple text-primary-purple">
                Try Demo
              </button>
            </div>
            <div className="bg-dark-gray border-2 border-dark-gray rounded-lg p-2 min-w-44">
              <img
                className="rounded-md w-full h-32"
                src="https://via.placeholder.com/200"
                alt="Rooms"
              />
              <p className="mt-2 text-sm font-medium text-green-600">
                Ready to use
              </p>
              <h3 className="mt-0.5 mb-1.5 font-semibold text">
                3 Bedroom Flat
              </h3>
              <button className="w-full py-1 text-center text-sm font-medium border rounded-[3px] border-primary-purple text-primary-purple">
                Try Demo
              </button>
            </div>
          </div>
        </div>
        <div className="my-7">
          <h1 className="text-2xl lg:text-3xl text-primary-black font-semibold lg:text-center">
            Don’t Know How to Design ?
          </h1>
          <p className="lg:text-lg text-primary-black lg:text-center font-semibold my-3 lg:my-7 leading-6">
            Don’t Worry Our Experts will Design your house based on{" "}
            <br className="hidden lg:block" /> your requirements with a fixed
            price
          </p>
          <button
            onClick={() => setShowFloorPlanModal(true)}
            className="flex lg:mx-auto bg-primary-purple my-5 px-5 py-2 rounded-md text-white text-xl font-medium"
          >
            Upload Your Plan
          </button>
        </div>
      </div>
      <div className="col-span-3 hidden lg:block bg-light-gray rounded-md px-3 my-5 overflow-y-auto space-y-5 h-[570px]">
        <h1 className="text-2xl text-center font-semibold text-primary-black my-5">
          Help Videos
        </h1>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
        <div className="flex bg-dark-gray rounded-lg p-2">
          <img
            className="rounded-md w-32 h-full"
            src="https://via.placeholder.com/200"
            alt="Rooms"
          />
          <div className="ml-2 relative">
            <p className="text-sm font-medium text-gray-600">How To</p>
            <p className="text-sm mt-2 font-medium text-primary-black">
              Move Products
            </p>
            <span className=" absolute bottom-1 text-xs text-gray-500 font-medium">
              30sec
            </span>
          </div>
        </div>
      </div>
      {showFloorPlanModal && (
        <FloorPlanUploadModal
          setShowFloorPlanModal={setShowFloorPlanModal}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;
