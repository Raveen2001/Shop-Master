import { Box, Typography } from "@mui/material";
import { StringAvatar } from ".";
import React from "react";

interface ITableProfileCellProps {
  name: string;
  subText?: string | null;
  imageUrl?: string | null;
}

const TableProfileCell: React.FC<ITableProfileCellProps> = ({
  name,
  subText,
  imageUrl,
}) => {
  return (
    <Box className="flex gap-3 items-center">
      <StringAvatar fallbackName={name} src={imageUrl} fontSize="1rem" />
      <Box className="flex flex-col justify-center">
        <Typography variant="subtitle2">{name}</Typography>
        {subText && <Typography variant="body2">{subText}</Typography>}
      </Box>
    </Box>
  );
};

export default TableProfileCell;
