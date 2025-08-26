import { TOrderData, TProductVariantData } from "schema";
import { PrinterOrder } from "../types/printer";

export const convertOrderToPrinterOrder = (
  order: TOrderData,
  variants: TProductVariantData[]
): PrinterOrder => {
  const printerOrder: PrinterOrder = {
    id: order.id.toString(),
    items: order.items.map((item) => {
      const variant = variants.find(
        (variant) => variant.id === item.productVariantId
      );
      let productName = "";

      if (variant) {
        productName = `${variant.tamilName} - ${variant.noOfUnits}${variant.unit}`;
      }
      return {
        name: productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        mrp: variant?.mrp || item.unitPrice,
        discount: item.discount || 0,
      };
    }),
  };

  return printerOrder;
};
