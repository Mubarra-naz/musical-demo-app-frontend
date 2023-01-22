import { Typography } from "@mui/material";
import React from "react";
import FlexBox from "../ui/FlexBox";
import FilterBar from "./FilterBar/FilterBar";
import SearchBox from "./SearchBox";
import SortBox from "./SortBox";
import TracksList from "./Tracks/TracksList";

const categories = [
  {
    id: 1,
    name: "Vocals",
    sub_categories: [
      {
        id: 1,
        name: "A capella",
      },
      { id: 2, name: "Choral" },
      { id: 3, name: "Background" },
    ],
  },
  {
    id: 2,
    name: "genres",
    sub_categories: [
      {
        id: 1,
        name: "A capella",
      },
      { id: 2, name: "Choral" },
      { id: 3, name: "Background" },
    ],
  },
  {
    id: 3,
    name: "types",
    sub_categories: [
      {
        id: 1,
        name: "A capella",
      },
      { id: 2, name: "Choral" },
      { id: 3, name: "Background" },
    ],
  },
];
const trackCount = 34;

const trackList = [
  {
    id: 1,
    name: "I'll be waiting",
    duration: "03:09",
    artist: {
      name: "Cian",
    },
  },
];
const Home = () => {
  return (
    <>
      <SearchBox />
      <FilterBar categories={categories} />
      <FlexBox
        styles={{
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <div>
          <Typography variant="h5">Tracks ({trackCount})</Typography>
        </div>
        <div>
          <FlexBox
            styles={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Sort By: </Typography>
            <SortBox />
          </FlexBox>
        </div>
      </FlexBox>
      <TracksList items={trackList} />
    </>
  );
};

export default Home;
