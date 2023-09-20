import { ColumnDef } from "@tanstack/react-table";

export const SUBROW_COLUMN_OPTION: ColumnDef<unknown> = {
  id: "expand",
  header: ({ table }) => (
    <button
      {...{
        onClick: table.getToggleAllRowsExpandedHandler(),
      }}
    >
      {table.getIsAllRowsExpanded() ? "👇" : "👉"}
    </button>
  ),
  cell: ({ row }) =>
    row.getCanExpand() ? (
      <button
        {...{
          onClick: row.getToggleExpandedHandler(),
          style: { cursor: "pointer" },
        }}
      >
        {row.getIsExpanded() ? "👇" : "👉"}
      </button>
    ) : (
      "🔵"
    ),
};
