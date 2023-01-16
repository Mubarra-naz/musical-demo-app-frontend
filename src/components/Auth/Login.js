import { Button, Link as UiLink, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import InputField from "../ui/InputField";
import SubmitButton from "../ui/SubmitButton";
import AppSetting from "../../config";
import axios from "axios";
import { authActions } from "../../store/authSlice";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${AppSetting.API_URL}/users/sign_in`,
          JSON.stringify({
            user: values,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch(authActions.setCredentials(response.data));
        navigate("/");
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Logged in successfully",
          })
        );
      } catch (error) {
        let msg;
        if (!error?.response) {
          msg = "No server response";
        } else if (error.response?.status === 401) {
          msg = "Invalid Email or Password";
        } else {
          msg = "Login Failed";
        }
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: msg,
          })
        );
      }
      setIsLoading(false);
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {});

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
      <Button>Continue With Google</Button>
    </Fragment>
  );
};

export default Login;
