import React from "react";
import MuiAppBar from "@mui/material/AppBar";

const AppBar = (props) => {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
};

export default AppBar;
