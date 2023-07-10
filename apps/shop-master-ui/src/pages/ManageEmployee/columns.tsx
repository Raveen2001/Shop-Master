import { createColumnHelper } from "ui";
import { IEmployeeData } from "./models";

const columnHelper = createColumnHelper<IEmployeeData>();

export const columnsDefs = [
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

  columnHelper.accessor("address", {
    id: "address",
    header: "Address",
  }),

  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
  }),
];
