import { FC } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  formatCurrency,
} from "ui";
import { AddTwoTone } from "ui/icons";
import { useOrderContext } from "../OrderContext";

const OrderSummary: FC = () => {
  const { addNewOrderItem, subTotal, delivery, discount, tax, total } =
    useOrderContext();

  return (
    <Box className="flex w-full flex-col">
      <Box className="flex w-full gap-2">
        <Button
          variant="text"
          color="success"
          startIcon={<AddTwoTone />}
          onClick={addNewOrderItem}
        >
          Add item
        </Button>
        <Box className="flex-1 " />
        <TextField label="Delivery" type="number" className="w-32" />
        <TextField label="Discount" type="number" className="w-32" />
        <TextField label="Tax" type="number" className="w-32" />
      </Box>
      <Box className="mt-12 flex justify-end">
        <Table
          className="w-[30%]"
          sx={{
            td: {
              border: 0,
            },
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="body1" align="right">
                  Subtotal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="right">
                  {formatCurrency(subTotal)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" align="right">
                  Delivery
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="right">
                  {formatCurrency(delivery)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" align="right">
                  Discount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="right" color={"error"}>
                  {formatCurrency(-discount)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" align="right">
                  Tax
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" align="right">
                  {formatCurrency(tax)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" align="right">
                  Total
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" align="right">
                  {formatCurrency(total)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box className="mt-12 flex justify-end gap-4">
        <Button variant="outlined" color="primary">
          Save as draft
        </Button>
        <Button variant="contained" color="primary">
          Save and Print
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
