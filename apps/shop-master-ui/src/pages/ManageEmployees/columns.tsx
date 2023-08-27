import { TableDateTimeCell, TableProfileCell, createColumnHelper } from "ui";
import { TEmployeeData } from "schema";

const columnHelper = createColumnHelper<TEmployeeData>();

export const columnsDefs = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({
      row: {
        original: { name, username, image },
      },
    }) => {
      return (
        <TableProfileCell name={name} subText={username} imageUrl={image} />
      );
    },
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
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
