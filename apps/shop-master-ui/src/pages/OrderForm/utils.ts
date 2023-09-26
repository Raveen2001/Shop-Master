import moment from "moment";
import { TOrderItemForm } from "schema";

export const createNewEmptyOrderItem = (): TOrderItemForm => ({
  clientId: moment().toString(),
});
