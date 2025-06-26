import React, { useEffect, useState, useContext } from "react";
import { ClosedEye, Google, OpenEye } from "../../assets/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import page_break from "../../assets/images/page_break.png";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { motion } from "framer-motion";
import working_girl from "../../assets/images/working_girl.png";
import { images } from "../../assets/asset";

const SignUp = () => {
  const { signup, googleSignin } = useContext(UserContext);
  const [view, setView] = useState("password");
  const [showBackground, setShowBackground] = useState(window.innerWidth > 1140);

  useEffect(() => {
    const handleResize = () => setShowBackground(window.innerWidth > 1140);
    document.body.style.backgroundColor = "#cfdfe0";
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.backgroundColor = "";
    };
  }, []);

  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Required"),
    phone: Yup.string().length(10, "Must be 10 digits").required("Required"),
    agreeToTerms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  });

  return (
    <div className="h-screen w-screen flex">
      {/* Left side - SignUp box */}
      <div className="w-full xl:w-1/2 flex justify-center items-center bg-[#f0f4f8]">
        <motion.div
          className="backdrop-blur-md bg-white/80 min-h-[90vh] p-6 rounded-2xl shadow-lg w-full max-w-md mx-5 flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img className="w-[200px] mx-auto mb-4" src={images.vizoraLogo} alt="Vizora Logo" />
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              phone: "",
              agreeToTerms: false,
            }}
            validationSchema={SignupValidationSchema}
            onSubmit={(values) => signup(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full h-11 rounded-lg bg-[#f2fbfc] border border-gray-300 px-4 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    {errors.name && touched.name && errors.name}
                  </div>
                </div>

                <div className="mb-4">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email address"
                    className="w-full h-11 rounded-lg bg-[#f2fbfc] border border-gray-300 px-4 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className="mb-4 relative">
                  <Field
                    type={view}
                    name="password"
                    placeholder="Password"
                    className="w-full h-11 rounded-lg bg-[#f2fbfc] border border-gray-300 px-4 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                  <span
                    onClick={() => setView(view === "text" ? "password" : "text")}
                    className="absolute top-3 right-4 cursor-pointer"
                  >
                    {view === "text" ? ClosedEye : OpenEye}
                  </span>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>

                <div className="mb-4">
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full h-11 rounded-lg bg-[#f2fbfc] border border-gray-300 px-4 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    {errors.phone && touched.phone && errors.phone}
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Field type="checkbox" name="agreeToTerms" id="agreeToTerms" className="mr-2" />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                    I accept all Terms and Conditions
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white h-11 rounded-lg hover:bg-purple-700 transition-all text-lg font-medium"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>

          <img className="mx-auto h-5 my-6" src={page_break} alt="or" />

          <motion.button
            onClick={googleSignin}
            className="flex w-full items-center justify-center py-2 bg-white border border-gray-300 rounded-full hover:shadow-md transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {Google}
            <span className="ml-2 font-medium text-gray-700">Continue with Google</span>
          </motion.button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Background image */}
      {showBackground && (
        <div
          className="hidden xl:flex w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${working_girl})` }}
        > <img src={images.house_login} alt="" /></div>
      )}
    </div>
  );
};

export default SignUp;
