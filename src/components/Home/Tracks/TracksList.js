import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Track from "./Track";

const TracksList = ({ items }) => {
  if (items.length === 0) {
    return <Typography>No items found</Typography>;
  }

  return (
    <Table sx={{ width: "100%" }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "20%" }}>
            <Typography color="primary">Title/Artist</Typography>
          </TableCell>
          <TableCell sx={{ width: "10%" }}></TableCell>
          <TableCell sx={{ width: "40%" }}></TableCell>
          <TableCell sx={{ width: "10%" }}>
            <Typography color="primary">Duration</Typography>
          </TableCell>
          <TableCell sx={{ width: "20%" }}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((track) => (
          <TableRow key={track.attributes.id}>
            <Track track={track.attributes} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TracksList;
