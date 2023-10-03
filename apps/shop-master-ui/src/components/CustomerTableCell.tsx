import { FC } from "react";
import { useGlobalStore } from "../store/globalStore";
import { TableProfileCell, Typography } from "ui";

interface CustomerTableCellProps {
  phone: string | null | undefined;
}

const CustomerTableCell: FC<CustomerTableCellProps> = ({ phone }) => {
  const customers = useGlobalStore((state) => state.customers);
  const customer = customers.find((c) => c.phone === phone);

  if (!customer) return <Typography variant="body2">{phone ?? "-"}</Typography>;
  return (
    <TableProfileCell
      name={customer.name}
      subText={customer.phone}
      imageUrl={customer.image}
    />
  );
};

export default CustomerTableCell;
