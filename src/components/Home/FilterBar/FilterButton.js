import { Button, Menu } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import FilterMenuItem from "./FilterMenuItem";

const FilterButton = ({ category }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        variant="standard"
        color="primary"
        margin="normal"
        size="large"
        onClick={handleMenu}
        endIcon={<ArrowDropDownSharpIcon size="small" color="primary" />}
      >
        {category.name}
      </Button>
      <Menu
        id="menu-filter"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {category.sub_categories.map((sub_category) => (
          <FilterMenuItem sub_category={sub_category} clicker={closeMenu} />
        ))}
      </Menu>
    </div>
  );
};

export default FilterButton;
