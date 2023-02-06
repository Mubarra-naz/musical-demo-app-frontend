import { MenuItem } from "@mui/material";
import React from "react";

const FilterMenuItem = ({ sub_category, clicker }) => {
  return <MenuItem onClick={clicker}>{sub_category.name}</MenuItem>;
};

export default FilterMenuItem;
