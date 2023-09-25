import { FC } from "react";
import { Box, Button, SingleSelectSearch, TextField } from "ui";
import { DeleteTwoTone } from "ui/icons";
import { useOrderContext } from "../OrderContext";
import { useGlobalStore } from "../../../store/globalStore";

interface OrderItemProps {
  orderIdx: number;
}

const OrderItem: FC<OrderItemProps> = ({ orderIdx }) => {
  const productVariants = useGlobalStore((state) =>
    state.getAllProductVariantsWithDetails()
  );
  return (
    <Box className="border-b-2 border-dotted border-stone-300">
      <Box className="flex w-full gap-2">
        <SingleSelectSearch
          className="w-[40%] flex-shrink-0"
          data={productVariants}
          labelKey="name"
          valueKey="id"
          subLabelKey="brand.name"
        />
        <TextField
          label="Variant"
          contentEditable={false}
          value={"hello" ?? ""}
        />

        <TextField label="Quantity" defaultValue={0} />
        <TextField label="Price" defaultValue={0} />
        <TextField label="Discount" defaultValue={0} />
        <TextField label="Total" defaultValue={0} />
      </Box>
      <Box className="mt-2 flex justify-end">
        <Button variant="text" color="error" startIcon={<DeleteTwoTone />}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

const OrderItems: FC = () => {
  const { orderItems } = useOrderContext();
  return (
    <Box className="flex w-full flex-col gap-4">
      {orderItems.map((orderItem, idx) => (
        <OrderItem key={idx} orderIdx={idx} />
      ))}
    </Box>
  );
};

export default OrderItems;
