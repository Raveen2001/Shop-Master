import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface IBillingLoadingStateProps {
  message?: string;
  showSpinner?: boolean;
}

const BillingLoadingState: React.FC<IBillingLoadingStateProps> = ({
  message = "Loading billing information...",
  showSpinner = true,
}) => {
  return (
    <Box className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Box className="max-w-md text-center">
        {showSpinner && (
          <CircularProgress
            size="3rem"
            variant="indeterminate"
            className="mb-4"
          />
        )}
        <Typography variant="h6" className="mb-2 text-gray-600">
          {message}
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          Please wait while we prepare your billing dashboard...
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingLoadingState;
