import { TOrderData } from "schema";
import {
  Chip,
  ColumnDef,
  TableDateTimeCell,
  createColumnHelper,
  formatCurrency,
} from "ui";

const columnHelper = createColumnHelper<TOrderData>();

export const columnsDefs: ColumnDef<TOrderData, any>[] = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor("customerPhone", {
    id: "customerPhone",
    header: "Customer",
    enableSorting: false,
  }),
  columnHelper.accessor((data) => data.items.length, {
    id: "itemsCount",
    header: "Items Count",
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),
  columnHelper.accessor(({ total }) => formatCurrency(total), {
    id: "total",
    header: "Total",
  }),

  columnHelper.accessor("status", {
    id: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <Chip
          label={status}
          color={status === "COMPLETED" ? "success" : "warning"}
          variant="outlined"
        />
      );
    },
  }),
];
