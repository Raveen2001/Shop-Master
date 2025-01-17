import { Box, Typography } from "ui";

import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEMS } from "./constant";

const Sidebar = () => {
  return (
    <Box
      className={
        "h-screen min-w-[250px] max-w-[250px] border-r-2 border-dotted py-4"
      }
    >
      <Box className={"flex flex-col"}>
        <Typography variant="h5" color={"secondary"} className="mb-4 px-4">
          Shop Master
        </Typography>

        <Box className={"flex flex-col gap-1"}>
          {SIDEBAR_ITEMS.map((item) => (
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
