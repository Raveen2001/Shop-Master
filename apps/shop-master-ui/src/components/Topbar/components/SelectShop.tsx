import React from "react";
import { Button, Divider, Menu, MenuItem, Typography } from "ui";
import { useGlobalStore } from "../../../store/globalStore";
import { KeyboardArrowDown, StoreTwoTone } from "ui/icons";
import { Link } from "react-router-dom";

const SelectShop = () => {
  const [selectedShopId, selectedShop, shops, setSelectedShopId] =
    useGlobalStore((state) => [
      state.selectedShopId,
      state.selectedShop,
      state.shops,
      state.setSelectedShopId,
    ]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id: string) => {
    setSelectedShopId(id);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        disableElevation
        onClick={handleButtonClick}
        endIcon={<KeyboardArrowDown />}
        startIcon={<StoreTwoTone />}
      >
        {selectedShop?.name ?? "Select Shop"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        key={selectedShopId}
        open={open}
        onClose={handleClose}
        className="backdrop-blur"
        sx={{
          "& .MuiPaper-root": {
            width: "225px",
            padding: "5px",
          },
        }}
      >
        <Typography variant="caption" className="p-2 pt-1">
          Available shops
        </Typography>
        {Object.values(shops ?? {}).map((shop) => (
          <MenuItem
            className="rounded p-2"
            key={shop.id}
            selected={shop.id === selectedShopId}
            onClick={() => handleMenuItemClick(shop.id)}
          >
            <Typography variant="subtitle2">{shop.name}</Typography>
          </MenuItem>
        ))}
        <Divider />
        <Link to="/shops/manage">
          <MenuItem className="rounded p-2">
            <Typography variant="subtitle2">Manage Shops</Typography>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};

export default SelectShop;
