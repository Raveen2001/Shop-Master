import { FC } from "react";
import { Box } from "ui";
import { useOrderContext } from "../OrderContext";
import CustomerAutoComplete from "../../../components/CustomerAutoComplete";

const OrderHeader: FC = () => {
  const { control, setFormValue } = useOrderContext();
  return (
    <Box className="flex w-full gap-2 border-b-2 border-dotted border-slate-300 pb-8">
      <Box className="flex-1 ">
        <CustomerAutoComplete control={control} setFormValue={setFormValue} />
      </Box>

      <Box className="flex-1"></Box>
    </Box>
  );
};

export default OrderHeader;
