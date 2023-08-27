import { createColumnHelper } from "ui";
import { TShopData } from "schema";

const columnHelper = createColumnHelper<TShopData>();

export const columnsDefs = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("username", {
    id: "username",
    header: "Username",
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
  }),
  columnHelper.accessor("address", {
    id: "address",
    header: "Address",
  }),
];
