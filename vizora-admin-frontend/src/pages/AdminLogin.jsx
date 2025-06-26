import React, { useState, useContext } from "react";
import { logo, long_logo, ClosedEye, OpenEye } from "../../public/assets/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AdminContext from "../contexts/adminContext";

const AdminLogin = () => {
  const { Login } = useContext(AdminContext);
  const [view, setView] = useState("password");

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <div className={`bg-[#cfdfe0] min-h-screen content-center`}>
      <div className="xl:w-4/12 mx-auto px-5 max-w-[500px]">
        <div className="flex justify-center">{long_logo}</div>
        <div className="text-center text-primary-black text-3xl font-extrabold mt-7">
          Admin Login
        </div>

        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            console.log("login values => ", values);
            Login(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8">
              <Field
                className="w-full h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                type="text"
                name="email"
                id="login_email"
                placeholder="Enter your email"
              />
              <span className="text-red-400 ml-3 text-sm">
                {errors.email && touched.email ? errors.email : ""}
              </span>
              <div className="relative">
                <Field
                  className="w-full h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                  type={view}
                  name="password"
                  id="login_password"
                  placeholder="Password"
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
              <span className="text-red-400 ml-3 text-sm ">
                {errors.password && touched.password ? errors.password : ""}
              </span>

              <button
                type="submit"
                className="mx-auto mt-10 h-11 px-10 block text-white rounded-md bg-primary-purple text-2xl font-jatkara"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default AdminLogin;
