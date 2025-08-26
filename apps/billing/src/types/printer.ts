export type PrinterOrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  mrp: number;
  discount: number;
};

export type PrinterOrder = {
  id: string;
  items: PrinterOrderItem[];
};
