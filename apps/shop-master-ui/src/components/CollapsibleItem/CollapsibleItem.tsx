import clsx from "clsx";
import React from "react";
import { Box, Typography } from "ui";

import { useToggle } from "../../hooks";

interface ICollapsibleItem {
  name: string;
  content: React.ReactNode;
}

const CollapsibleItem: React.FC<ICollapsibleItem> = ({ name, content }) => {
  const { isOn: isOpen, isOff: isClose, toggle } = useToggle(true);
  return (
    <Box>
      <Typography
        variant="caption"
        onClick={toggle}
        className={`cursor-pointer font-bold uppercase opacity-80 hover:opacity-100`}
      >
        {name}
      </Typography>
      <Box
        className={clsx("my-2 box-border flex flex-col gap-1 overflow-hidden", {
          "my-0 max-h-0": isClose,
          "max-h-ful": isOpen,
        })}
      >
        {content}
      </Box>
    </Box>
  );
};

export default CollapsibleItem;
