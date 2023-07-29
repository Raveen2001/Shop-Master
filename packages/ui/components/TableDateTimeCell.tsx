import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

interface ITableDateTimeCellProps {
  date: string | Date;
}
const TableDateTimeCell: React.FC<ITableDateTimeCellProps> = ({ date }) => {
  const formattedDate = moment(date).format("DD MMM YYYY");

  const formattedTime = moment(date).format("hh:mm A");
  return (
    <Box className="flex flex-col">
      <Typography variant="subtitle2">{formattedDate}</Typography>
      <Typography variant="body2">{formattedTime}</Typography>
    </Box>
  );
};

export default TableDateTimeCell;
