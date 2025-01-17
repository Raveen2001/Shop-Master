import {
  ColumnDef,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  formatCurrency,
} from "ui";
import { TCustomerPaymentData } from "schema";
import OwnerTableCell from "../../components/OwnerTableCell";

const columnHelper = createColumnHelper<TCustomerPaymentData>();

export const columnsDefs: ColumnDef<TCustomerPaymentData, any>[] = [
  columnHelper.accessor("customer.name", {
    id: "customer",
    header: "Customer",
    enableSorting: false,
    cell: ({
      row: {
        original: { customer, customerPhone },
      },
    }) => {
      if (!customer) return customerPhone;
      return (
        <TableProfileCell
          name={customer.name}
          subText={customer.phone}
          imageUrl={customer.image}
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
    id: "createdByCustomer",
    header: "Created By",
    enableSorting: false,

    cell: ({
      row: {
        original: { createdByEmployee },
      },
    }) => {
      if (createdByEmployee) {
        return (
          <TableProfileCell
            name={createdByEmployee.name}
            subText={createdByEmployee.username}
            imageUrl={createdByEmployee.image}
          />
        );
      }

      return <OwnerTableCell />;
    },
  }),
];
