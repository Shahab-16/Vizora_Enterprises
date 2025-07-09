  import React, { useState, useEffect, useContext } from "react";
  import { long_logo, ClosedEye, Google, OpenEye } from "../../assets/icons";
  import { Formik, Form, Field } from "formik";
  import * as Yup from "yup";
  import page_break from "../../assets/images/page_break.png";
  import working_girl from "../../assets/images/working_girl.png";
  import { Link } from "react-router-dom";
  import UserContext from "../../context/userContext";
  import { motion } from "framer-motion";
  import { images } from "../../assets/asset";
  const UserLogin = () => {
    const { login, googleSignin } = useContext(UserContext);
    const [showBackground, setShowBackground] = useState(window.innerWidth > 1140);
    const [view, setView] = useState("password");

    useEffect(() => {
      const handleResize = () => {
        setShowBackground(window.innerWidth > 1140);
      };
      document.body.style.backgroundColor = "#cfdfe0";
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        document.body.style.backgroundColor = "";
      };
    }, []);

    const LoginValidationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(5, "Too Short!").max(50, "Too Long!").required("Required"),
    });

  return (
    <div className="h-screen w-screen flex">
      {/* Left side - Login box */}
      <div className="w-full xl:w-1/2 flex justify-center items-center bg-[#f0f4f8]">
        <motion.div
          className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-lg w-full max-w-md mx-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img className="flex justify-centet items-center w-5/6 ml-4" src={images.vizoraLogo} alt="" />
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          <Formik
            initialValues={{ password: "", email: "" }}
            validationSchema={LoginValidationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    className="w-full h-11 rounded-lg bg-[#f2fbfc] border border-gray-300 px-4 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    type="text"
                    name="email"
                    placeholder="Email address"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className="mb-4 relative">
                  <Field
                    className="w-full h-11 rounded-lg bg-[#f2fbfc] border border-gray-300 px-4 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    type={view}
                    name="password"
                    placeholder="Password"
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

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white h-11 rounded-lg hover:bg-purple-700 transition-all text-lg font-medium"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <img className="mx-auto h-5 my-8" src={page_break} alt="or" />

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
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Background image */}
      {showBackground && (
        <div className="hidden xl:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${working_girl})` }}>
          {/* Optional: add overlay or text */}
        </div>
      )}
    </div>
  );

  };

  export default UserLogin;
