import { TProductVariantData } from "schema";
import { ColumnDef, TableDateTimeCell, createColumnHelper } from "ui";
import { Chip } from "ui";

const columnHelper = createColumnHelper<TProductVariantData>();

export const columnsDefs: ColumnDef<TProductVariantData, any>[] = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({ getValue }) => {
      const name = getValue();
      return <strong>{name}</strong>;
    },
  }),

  columnHelper.accessor("unit", {
    id: "unit",
    header: "Unit",
    cell: ({ getValue }) => {
      const unit = getValue();
      return <Chip label={unit} size="small" />;
    },
  }),

  columnHelper.accessor("noOfUnits", {
    id: "noOfUnits",
    header: "Quantity",
    cell: ({ getValue }) => {
      const quantity = getValue();
      return `${quantity}`;
    },
  }),

  columnHelper.accessor("acquiredPrice", {
    id: "acquiredPrice",
    header: "Acquired Price",
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
    cell: ({ getValue }) => {
      const price = getValue();
      return `₹${price}`;
    },
  }),

  columnHelper.accessor("availability", {
    id: "availability",
    header: "Status",
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
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),
];
