import { Box, FormControl, InputLabel, MenuItem, Select } from "ui";
import { useGlobalStore } from "../../store/globalStore";

const Topbar = () => {
  const [selectedShopId, shops, setSelectedShopId] = useGlobalStore((state) => [
    state.selectedShopId,
    state.shops,
    state.setSelectedShopId,
  ]);
  return (
    <Box className="absolute inset-0 z-50 flex h-16 w-full items-center bg-white/60 p-4 backdrop-blur">
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-shop-id">Shop</InputLabel>
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
      </FormControl>
    </Box>
  );
};

export default Topbar;
