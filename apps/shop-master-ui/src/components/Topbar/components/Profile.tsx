import React from "react";
import {
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "ui";
import AvatarWithFallback from "ui/components/StringAvatar";

import { useGlobalStore } from "../../../store/globalStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const owner = useGlobalStore((state) => state.owner);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AvatarWithFallback
            fallbackName={owner?.name ?? ""}
            src={owner?.image}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        className="backdrop-blur"
        sx={{
          "& .MuiPaper-root": {
            width: "225px",
            padding: "10px",
          },
        }}
      >
        <Box className="p-2 pt-1">
          <Typography variant="subtitle2">{owner?.name}</Typography>
          <Typography variant="body2" color={"text.secondary"}>
            {owner?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose} className="mt-2 rounded p-2">
          <Typography variant="subtitle2">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={logout} className="rounded p-2">
          <Typography variant="subtitle2" color="error">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
