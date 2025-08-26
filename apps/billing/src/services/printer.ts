import { PrinterOrder } from "../types/printer";
import { printerAxiosClient } from "../utils/axios";

export const printBill = async (order: PrinterOrder) => {
  console.log("Printing bill", order);
  return printerAxiosClient.post(`/orders/print`, order);
};
