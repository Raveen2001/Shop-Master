import { ColumnDef, createColumnHelper } from "ui";
import { TEmployeePaymentData } from "schema";

const columnHelper = createColumnHelper<TEmployeePaymentData>();

export const columnsDefs: ColumnDef<TEmployeePaymentData, any>[] = [
  columnHelper.accessor("employee.name", {
    id: "employee",
    header: "Employee",
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Date",
  }),

  // columnHelper.accessor("type", {
  //   id: "paymentType",
  //   header: "Type",
  // }),
  columnHelper.accessor("amount", {
    id: "amount",
    header: "Amount",
  }),
  columnHelper.accessor("comment", {
    id: "comment",
    header: "Comment",
  }),
  columnHelper.accessor("createdByEmployee.name", {
    id: "createdByEmployee",
    header: "Created By",
  }),
];