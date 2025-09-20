import { TOrderData, TProductVariantData, TShopData } from "schema";
import { PrinterOrder, PrinterOrderItem } from "../types/printer";

export const convertOrderToPrinterOrder = (
  order: TOrderData,
  variants: TProductVariantData[],
  shop: TShopData
): PrinterOrder => {
  const printerOrder: PrinterOrder = {
    id: order.id.toString(),
    date: order.createdAt,
    shop: {
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      gstin: "TO BE ADDED",
    },
    items: order.items.map((item) => {
      const variant = variants.find(
        (variant) => variant.id === item.productVariantId
      );
      let productName = "";
      let productQuantity = "";
      if (variant) {
        if (variant.onlyForBilling) {
          productQuantity = `${item.quantity * variant.noOfUnits} ${
            variant.unit
          }`;
        } else {
          productQuantity = `${variant.noOfUnits} ${variant.unit}`;
        }
        productName = `${variant.tamilName} - ${productQuantity}`;

        if (variant.onlyForBilling) {
          productName = `L ${productName}`;
        }
      }
      const orderItem: PrinterOrderItem = {
        name: productName,
        quantity: variant?.onlyForBilling ? 1 : item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        mrp: variant?.mrp || item.unitPrice,
        discount: item.discount || 0,
      };

      return orderItem;
    }),
  };

  return printerOrder;
};
