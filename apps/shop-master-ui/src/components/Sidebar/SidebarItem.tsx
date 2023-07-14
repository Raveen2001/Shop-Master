import clsx from "clsx";
import React, { useMemo } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "ui";
import { sidebarItemParentForMatch } from "./utils";

const SidebarItem: React.FC<ISidebarSubItem> = ({
  name,
  path,
  icon,
  // items,
}) => {
  const theme = useTheme();

  const location = useLocation();

  const isSelected = useMemo(() => {
    const sidebarParentPath =
      sidebarItemParentForMatch[location.pathname] ?? "";
    return (
      !!matchPath(location.pathname, path) ||
      !!matchPath(sidebarParentPath, path)
    );
  }, [location.pathname, path]);
  const navigate = useNavigate();

  return (
    <Box
      className={`group relative  mx-3 h-[50px] cursor-pointer`}
      onClick={() => {
        navigate(path);
      }}
    >
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
            [`font-bold text-primaryDark`]: isSelected,
            [`text-gray-600`]: !isSelected,
          })}
        >
          {name}
        </Typography>

        {/* TODO: Add sub items */}
      </Box>
    </Box>
  );
};

export default SidebarItem;
