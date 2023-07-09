import React from "react";
import { Box } from "ui";

const SidebarItem: React.FC<ISidebarSubItem> = ({
  name,
  path,
  icon,
  items,
}) => {
  return (
    <Box>
      {icon}
      {name}
    </Box>
  );
};

export default SidebarItem;
