export type PrinterOrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  mrp: number;
  discount: number;
};

export type ShopInfo = {
  name: string;
  address: string;
  phone: string;
  gstin?: string;
};

export type PrinterOrder = {
  id: string;
  items: PrinterOrderItem[];
  shop: ShopInfo;
  date: Date;
};
