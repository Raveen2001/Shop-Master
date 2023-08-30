import { FC } from "react";
import { Box, PageLoading } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { getOwnerByToken } from "../services/owner";
import { useQuery } from "@tanstack/react-query";
import { useGlobalStore } from "../store/globalStore";
import { useEffect, useMemo } from "react";
import { getShopsByOwnerId } from "../services/shop";
import Topbar from "../components/Topbar/Topbar";
import ShopForm from "../pages/ShopForm/ShopForm";

const RootLayout = () => {
  const navigate = useNavigate();
  const [
    owner,
    selectedShop,
    selectedShopId,
    setSelectedShopId,
    setShops,
    setOwner,
  ] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
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
      const shops = shopsQuery.data.data.rows;
      if (shops.length) {
        setShops(shops);
        if (!selectedShopId)
          setSelectedShopId(shopsQuery.data.data.rows[0]?.id);
      } else {
        navigate("/shops/create");
      }
    }
  }, [
    navigate,
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

  const hasNoShops = useMemo(() => {
    return (
      !shopsQuery.isError &&
      !shopsQuery.isLoading &&
      !shopsQuery.data.data.rows.length
    );
  }, [
    shopsQuery.isError,
    shopsQuery.isLoading,
    shopsQuery.data?.data.rows.length,
  ]);

  const isAllDataLoaded = useMemo(() => {
    return !isLoading && !isError && !!owner && !!selectedShop;
  }, [isLoading, isError, owner, selectedShop]);

  return (
    <Box className="flex flex-row">
      <Sidebar />
      <Box className="relative flex-1 overflow-auto">
        <PageStatus
          isLoading={isLoading}
          isError={isError}
          hasNoShops={hasNoShops}
          isAllDataLoaded={isAllDataLoaded}
        >
          <Topbar />
          <Box className="p-4">
            <Outlet />
          </Box>
        </PageStatus>
      </Box>
    </Box>
  );
};

export default RootLayout;

interface PageStatusProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  hasNoShops: boolean;
  isAllDataLoaded: boolean;
}
const PageStatus: FC<PageStatusProps> = ({
  children,
  isLoading,
  isError,
  hasNoShops,
  isAllDataLoaded,
}) => {
  if (isLoading) {
    return <PageLoading message="Fetching your informations. Please wait..." />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (hasNoShops) {
    return <ShopForm />;
  }

  if (!isAllDataLoaded) {
    return <div>Some data is missing</div>;
  }

  return <>{children}</>;
};
