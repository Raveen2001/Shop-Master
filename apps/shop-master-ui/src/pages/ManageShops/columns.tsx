import { createColumnHelper } from "ui";
import { IShopData } from "../../models/shop";

const columnHelper = createColumnHelper<IShopData>();

export const columnsDefs = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
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
    id: "type",
    header: "Website",
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
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
