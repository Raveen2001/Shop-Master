import { Box, PageLoading } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { getOwnerByToken } from "../services/owner";
import { useQuery } from "@tanstack/react-query";
import { useGlobalStore } from "../store/globalStore";
import { useEffect, useMemo } from "react";
import { getShopsByOwnerId } from "../services/shop";
import Topbar from "../components/Topbar/Topbar";

const RootLayout = () => {
  const [selectedShopId, setSelectedShopId, setShops, setOwner] =
    useGlobalStore((state) => [
      state.selectedShopId,
      state.setSelectedShopId,
      state.setShops,
      state.setOwner,
    ]);
  const ownerQuery = useQuery({
    queryKey: ["owner", "me"],
    queryFn: getOwnerByToken,
  });

  const shopsQuery = useQuery({
    queryKey: ["shops"],
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

      if (!selectedShopId) setSelectedShopId(shopsQuery.data.data.rows[0]?.id);
    }
  }, [
    selectedShopId,
    setSelectedShopId,
    setShops,
    shopsQuery.data,
    shopsQuery.isError,
    shopsQuery.isLoading,
  ]);

  const isLoading = useMemo(
    () => ownerQuery.isLoading || shopsQuery.isLoading,
    [ownerQuery.isLoading, shopsQuery.isLoading]
  );

  const isError = useMemo(
    () => ownerQuery.isError || shopsQuery.isError,
    [ownerQuery.isError, shopsQuery.isError]
  );

  return (
    <Box className="flex flex-row">
      <Sidebar />
      <Box className="relative flex-1 overflow-auto">
        {isError && <></>}
        {isLoading && !isError && (
          <PageLoading message="Fetching your informations. Please wait..." />
        )}

        {!isLoading && !isError && (
          <>
            <Topbar />
            {/* <Box className="h-16" /> */}
            <Box className="p-4">
              <Outlet />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default RootLayout;
