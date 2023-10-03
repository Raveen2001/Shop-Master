import { FC } from "react";
import { Box, DateTimePicker } from "ui";
import { useOrderContext } from "../OrderContext";
import CustomerAutoComplete from "../../../components/CustomerAutoComplete";
import { Controller } from "react-hook-form";
import moment from "moment";

const OrderHeader: FC = () => {
  const { control, setFormValue } = useOrderContext();
  return (
    <Box className="flex w-full gap-2 border-b-2 border-dotted border-slate-300 pb-8">
      <CustomerAutoComplete control={control} setFormValue={setFormValue} />
      <Controller
        control={control}
        name="createdAt"
        render={({ field: { onChange, value, ...field } }) => (
          <DateTimePicker
            value={moment(value)}
            format="DD/MM/YYYY hh:mm A"
            label="Created at *"
            {...field}
            onAccept={(date) => {
              if (!date) return;
              onChange(date.toDate());
            }}
          />
        )}
      />
    </Box>
  );
};

export default OrderHeader;
