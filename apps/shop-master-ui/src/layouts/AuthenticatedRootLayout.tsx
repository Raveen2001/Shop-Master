import { FC } from "react";
import { Box, PageLoading } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import ShopForm from "../pages/ShopForm/ShopForm";
import useFetchDataForGlobalStore from "../store/useFetchDataForGlobalStore";

const AuthenticatedRootLayout = () => {
  const { isAllDataLoaded, hasNoShops, isLoading, isError } =
    useFetchDataForGlobalStore();

  return (
    <Box className="flex h-screen flex-row">
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

export default AuthenticatedRootLayout;

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
