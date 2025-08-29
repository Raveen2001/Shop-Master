import { FC, useState } from "react";
import { Box, PageLoading } from "ui";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";
import ShopForm from "../pages/ShopForm/ShopForm";
import useFetchDataForGlobalStore from "../store/useFetchDataForGlobalStore";

const AuthenticatedRootLayout = () => {
  const { isAllDataLoaded, hasNoShops, isLoading, isError } =
    useFetchDataForGlobalStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Box className="flex h-screen flex-row">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <Box
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Box
        className={`fixed left-0 top-20 z-50 h-[calc(100vh-5rem)] transform transition-transform duration-300 ease-in-out lg:relative lg:top-0 lg:h-screen lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={closeSidebar} />
      </Box>

      {/* Main content area */}
      <Box className="relative flex-1">
        <PageStatus
          isLoading={isLoading}
          isError={isError}
          hasNoShops={hasNoShops}
          isAllDataLoaded={isAllDataLoaded}
        >
          {/* Sticky Topbar */}
          <Topbar onMenuClick={toggleSidebar} />

          {/* Scrollable content */}
          <Box className="flex-1 overflow-auto">
            <Box className="max-w-full p-4">
              <Outlet />
            </Box>
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
