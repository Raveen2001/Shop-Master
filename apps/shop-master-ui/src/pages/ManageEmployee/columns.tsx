import { ColumnDef, createColumnHelper } from "ui";

const columnHelper = createColumnHelper<IEmployeeData>();

export const columnsDefs = [
  columnHelper.accessor("userName", {
    id: "userName",
    header: "User Name",
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
