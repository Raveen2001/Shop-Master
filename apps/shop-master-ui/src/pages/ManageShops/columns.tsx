import { TShopData } from "schema";
import {
  MyLink,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
} from "ui";

const columnHelper = createColumnHelper<TShopData>();

export const columnsDefs = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({
      row: {
        original: { name, image },
      },
    }) => {
      return <TableProfileCell name={name} imageUrl={image} />;
    },
  }),

  columnHelper.accessor("phone", {
    id: "phone",
    header: "Phone",
  }),

  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
  }),

  columnHelper.accessor("website", {
    id: "website",
    header: "Website",
    cell: ({ getValue }) => {
      const website = getValue();

      if (!website) return "-";
      return <MyLink text={website} to={website} />;
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
  columnHelper.accessor("address", {
    id: "address",
    header: "Address",
  }),

  columnHelper.accessor("description", {
    id: "description",
    header: "Description",
  }),
];
