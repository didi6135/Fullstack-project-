import { Avatar, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import "./navBar.css";
import { setUser } from "../../features/tripSlice/TripSlice";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selector = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/home");
    }
  });

  const handlePrivateArea = () => {
    if (selector) {
      if (selector.role === "user") {
        navigate(`/privateArea/${selector.id}`);
      } else if (selector.role === "admin") {
        navigate(`/manageArea/${selector.id}`);
      }
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/home");
  };

  return (
    <>
      <div className="navBarContainer">
        <div className="logo"></div>
        {selector && (
          <div className="navBarPrivateDetails">
            <h3 className="firstNameAndLastName">
              {selector.firstName} {selector.lastName}
            </h3>
            <Avatar
              onClick={handleMenu}
              sx={{
                curser: "pointer",
              }}
            >
              {selector.firstName.charAt(0).toUpperCase()}
              {selector.lastName.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handlePrivateArea}>
                  <AccountCircleOutlinedIcon />
                  &nbsp; My account
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <MeetingRoomOutlinedIcon /> &nbsp; Log out
                </MenuItem>
              </Menu>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
