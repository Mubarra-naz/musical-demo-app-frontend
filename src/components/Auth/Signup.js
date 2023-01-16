import { Button, Link as UiLink, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import InputField from "../ui/InputField";
import SubmitButton from "../ui/SubmitButton";
import AppSetting from "../../config";
import axios from "axios";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[%&*$!@#])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${AppSetting.API_URL}/users`,
          JSON.stringify({
            user: {
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              password: values.password,
              confirm_password: values.confirmPassword,
            },
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        navigate("/login");
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Signed up successfully",
          })
        );
      } catch (error) {
        let msg;
        if (!error.response) {
          msg = "No server response";
        } else if (error.response.status === 422) {
          msg = error.response.data.error;
        } else {
          msg = "Registration Failed";
        }
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: msg,
          })
        );
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <Fragment>
      <Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign Up
        </Typography>
        <Typography variant="body2" align="center">
          {"Don't have an account yet? "}
          <UiLink
            component={Link}
            to="/login/"
            align="center"
            variant="secondary"
            underline="always"
          >
            Login here
          </UiLink>
        </Typography>
      </Fragment>
      <form onSubmit={signupFormik.handleSubmit}>
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          value={signupFormik.values.firstName}
          handleChange={signupFormik.handleChange}
          touched={signupFormik.touched.firstName}
          error={signupFormik.errors.firstName}
        />
        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          value={signupFormik.values.lastName}
          handleChange={signupFormik.handleChange}
          touched={signupFormik.touched.lastName}
          error={signupFormik.errors.lastName}
        />
        <InputField
          id="email"
          label="Email"
          name="email"
          type="email"
          value={signupFormik.values.email}
          handleChange={signupFormik.handleChange}
          touched={signupFormik.touched.email}
          error={signupFormik.errors.email}
        />
        <InputField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={signupFormik.values.password}
          handleChange={signupFormik.handleChange}
          touched={signupFormik.touched.password}
          error={signupFormik.errors.password}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={signupFormik.values.confirmPassword}
          handleChange={signupFormik.handleChange}
          touched={signupFormik.touched.confirmPassword}
          error={signupFormik.errors.confirmPassword}
        />
        <SubmitButton text="Sign Up" />
      </form>
      <Button>Continue With Google</Button>
    </Fragment>
  );
};

export default Signup;
