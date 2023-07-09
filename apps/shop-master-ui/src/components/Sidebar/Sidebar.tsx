import { Box, Stack, Typography } from "ui";

import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./utils";

const Sidebar = () => {
  return (
    <Box className={"h-screen w-[250px] border-r-2 border-dotted p-4"}>
      <Box className={"flex flex-col"}>
        <Typography variant="h5" color={"primary"} className="mb-4">
          Shop Master
        </Typography>

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
