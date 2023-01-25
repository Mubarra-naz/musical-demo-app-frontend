import { IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import FlexBox from "../ui/FlexBox";

const SearchBox = () => {
  return (
    <FlexBox
      styles={{
        justifyContent: "space-around",
        alignItems: "center",
        mt: 4,
        border: 2,
        borderRadius: "20px",
        borderColor: "primary.main",
      }}
    >
      <TextField
        placeholder="Search your music..."
        InputProps={{
          disableUnderline: true,
        }}
        sx={{ width: "80%" }}
        variant="standard"
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon
          color="inherit"
          sx={{ display: "block", color: "primary.main" }}
        />
      </IconButton>
    </FlexBox>
  );
};

export default SearchBox;
