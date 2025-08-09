import { Box, Typography } from "@mui/material";
import React from "react";

interface IBillingErrorStateProps {
  title?: string;
  message?: string;
  variant?: "error" | "warning" | "info";
}

const BillingErrorState: React.FC<IBillingErrorStateProps> = ({
  title = "Something went wrong",
  message = "Please try again later",
  variant = "error",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "info":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  return (
    <Box className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Box
        className={`rounded-lg border p-8 ${getVariantStyles()} max-w-md text-center`}
      >
        <Typography variant="h6" className="mb-2">
          {title}
        </Typography>
        <Typography variant="body2" className="opacity-80">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingErrorState;
