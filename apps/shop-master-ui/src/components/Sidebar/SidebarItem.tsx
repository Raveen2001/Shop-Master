import clsx from "clsx";
import { sample } from "lodash";
import React from "react";
import { Box, Typography, useTheme } from "ui";

const SidebarItem: React.FC<ISidebarSubItem> = ({
  name,
  // path,
  icon,
  // items,
}) => {
  const theme = useTheme();
  const isSelected = sample([true, false]);

  return (
    <Box className={`group relative mx-3 h-[50px]`}>
      <Box
        className={clsx(
          "absolute inset-0 h-full w-full rounded-[10px] opacity-20",
          {
            [`bg-primary group-hover:opacity-30`]: isSelected,
            ["group-hover:bg-stone-400"]: !isSelected,
          }
        )}
      ></Box>
      <Box
        className={
          "absolute flex h-full w-full items-center gap-3 px-3 text-black"
        }
        sx={{
          svg: {
            color: isSelected
              ? theme.palette.primary.dark
              : theme.palette.grey[600],
          },
        }}
      >
        {icon}
        <Typography
          variant="body2"
          className={clsx("font-bold", {
            [`text-primaryDark font-bold`]: isSelected,
            [`text-gray-600`]: !isSelected,
          })}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarItem;
