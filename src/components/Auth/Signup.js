import { Link as UiLink, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../ui/InputField";
import SubmitButton from "../ui/SubmitButton";
import GoogleLogin from "./GoogleLogin";
import { register } from "../../store/actions/authActions";

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
  const isSignedUp = useSelector((state) => state.auth.isSignedUp);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSignedUp) {
      navigate("/login");
    }
  }, [isSignedUp, navigate]);

  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(register(values));
      setIsLoading(false);
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
        <SubmitButton text="Sign Up" disabled={isLoading} />
      </form>
      <GoogleLogin />
    </Fragment>
  );
};

export default Signup;
