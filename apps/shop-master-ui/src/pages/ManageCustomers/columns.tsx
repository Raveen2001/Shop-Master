import { TCustomerData } from "schema";
import { TableDateTimeCell, TableProfileCell, createColumnHelper } from "ui";

const columnHelper = createColumnHelper<TCustomerData>();

export const columnsDefs = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({
      row: {
        original: { name, email, image },
      },
    }) => {
      return <TableProfileCell name={name} subText={email} imageUrl={image} />;
    },
  }),

  columnHelper.accessor("phone", {
    id: "phone",
    header: "Phone",
  }),

  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),

  columnHelper.accessor("address", {
    id: "address",
    header: "Address",
  }),
];
