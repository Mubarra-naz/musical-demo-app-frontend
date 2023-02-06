import MuiToolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

export default Toolbar;
