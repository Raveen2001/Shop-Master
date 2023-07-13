import { Box } from "ui";
import Profile from "./components/Profile";
import SelectShop from "./components/SelectShop";

const Topbar = () => {
  return (
    <Box className="sticky inset-0 z-50 flex h-20 w-full items-center justify-between bg-white/60 p-4 drop-shadow-sm backdrop-blur">
      <SelectShop />
      <Box>
        <Profile />
      </Box>
    </Box>
  );
};

export default Topbar;
