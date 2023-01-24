import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import FlexBox from "../../ui/FlexBox";
import AudioWave from "./AudioWave";

const Track = ({ track }) => {
  const addToCartHandler = () => {};
  const addToFavoriteHandler = () => {};

  const downloadHandler = () => {};
  return (
    <>
      <TableCell>
        <Typography variant="subtitle1">{track.name}</Typography>
        <Typography variant="subtitle2" color="primary.light">
          {track.artists
            .map(
              (artist) =>
                `${artist.data.attributes.first_name} ${artist.data.attributes.last_name}`
            )
            .join(", ")}
        </Typography>
      </TableCell>
      <AudioWave url={track.file} id={track.id} />
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
