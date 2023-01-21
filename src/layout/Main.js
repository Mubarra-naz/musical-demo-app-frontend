import { Box, Container, Grid } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import Notification from "./Notification";
import Header from "./Header";
import { gapi } from "gapi-script";
import AppSetting from "../config";

let isInitial = true;

const Main = (props) => {
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
  }, [notification]);
  return (
    <Fragment>
      <Header></Header>
      <Container fixed>
        <Box sx={{ py: 5, px: 5, mt: 5 }}>
          {notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}
          {props.children}
        </Box>
      </Container>
    </Fragment>
  );
};

export default Main;
