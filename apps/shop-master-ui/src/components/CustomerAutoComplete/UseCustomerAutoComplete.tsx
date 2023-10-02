import { useState } from "react";
import { useGlobalStore } from "../../store/globalStore";
import Fuse from "fuse.js";

const UseCustomerAutoComplete = () => {
  const customers = useGlobalStore((state) => state.customers);
  const [open, toggleOpen] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");

  const customerFuse = new Fuse(customers, {
    keys: ["phone", "name"],
  });

  return {
    customers,
    customerPhone,
    setCustomerPhone,
    open,
    toggleOpen,
    customerFuse,
  };
};

export default UseCustomerAutoComplete;
