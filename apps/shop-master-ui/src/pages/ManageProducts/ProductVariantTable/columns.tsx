import { TProductVariantData } from "schema";
import {
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  Box,
  IconButton,
  formatCurrency,
  ColumnDef,
} from "ui";

import { EditTwoTone } from "ui/icons";

const columnHelper = createColumnHelper<TProductVariantData>();

export const columnsDefs: ColumnDef<TProductVariantData, any>[] = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({
      row: {
        original: { name, tamilName },
      },
    }) => {
      return <TableProfileCell name={tamilName || name} />;
    },
  }),

  columnHelper.accessor((row) => formatCurrency(row.acquiredPrice), {
    id: "acquiredPrice",
    header: "Acquired Price",
  }),
  columnHelper.accessor((row) => formatCurrency(row.mrp), {
    id: "mrp",
    header: "MRP",
  }),
  columnHelper.accessor((row) => formatCurrency(row.salePrice), {
    id: "salePrice",
    header: "Sale Price",
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),
  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),
  columnHelper.display({
    id: "action",
    header: "Actions",
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return (
        <Box className="flex gap-2">
          <IconButton>
            <EditTwoTone />
          </IconButton>
        </Box>
      );
    },
  }),
];
