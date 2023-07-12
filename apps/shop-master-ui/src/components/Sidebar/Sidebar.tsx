import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "ui";

import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./utils";
import { useGlobalStore } from "../../store/globalStore";

const Sidebar = () => {
  const [selectedShopId, shops, setSelectedShopId] = useGlobalStore((state) => [
    state.selectedShopId,
    state.shops,
    state.setSelectedShopId,
  ]);

  return (
    <Box
      className={
        "h-screen min-w-[250px] max-w-[250px] border-r-2 border-dotted py-4"
      }
    >
      <Box className={"flex flex-col"}>
        <Typography variant="h5" color={"primary"} className="mb-4 px-4">
          Shop Master
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            defaultValue={selectedShopId}
            label="Shop"
            key={selectedShopId}
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

        <Box className={"flex flex-col gap-1"}>
          {sidebarItems.map((item) => (
            <CollapsibleItem
              name={item.name}
              key={item.name}
              content={item.items.map((subItem) => (
                <SidebarItem {...subItem} key={subItem.name} />
              ))}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
