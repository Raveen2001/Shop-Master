import { Box, Typography } from "@mui/material";
import React from "react";

interface IBillingNoDataStateProps {
  title?: string;
  message?: string;
  showIcon?: boolean;
}

const BillingNoDataState: React.FC<IBillingNoDataStateProps> = ({
  title = "No Data Available",
  message = "There's no data to display at the moment.",
  showIcon = true,
}) => {
  return (
    <Box className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Box className="max-w-md text-center">
        {showIcon && <div className="mb-4 text-6xl text-gray-400">📊</div>}
        <Typography variant="h6" className="mb-2 text-gray-600">
          {title}
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingNoDataState;
