import React, { useEffect, useState, useContext } from "react";
import { logo, long_logo, ClosedEye, OpenEye } from "../../public/assets/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AdminContext from "../contexts/adminContext";

const SignUp = () => {
  const { Signin } = useContext(AdminContext);
  const [view, setView] = useState("password");

  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().length(10).required("Required"),
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#cfdfe0";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="h-full">
      <div className="lg:w-4/12 pt-10 pb-24 mx-auto my-auto h-[100vh] overflow-y-auto">
        <div className="flex justify-center">{long_logo}</div>
        <div className="text-center text-primary-black text-3xl font-extrabold mt-7">
          Create Admin Account
        </div>

        <Formik
          initialValues={{
            name: "",
            password: "",
            email: "",
            phone: "",
            agreeToTerms: false,
          }}
          validationSchema={SignupValidationSchema}
          onSubmit={(values) => {
            console.log("signup values => ", values);
            Signin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 ">
              <Field
                className="w-full h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
              />
              <span className="text-red-400 ml-3 text-sm border border-[#cfdfe0]">
                {errors.name && touched.name ? errors.name : ""}
              </span>

              <Field
                className="w-full h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                type="text"
                name="email"
                id="signup_emil"
                placeholder="Enter your email"
              />
              <span className="text-red-400 ml-3 text-sm border border-[#cfdfe0]">
                {errors.email && touched.email ? errors.email : ""}
              </span>
              <div className="relative">
                <Field
                  className="w-full h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                  type={view}
                  name="password"
                  id="signup_password"
                  placeholder="New Password"
                />
                <span
                  onClick={() =>
                    view === "text" ? setView("password") : setView("text")
                  }
                  className="absolute top-5 right-3"
                >
                  {view === "text" ? ClosedEye : OpenEye}
                </span>
              </div>
              <span
                className={`${
                  errors.password && touched.password ? "block" : "hidden"
                } text-red-400 ml-3 text-sm border border-[#cfdfe0]`}
              >
                {errors.password && touched.password ? errors.password : ""}
              </span>

              <Field
                className="w-full h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
              />
              <span className="block text-red-400 ml-3 text-sm border border-[#cfdfe0]">
                {errors.phone && touched.phone ? errors.phone : ""}
              </span>

              <button
                type="submit"
                className="mx-auto mt-7 h-11 px-10 block text-white rounded-md bg-primary-purple text-2xl font-jatkara"
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
