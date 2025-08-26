import escpos from "escpos";
// @ts-expect-error - escpos-usb package lacks TypeScript definitions
import escposUSB from "escpos-usb";
import { PrinterOrder } from "../types/order";
import { createCanvas } from "canvas";

// Assign USB adapter
escpos.USB = escposUSB;

export class PrinterService {
  private printer: escpos.Printer | null = null;
  private device: escpos.USB | null = null;

  constructor() {
    this.initializeUSBPrinter();
  }

  private initializeUSBPrinter() {
    try {
      // Create USB device (first available printer)
      this.device = new escpos.USB();
      this.printer = new escpos.Printer(this.device);
      console.log("✅ USB thermal printer initialized");
    } catch (error: any) {
      console.error("❌ Failed to initialize USB printer:", error.message);
    }
  }

  async getPrinterStatus() {
    return {
      usbAvailable: this.printer !== null,
      currentPrinter: this.printer ? "USB" : "None",
    };
  }

  async printTestReceipt(): Promise<any> {
    const canvas = createCanvas(400, 100);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "28px Noto Sans Tamil"; // Needs Tamil-capable font installed
    ctx.fillText("வணக்கம் உலகம்", 10, 50);

    // Convert to image and print
    escpos.Image.load(canvas.toDataURL("image/png"), (img: any) => {
      if (img instanceof escpos.Image) {
        this.device?.open((error: any) => {
          console.log("error", error);
          if (error) {
            return;
          }

          this.printer?.align("CT").raster(img).cut().close();
          this.device?.close();
          console.log("closed");
        });
      }
    });

    return;
    return this.printOrder({
      id: "1",
      items: [
        {
          name: "Item 1 - 2G",
          quantity: 2,
          unitPrice: 100,
          totalPrice: 200,
          mrp: 100,
          discount: 0,
        },
        {
          name: "Item 2 - 100KG",
          quantity: 1,
          unitPrice: 50,
          totalPrice: 50,
          mrp: 50,
          discount: 0,
        },
      ],
      shop: {
        name: "Shop 1",
        address: "123 Main St",
        phone: "1234567890",
        gstin: "1234567890",
      },
      date: new Date(),
    });
  }

  async printOrder(order: PrinterOrder) {
    return new Promise((resolve, reject) => {
      if (!this.device || !this.printer) {
        return reject("No printer initialized");
      }

      this.device.open((error: any) => {
        if (error) {
          return reject(error);
        }

        try {
          // Format date and time
          order.date = new Date(order.date);
          const dateStr = order.date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });
          const timeStr = order.date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          // Calculate totals
          const totalItems = order.items.length;
          const totalQuantity = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalAmount = order.items.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );

          // Print header
          this.printer
            ?.align("CT")
            .style("BU")
            .font("A")
            .text(order.shop.name.toUpperCase())
            .style("NORMAL");

          this.printer?.raw(Buffer.from([0x1b, 0x4d, 0x02]));
          this.printer
            ?.text(order.shop.address)
            .text(`MOB:${order.shop.phone}`);

          // Add GSTIN if available
          if (order.shop.gstin) {
            this.printer?.text(`GSTIN :${order.shop.gstin}`);
          }

          // Invoice header
          this.printer
            ?.style("BU")
            .font("B")
            .text("")
            .text("INVOICE")
            .text("")
            .style("NORMAL");

          // Bill details table
          this.printer
            ?.align("LT")
            .font("B")
            .text("Bill No: " + order.id)
            .text("Date:" + dateStr + " " + timeStr)
            .text("");

          // Items header
          this.printer?.raw(Buffer.from([0x1b, 0x4d, 0x02]));

          this.printer
            ?.style("B")
            .text(
              "Item".padEnd(24) +
                "Price".padStart(7) +
                "QTY".padStart(6) +
                "MRP".padStart(7) +
                "Amount".padStart(8)
            )
            .text("-".repeat(52));

          // Print each item
          order.items.forEach((item) => {
            const [itemName, itemQuantity] = item.name.split(" - ");

            const trimmedName =
              itemName.length > 15 ? itemName.substring(0, 15) : itemName;

            const fullName = `${trimmedName}-${itemQuantity}`;

            const price = item.unitPrice.toFixed(2);
            const qty = item.quantity.toFixed(2);
            const mrp = item.mrp.toFixed(2);
            const amount = item.totalPrice.toFixed(2);

            this.printer?.text(
              fullName.padEnd(24) +
                price.padStart(7) +
                qty.padStart(6) +
                mrp.padStart(7) +
                amount.padStart(8)
            );
          });

          this.printer?.text("-".repeat(52));

          // Summary
          this.printer
            ?.align("CT")
            .text(`No of Item: ${totalItems}`)
            .text(`Total Quantity: ${totalQuantity}`)
            .text("");

          this.printer
            ?.font("A")
            .style("BU")
            .align("CT")
            .text(`Total Amount RS:${totalAmount.toFixed(2)}`)
            .text("")
            .text("");

          // Cut and close
          this.printer?.cut().close(() => {
            console.log("✅ Order printed successfully");
            resolve("Print completed successfully");
          });
        } catch (printError) {
          console.error("❌ Printing error:", printError);
          reject(printError);
        }
      });
    });
  }
}
