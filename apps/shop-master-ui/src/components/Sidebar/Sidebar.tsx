import { Box, Button, Typography, IconButton } from "ui";
import { Close } from "ui/icons";

import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_ITEMS } from "./constant";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <Box className="flex h-full w-[250px] flex-col border-r-2 border-dotted bg-white">
      {/* Fixed Header */}
      <Box className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-4">
        <Box className="flex items-center justify-between">
          <Typography variant="h5" color={"secondary"}>
            Shop Master
          </Typography>
          {/* Close button for mobile */}
          <IconButton onClick={onClose} className="lg:hidden" size="small">
            <Close />
          </IconButton>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box className="flex-1 overflow-y-auto px-4 py-4">
        <Box className="flex flex-col gap-1">
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

      {/* Fixed Footer */}
      <Box className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
