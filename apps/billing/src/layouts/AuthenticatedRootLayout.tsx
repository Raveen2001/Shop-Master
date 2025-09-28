import { FC } from "react";
import { Box } from "ui";
import { Outlet } from "react-router-dom";
import useFetchDataForGlobalStore from "../store/useFetchDataForGlobalStore";
import {
  // BillingHeader,
  BillingErrorState,
  BillingLoadingState,
  FullscreenButton,
} from "../components";
import { useFullscreen } from "../hooks/useFullscreen";

const AuthenticatedRootLayout = () => {
  const { isAllDataLoaded, isLoading, isError } = useFetchDataForGlobalStore();
  const { isFullscreen } = useFullscreen();

  return (
    <Box className="flex h-[100dvh] flex-col">
      {/* <BillingHeader /> */}
      <PageStatus
        isLoading={isLoading}
        isError={isError}
        isAllDataLoaded={isAllDataLoaded}
      >
        <Box className="relative flex-1 overflow-auto">
          {/* Fullscreen Button */}
          <Box
            sx={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <FullscreenButton />
          </Box>

          {/* Fullscreen indicator */}
          {isFullscreen && (
            <Box
              sx={{
                position: "fixed",
                top: 16,
                left: 16,
                zIndex: 1000,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              FULLSCREEN MODE
            </Box>
          )}

          <Outlet />
        </Box>
      </PageStatus>
    </Box>
  );
};

export default AuthenticatedRootLayout;

interface PageStatusProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  isAllDataLoaded: boolean;
}

const PageStatus: FC<PageStatusProps> = ({
  children,
  isLoading,
  isError,
  isAllDataLoaded,
}) => {
  if (isLoading) {
    return (
      <BillingLoadingState
        message="Fetching your billing information. Please wait..."
        showSpinner={true}
      />
    );
  }

  if (isError) {
    return (
      <BillingErrorState
        title="Failed to Load Billing Data"
        message="Something went wrong while loading your billing information. Please try refreshing the page."
        variant="error"
      />
    );
  }

  if (!isAllDataLoaded) {
    return (
      <BillingErrorState
        title="Incomplete Data"
        message="Some billing data is missing. Please wait while we complete the data loading."
        variant="warning"
      />
    );
  }

  return <>{children}</>;
};
