import { TProductVariantData } from "schema";
import {
  ColumnDef,
  TableDateTimeCell,
  createColumnHelper,
  Box,
  IconButton,
} from "ui";
import { Chip } from "ui";
import { EditTwoTone } from "ui/icons";

const columnHelper = createColumnHelper<TProductVariantData>();

export const createColumnsDefs = (
  onEdit?: (variant: TProductVariantData) => void
): ColumnDef<TProductVariantData, any>[] => [
  // Actions column
  ...(onEdit
    ? [
        columnHelper.display({
          id: "actions",
          header: "Actions",
          maxSize: 20,
          cell: ({ row }) => {
            return (
              <Box className="flex gap-2">
                <IconButton size="small" onClick={() => onEdit(row.original)}>
                  <EditTwoTone />
                </IconButton>
              </Box>
            );
          },
        }),
      ]
    : []),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, tamilName, unit, noOfUnits } = row.original;
      return (
        <Box>
          <strong>{tamilName || name}</strong>
          <Box className="text-xs text-gray-500">
            {noOfUnits} {unit}
          </Box>
        </Box>
      );
    },
  }),

  columnHelper.accessor("acquiredPrice", {
    id: "acquiredPrice",
    header: "Acquired Price",
    meta: {
      className: "hidden xl:table-cell",
    },
    cell: ({ getValue }) => {
      const price = getValue();
      return `₹${price}`;
    },
  }),

  columnHelper.accessor("salePrice", {
    id: "salePrice",
    header: "Sale Price",
    cell: ({ getValue }) => {
      const price = getValue();
      return `₹${price}`;
    },
  }),

  columnHelper.accessor("mrp", {
    id: "mrp",
    header: "MRP",
    meta: {
      hideOnMobile: true,
    },
    cell: ({ getValue }) => {
      const price = getValue();
      return `₹${price}`;
    },
  }),

  columnHelper.accessor("availability", {
    id: "availability",
    header: "Status",
    meta: {
      hideOnMobile: true,
    },
    cell: ({ getValue }) => {
      const isAvailable = getValue();
      return (
        <Chip
          label={isAvailable ? "Available" : "Unavailable"}
          color={isAvailable ? "success" : "error"}
          size="small"
        />
      );
    },
  }),

  columnHelper.accessor("onlyForBilling", {
    id: "onlyForBilling",
    header: "Billing Only",
    meta: {
      hideOnMobile: true,
    },
    cell: ({ getValue }) => {
      const isBillingOnly = getValue();
      return (
        <Chip
          label={isBillingOnly ? "Yes" : "No"}
          color={isBillingOnly ? "warning" : "default"}
          size="small"
        />
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
    meta: {
      hideOnMobile: true,
    },
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),
];
