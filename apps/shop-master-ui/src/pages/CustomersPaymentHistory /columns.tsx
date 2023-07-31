import {
  ColumnDef,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  formatCurrency,
} from "ui";
import { TEmployeePaymentData } from "schema";
import { useGlobalStore } from "../../store/globalStore";
import { subtract } from "lodash";

const columnHelper = createColumnHelper<TEmployeePaymentData>();

export const columnsDefs: ColumnDef<TEmployeePaymentData, any>[] = [
  columnHelper.accessor("employee.name", {
    id: "employee",
    header: "Employee",
    enableSorting: false,
    cell: ({
      row: {
        original: { employee, employeeId },
      },
    }) => {
      if (!employee) return employeeId;
      return (
        <TableProfileCell
          name={employee.name}
          subText={employee.username}
          imageUrl={employee.image}
        />
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Date",

    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),

  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
  }),
  columnHelper.accessor((row) => formatCurrency(row.amount), {
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
    enableSorting: false,

    cell: ({
      row: {
        original: { createdByEmployee, ownerId },
      },
    }) => {
      if (!createdByEmployee) {
        return <TableProfileCell name="Owner" subText={ownerId} />;
      }
      return (
        
        <TableProfileCell
          name={createdByEmployee.name}
          subText={createdByEmployee.username}
          imageUrl={createdByEmployee.image}
        />
      );
    },
  }),
];
