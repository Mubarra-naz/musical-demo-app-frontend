import { IconButton, TableCell, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FlexBox from "../../ui/FlexBox";
import AudioWave from "./AudioWave";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadAudio,
  markFavourite,
  removeFavourite,
} from "../../../store/actions/trackActions";
import { showNotification } from "../../../store/uiSlice";
import { handleAsyncAction } from "../../../store";

const Track = ({ track }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const addToCartHandler = () => {};

  const showLoginError = () => {
    dispatch(
      showNotification({
        status: "error",
        title: "Error",
        message: "You need to Login before continuing",
      })
    );
  };

  const successCallback = (data) => {
    dispatch(
      showNotification({
        status: "success",
        title: "Success",
        message: data.payload.message,
      })
    );
  };
  const failureCallback = (error) => {
    dispatch(
      showNotification({
        status: "error",
        title: "Error",
        message: error.message,
      })
    );
  };
  const favoriteHandler = () => {
    if (!isLoggedIn) {
      showLoginError();
    } else {
      const action = track.is_favourite
        ? removeFavourite(track.id)
        : markFavourite(track.id);
      handleAsyncAction(dispatch, action, successCallback, failureCallback);
    }
  };

  const downloadHandler = () => {
    if (!isLoggedIn) {
      showLoginError();
    } else {
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
    }
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
            onClick={favoriteHandler}
          >
            {track.is_favourite ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />
            )}
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
