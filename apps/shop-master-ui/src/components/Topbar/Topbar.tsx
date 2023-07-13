import { Box, MenuItem, Select } from "ui";
import { useGlobalStore } from "../../store/globalStore";
import Profile from "./components/Profile";

const Topbar = () => {
  const [selectedShopId, shops, setSelectedShopId] = useGlobalStore((state) => [
    state.selectedShopId,
    state.shops,
    state.setSelectedShopId,
  ]);
  return (
    <Box className="absolute inset-0 z-50 flex h-20 w-full items-center justify-between bg-white/60 p-4 drop-shadow-sm backdrop-blur">
      <Select
        labelId="select-shop-id"
        defaultValue={selectedShopId}
        label="Shop"
        key={selectedShopId}
        color="primary"
        onChange={(e) => setSelectedShopId(e.target.value as string)}
      >
        {Object.values(shops ?? {}).map((shop) => (
          <MenuItem
            value={shop.id}
            key={shop.id}
            onClick={() => setSelectedShopId(shop.id)}
          >
            {shop.name}
          </MenuItem>
        ))}
      </Select>

      <Box>
        <Profile />
      </Box>
    </Box>
  );
};

export default Topbar;
