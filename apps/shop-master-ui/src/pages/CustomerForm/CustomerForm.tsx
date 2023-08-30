import { FC } from "react";
import useCustomerForm from "./useCustomerForm";

const CustomerForm: FC = () => {
  const {} = useCustomerForm();
  return <div>CustomerForm</div>;
};

export default CustomerForm;
