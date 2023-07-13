import { createColumnHelper } from "ui";
import { IEmployeeData } from "../../models/employee";

const columnHelper = createColumnHelper<IEmployeeData>();

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