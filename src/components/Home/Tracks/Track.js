import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import FlexBox from "../../ui/FlexBox";

const Track = ({ track }) => {
  const addToCartHandler = () => {};
  const addToFavoriteHandler = () => {};

  const downloadHandler = () => {};
  return (
    <>
      <TableCell>
        <Typography variant="subtitle1">{track.name}</Typography>
        <Typography variant="subtitle2" color="primary.light">
          {track.artist.name}
        </Typography>
      </TableCell>
      <TableCell>{"audio form"}</TableCell>
      <TableCell>{track.duration}</TableCell>
      <TableCell>
        <FlexBox>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="fav-icon"
            onClick={addToFavoriteHandler}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="download-icon"
            onClick={downloadHandler}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="cart-icon"
            onClick={addToCartHandler}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </FlexBox>
      </TableCell>
    </>
  );
};

export default Track;
