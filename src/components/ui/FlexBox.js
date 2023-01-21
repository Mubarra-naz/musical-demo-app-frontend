import { Box } from "@mui/material";
import React from "react";

const FlexBox = (props) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        ...props.styles,
      }}
    >
      {props.children}
    </Box>
  );
};

export default FlexBox;
