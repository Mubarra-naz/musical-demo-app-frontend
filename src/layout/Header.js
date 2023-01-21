import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link, Button, IconButton, Menu, MenuItem } from "@mui/material/";
import AppBar from "../components/ui/AppBar";
import Toolbar from "../components/ui/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { logout } from "../store/actions/authActions";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};
const leftLink = {
  fontSize: 16,
  color: "common.white",
  mr: 3,
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const profileHandler = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    setAnchorEl(null);
    dispatch(logout(token))
      .unwrap()
      .then(() => navigate("/", { replace: true }));
  };

  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href={"/"}
            sx={leftLink}
          >
            {"Musical App".toUpperCase()}
          </Link>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            href="/"
            sx={leftLink}
          >
            {"Pricing"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {!isAuth && (
              <Link
                variant="h6"
                underline="none"
                href="/login/"
                sx={{ ...rightLink }}
              >
                {"Sign In"}
              </Link>
            )}
            {isAuth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={profileHandler}>Profile</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
