import { Link as UiLink, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../ui/InputField";
import SubmitButton from "../ui/SubmitButton";
import GoogleLogin from "./GoogleLogin";
import { login } from "../../store/actions/authActions";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      dispatch(login({ user: values }));
      setIsLoading(false);
    },
    validationSchema: validationSchema,
  });

  return (
    <Fragment>
      <Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign In
        </Typography>
        <Typography variant="body2" align="center">
          {"Don't have an account yet? "}
          <UiLink
            component={Link}
            to="/signup/"
            align="center"
            variant="secondary"
            underline="always"
          >
            Sign Up here
          </UiLink>
        </Typography>
      </Fragment>
      <form onSubmit={loginFormik.handleSubmit}>
        <InputField
          id="email"
          label="Email"
          name="email"
          type="email"
          value={loginFormik.values.email}
          handleChange={loginFormik.handleChange}
          touched={loginFormik.touched.email}
          error={loginFormik.errors.email}
        />
        <InputField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={loginFormik.values.password}
          handleChange={loginFormik.handleChange}
          touched={loginFormik.touched.password}
          error={loginFormik.errors.password}
        />
        <SubmitButton text="Login" disabled={isLoading} />
      </form>
      <GoogleLogin />
    </Fragment>
  );
};

export default Login;
