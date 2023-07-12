import { Box } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { getShopByOwnerId } from "../services/shop";
import { useQuery } from "@tanstack/react-query";

const RootLayout = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["owner", "shops"],
    queryFn: getShopByOwnerId("1"),
  });
  return (
    <Box className="flex flex-row">
      <Sidebar />
      <Box className="flex-1 overflow-auto p-4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
