import { Box, IconButton } from "ui";
import { Menu } from "ui/icons";
import Profile from "./components/Profile";
import SelectShop from "./components/SelectShop";

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <Box className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white/60 p-4 drop-shadow-sm backdrop-blur">
      <Box className="flex items-center gap-4">
        {/* Hamburger menu button for mobile */}
        <IconButton onClick={onMenuClick} className="lg:hidden" size="small">
          <Menu />
        </IconButton>
        <SelectShop />
      </Box>
      <Box>
        <Profile />
      </Box>
    </Box>
  );
};

export default Topbar;
