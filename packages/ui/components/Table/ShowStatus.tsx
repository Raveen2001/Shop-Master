import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import NoDataIcon from "../../assets/no-data";

interface IShowStatusProps {
  isLoading: boolean;
  isError: boolean;
}
const ShowStatus: React.FC<IShowStatusProps> = ({ isLoading, isError }) => {
  return (
    <Box className="w-full h-full bg-slate-50 flex flex-col items-center justify-center pb-10 border border-dotted border-slate-300">
      {isLoading && <CircularProgress size="2rem" variant="indeterminate" />}
      {!isLoading && (
        <>
          <NoDataIcon className="w-52 h-52" />
          <Typography variant="subtitle2" className="text-slate-500">
            {isError && "Something went wrong, Try again"}
            {!isError && "No Data Found"}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ShowStatus;
