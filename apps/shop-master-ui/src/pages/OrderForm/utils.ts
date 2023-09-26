import moment from "moment";
import { TTempOrderItemForm } from "schema";

export const createNewEmptyOrderItem = (): TTempOrderItemForm => ({
  clientId: moment().toString(),
});
