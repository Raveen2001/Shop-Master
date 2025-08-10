import { TOrderFormSchema } from "schema";

export const INITIAL_ORDER: TOrderFormSchema = {
  type: "OFFLINE",
  status: "DRAFT",
  items: [],
  tax: 0,
  delivery: 0,
  discount: 0,
  subTotal: 0,
  total: 0,
  shopId: "",
  ownerId: "",
  createdAt: new Date(),
};
