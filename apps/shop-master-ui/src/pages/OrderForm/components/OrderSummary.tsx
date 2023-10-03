import { FC } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  formatCurrency,
} from "ui";
import { AddTwoTone } from "ui/icons";
import { useOrderContext } from "../OrderContext";

const OrderSummary: FC = () => {
  const { addNewOrderItem, register, watch, formErrors, onSubmit } =
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
        <TextField
          label="Delivery"
          type="number"
          className="w-32"
          error={!!formErrors.delivery}
          onFocus={(event) => {
            event.target.select();
          }}
          {...register("delivery")}
        />
        <TextField
          label="Discount"
          type="number"
          className="w-32"
          error={!!formErrors.discount}
          onFocus={(event) => {
            event.target.select();
          }}
          {...register("discount")}
        />
        <TextField
          label="Tax"
          type="number"
          className="w-32"
          error={!!formErrors.tax}
          onFocus={(event) => {
            event.target.select();
          }}
          {...register("tax")}
        />
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
                  {formatCurrency(watch("subTotal"))}
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
                  {formatCurrency(watch("delivery"))}
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
                  {formatCurrency(-watch("discount"))}
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
                  {formatCurrency(watch("tax"))}
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
                  {formatCurrency(watch("total"))}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box className="mt-12 flex justify-end gap-4">
        <Button variant="outlined" color="primary" onClick={onSubmit("DRAFT")}>
          Save as draft
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit("COMPLETED")}
        >
          Save and Print
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
