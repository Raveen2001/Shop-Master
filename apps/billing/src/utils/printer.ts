import { TOrderData, TProductVariantData, TShopData } from "schema";
import { PrinterOrder } from "../types/printer";

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
          productQuantity = `${item.quantity} ${variant.unit}`;
        }

        productName = `${variant.tamilName} - ${productQuantity}`;
      }
      return {
        name: productName,
        quantity: variant?.onlyForBilling
          ? item.quantity * variant.noOfUnits
          : item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        mrp: variant?.mrp || item.unitPrice,
        discount: item.discount || 0,
      };
    }),
  };

  return printerOrder;
};
