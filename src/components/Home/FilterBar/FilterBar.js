import React from "react";
import FlexBox from "../../ui/FlexBox";
import FilterButton from "./FilterButton";

const FilterBar = ({ categories }) => {
  return (
    <FlexBox
      styles={{
        justifyContent: "flex-start",
        alignItems: "center",
        my: 2,
        py: 2,
        boxShadow: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      {categories.map((category) => (
        <FilterButton category={category} key={category.id} />
      ))}
    </FlexBox>
  );
};

export default FilterBar;
