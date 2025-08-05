import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface IPageLoadingProps {
  message?: string;
}

const PageLoading: React.FC<IPageLoadingProps> = ({ message }) => {
  return (
    <Box className="w-full h-full flex flex-col items-center justify-center gap-10">
      <Typography variant="subtitle2">{message}</Typography>
      <LinearProgress className="w-96" />
    </Box>
  );
};

export default PageLoading;
