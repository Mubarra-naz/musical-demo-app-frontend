import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import FlexBox from "../../ui/FlexBox";
import AudioWave from "./AudioWave";
import { useDispatch } from "react-redux";
import { downloadAudio } from "../../../store/actions/trackActions";
import { showNotification } from "../../../store/uiSlice";

const Track = ({ track }) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {};
  const addToFavoriteHandler = () => {};

  const downloadHandler = () => {
    downloadAudio(track.id)
      .then((data) => {
        const link = document.createElement("a");
        link.href = data.url;
        link.setAttribute("download", "audio.opus");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        dispatch(
          showNotification({
            status: "error",
            title: "Error",
            message: error.message,
          })
        );
      });
  };
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
