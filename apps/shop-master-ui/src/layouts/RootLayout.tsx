import { Box } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { getOwnerByToken } from "../services/owner";
import { useQuery } from "@tanstack/react-query";
import { useGlobalStore } from "../store/globalStore";
import { useEffect } from "react";
import { getShopsByOwnerId } from "../services/shop";

const RootLayout = () => {
  const [setSelectedShopId, setShops, setOwner] = useGlobalStore((state) => [
    state.setSelectedShopId,
    state.setShops,
    state.setOwner,
  ]);
  const ownerQuery = useQuery({
    queryKey: ["owner", "me"],
    queryFn: getOwnerByToken,
  });

  const shopsQuery = useQuery({
    queryKey: ["shops", "owner", ownerQuery.data?.data.id],
    queryFn: getShopsByOwnerId(ownerQuery.data?.data.id ?? ""),
    enabled: !!ownerQuery.data,
  });

  useEffect(() => {
    if (!ownerQuery.isLoading && !ownerQuery.isError) {
      setOwner(ownerQuery.data.data);
    }
  }, [ownerQuery.isError, ownerQuery.isLoading, ownerQuery.data, setOwner]);

  useEffect(() => {
    if (!shopsQuery.isLoading && !shopsQuery.isError) {
      setShops(shopsQuery.data.data.rows);
      setSelectedShopId(shopsQuery.data.data.rows[0]?.id);
    }
  }, [
    setSelectedShopId,
    setShops,
    shopsQuery.data,
    shopsQuery.isError,
    shopsQuery.isLoading,
  ]);

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
