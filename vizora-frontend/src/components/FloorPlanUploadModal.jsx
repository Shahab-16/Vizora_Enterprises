import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomizedSteppers from "./CustomizedStepper";
import * as Yup from "yup";
import editorContext from "../context/editorContext";
import { useNavigate } from "react-router-dom";

const SingleRoomModal = ({ setShowSingleRoomModal }) => {
  const navigate = useNavigate();
  const { setSingleRoom } = useContext(editorContext);
  const validationSchema = Yup.object({
    roomName: Yup.string().required("Room Name is required"),
    length: Yup.number()
      .required("Length is required")
      .positive("Length must be positive"),
    width: Yup.number()
      .required("Width is required")
      .positive("Width must be positive"),
    height: Yup.number()
      .required("Height is required")
      .positive("Height must be positive"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
        <h1 className="text-2xl">Enter Room Details</h1>
        <Formik
          initialValues={{ roomName: "", length: "", width: "", height: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setSingleRoom({
              modelUrl:
                "https://res.cloudinary.com/diwmwhu0x/image/upload/v1725445381/vzei0bjttsk3dxvihvrj.glb",
              modelName: values.roomName,
              scale: [values.length, values.width, values.height],
            });
            setShowSingleRoomModal(false);
            navigate("/editor");
          }}
        >
          {() => (
            <Form className="my-5 space-y-3">
              <div className="border-b-2 border-gray-400">
                <Field
                  id="roomName"
                  name="roomName"
                  placeholder="Project Name*"
                  className="w-full p-2"
                />
                <ErrorMessage
                  name="roomName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="border-b-2 border-gray-400">
                <Field
                  id="length"
                  name="length"
                  placeholder="Length*"
                  className="w-full p-2"
                />
                <ErrorMessage
                  name="length"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="border-b-2 border-gray-400">
                <Field
                  id="width"
                  name="width"
                  placeholder="Width*"
                  className="w-full p-2"
                />
                <ErrorMessage
                  name="width"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="border-b-2 border-gray-400">
                <Field
                  id="height"
                  name="height"
                  placeholder="Height*"
                  className="w-full p-2"
                />
                <ErrorMessage
                  name="height"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const FloorPlanUploadModal = ({ user, setShowFloorPlanModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showSingleRoomModal, setShowSingleRoomModal] = useState();
  console.log("USER in floorplan = ", user);

  const initialValues = {
    userEmail: user.email,
    modelName: "",
    modelPlan: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-full h-[90vh] m-20">
        <button
          onClick={() => {
            setShowFloorPlanModal(false);
          }}
          className="absolute top-2 right-4 text-lg bg-gray-200 px-2 py-0.5 rounded-lg"
        >
          X
        </button>
        <div className="flex w-fit mx-auto">
          <CustomizedSteppers
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
        {activeStep === 0 && (
          <div className="m-10 ">
            <h1 className="text-5xl font-medium">Add new 3D home</h1>
            <div className="flex w-full my-10 justify-around">
              <div className="border-2 rounded-lg py-5 px-32">
                <h2 className="text-2xl font-medium text-center">
                  Upload a Floorplan
                </h2>
                <button className="bg-gray-800 flex  rounded-md px-5 py-2 mt-7 mx-auto text-gray-100">
                  Upload floorplan
                </button>
                <p className="text-sm mt-4 mb-5">
                  File type - JPEG, PDF, PNG (max 10MB)
                </p>
              </div>
              <div className="border-2 rounded-lg py-5 px-32">
                <h2 className="text-2xl font-medium text-center">
                  Create Single room
                </h2>
                <p className="text-center text-sm text-gray-700">(Instant)</p>
                <button
                  onClick={() => setShowSingleRoomModal(true)}
                  className="border border-gray-800 flex  rounded-md px-5 py-2 mt-7 mx-auto "
                >
                  Enter Dimensions
                </button>
                <p className="text-sm mt-4 mb-5">
                  Length, width and height of your room
                </p>
              </div>
            </div>
            {showSingleRoomModal && (
              <SingleRoomModal
                setShowSingleRoomModal={setShowSingleRoomModal}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPlanUploadModal;
