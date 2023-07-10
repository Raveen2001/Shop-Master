import { Box } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Box className="flex flex-row">
      <Sidebar />
      <Box className="flex-1 p-4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
