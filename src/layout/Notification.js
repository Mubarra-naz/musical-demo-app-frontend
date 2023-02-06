import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Notification = (props) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={props.status}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}
      </Alert>
    </Stack>
  );
};

export default Notification;
