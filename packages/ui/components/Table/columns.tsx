import { IconButton } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import clsx from "clsx";

export const getSubRowColumnOption = <T,>(): ColumnDef<T> => ({
  id: "expand",
  size: 20,

  header: ({ table }) => (
    <IconButton onClick={table.getToggleAllRowsExpandedHandler()}>
      <ChevronRightTwoToneIcon
        className={clsx({ "rotate-90": table.getIsAllRowsExpanded() })}
      />
    </IconButton>
  ),
  cell: ({ row }) =>
    row.getCanExpand() ? (
      <IconButton aria-label="delete" onClick={row.getToggleExpandedHandler()}>
        <ChevronRightTwoToneIcon
          className={clsx({ "rotate-90": row.getIsExpanded() })}
        />
      </IconButton>
    ) : null,
});
