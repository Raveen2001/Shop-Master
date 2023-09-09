import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getOwnerByToken } from "../services/owner";
import { getShopsByOwnerId } from "../services/shop";
import { useGlobalStore } from "./globalStore";

const useFetchDataForGlobalStore = () => {
  const navigate = useNavigate();
  const {
    owner,
    selectedShop,
    selectedShopId,
    setSelectedShopId,
    setShops,
    setOwner,
  } = useGlobalStore();

  const ownerQuery = useQuery({
    queryKey: ["owner", "me"],
    queryFn: getOwnerByToken,
    onSuccess(data) {
      setOwner(data.data);
    },
  });

  const shopsQuery = useQuery({
    queryKey: ["shops"],
    queryFn: getShopsByOwnerId(ownerQuery.data?.data.id ?? ""),
    enabled: !!ownerQuery.data,

    onSuccess(data) {
      const shops = data.data.rows;
      if (shops.length) {
        setShops(shops);
        if (!selectedShopId) setSelectedShopId(data.data.rows[0]?.id);
      } else {
        navigate("/shops/create");
      }
    },
  });

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

  return {
    isAllDataLoaded,
    hasNoShops,
    isLoading,
    isError,
  };
};

export default useFetchDataForGlobalStore;