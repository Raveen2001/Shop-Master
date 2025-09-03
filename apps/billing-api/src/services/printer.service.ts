import escpos from "escpos";
// @ts-expect-error - escpos-usb package lacks TypeScript definitions
import escposUSB from "escpos-usb";
import { PrinterOrder } from "../types/order";
import { createCanvas, CanvasRenderingContext2D } from "canvas";
import fs from "fs";
import path from "path";

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
    return this.printOrder({
      id: "1",
      items: [
        {
          name: "பருப்பு வகைகள் - 2G",
          quantity: 2,
          unitPrice: 100,
          totalPrice: 200,
          mrp: 100,
          discount: 0,
        },
        {
          name: "sdafljksa jdfklasjdkflaskdfajslkdfjlak sdjflksajdf- 100KG",
          quantity: 10,
          unitPrice: 10000,
          totalPrice: 100000,
          mrp: 10000,
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

        // Create canvas for thermal printer (58mm ~ 384px width)
        const canvas = createCanvas(832, this.calculateReceiptHeight(order));
        const ctx = canvas.getContext("2d");

        // Set white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set default text properties
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        let currentY = 40;

        // Shop header with underline
        ctx.font =
          "bold 42px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        const shopName = order.shop.name.toUpperCase();
        ctx.fillText(shopName, canvas.width / 2, currentY);

        // Draw underline for shop name
        const shopNameWidth = ctx.measureText(shopName).width;
        const underlineY = currentY + 8;
        this.drawLine(
          ctx,
          (canvas.width - shopNameWidth) / 2,
          underlineY,
          (canvas.width + shopNameWidth) / 2,
          underlineY
        );
        currentY += 70;

        // Smaller font for address, mobile, GST
        ctx.font = "28px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        ctx.fillText(order.shop.address, canvas.width / 2, currentY);
        currentY += 40;

        ctx.fillText(`MOB: ${order.shop.phone}`, canvas.width / 2, currentY);
        currentY += 40;

        // Add GSTIN if available
        if (order.shop.gstin) {
          ctx.fillText(
            `GSTIN: ${order.shop.gstin}`,
            canvas.width / 2,
            currentY
          );
          currentY += 40;
        }

        // Invoice header with bold and underline
        currentY += 30;
        ctx.font =
          "bold 36px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        const invoiceText = "INVOICE";
        ctx.fillText(invoiceText, canvas.width / 2, currentY);

        // Draw underline for INVOICE
        const invoiceWidth = ctx.measureText(invoiceText).width;
        const invoiceUnderlineY = currentY + 8;
        this.drawLine(
          ctx,
          (canvas.width - invoiceWidth) / 2,
          invoiceUnderlineY,
          (canvas.width + invoiceWidth) / 2,
          invoiceUnderlineY
        );
        currentY += 65;

        // Bill details with bold and underlined bill number
        ctx.textAlign = "left";
        ctx.font =
          "bold 36px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";

        // Draw bill number text
        const billText = `Bill No: ${order.id}`;
        ctx.fillText(billText, 20, currentY);

        // Draw underline for bill number
        const billTextWidth = ctx.measureText(billText).width;
        const billUnderlineY = currentY + 8;
        this.drawLine(
          ctx,
          20,
          billUnderlineY,
          20 + billTextWidth,
          billUnderlineY
        );
        currentY += 50;

        ctx.fillText(`Date: ${dateStr} ${timeStr}`, 20, currentY);
        currentY += 65;

        // Items table header
        ctx.font =
          "bold 30px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        this.drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
        currentY += 35;

        ctx.fillText("Item", 20, currentY);
        ctx.textAlign = "right";
        ctx.fillText("Price", 450, currentY);
        ctx.fillText("QTY", 550, currentY);
        ctx.fillText("MRP", 670, currentY);
        ctx.fillText("Amount", 812, currentY);

        currentY += 15;
        this.drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
        currentY += 45;

        // Print each item
        ctx.font = "28px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        order.items.forEach((item) => {
          const [itemName, itemQuantity] = item.name.split(" - ");
          const trimmedName =
            itemName.length > 20 ? itemName.substring(0, 20) : itemName;
          const fullName = `${trimmedName}-${itemQuantity || ""}`;

          ctx.textAlign = "left";
          ctx.fillText(fullName, 20, currentY);

          ctx.textAlign = "right";
          ctx.fillText(item.unitPrice.toFixed(2), 450, currentY);
          ctx.fillText(item.quantity.toFixed(2), 550, currentY);
          ctx.fillText(item.mrp.toFixed(2), 670, currentY);
          ctx.fillText(item.totalPrice.toFixed(2), 812, currentY);

          currentY += 40;
        });

        // Separator line
        this.drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
        currentY += 50;

        // Summary
        ctx.textAlign = "center";
        ctx.font = "32px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        ctx.fillText(`No of Items: ${totalItems}`, canvas.width / 2, currentY);
        currentY += 45;
        ctx.fillText(
          `Total Quantity: ${totalQuantity}`,
          canvas.width / 2,
          currentY
        );
        currentY += 60;

        // Total amount with bold and underline
        ctx.font =
          "bold 38px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial";
        const totalText = `Total Amount RS: ${totalAmount.toFixed(2)}`;
        const totalTextWidth = ctx.measureText(totalText).width;

        // Draw total amount text
        ctx.fillText(totalText, canvas.width / 2, currentY);

        // Draw underline for total amount
        const totalUnderlineY = currentY + 8;
        this.drawLine(
          ctx,
          (canvas.width - totalTextWidth) / 2,
          totalUnderlineY,
          (canvas.width + totalTextWidth) / 2,
          totalUnderlineY
        );
        currentY += 70;

        // Save canvas as PNG for reference
        try {
          const receiptsDir = path.join(process.cwd(), "receipts");
          if (!fs.existsSync(receiptsDir)) {
            fs.mkdirSync(receiptsDir, { recursive: true });
          }

          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const filename = `receipt-${order.id}-${timestamp}.png`;
          const filepath = path.join(receiptsDir, filename);

          const buffer = canvas.toBuffer("image/png");
          fs.writeFileSync(filepath, buffer);
          console.log(`✅ Receipt saved as PNG: ${filepath}`);
        } catch (saveError) {
          console.error("❌ Failed to save receipt PNG:", saveError);
        }

        if (!this.device || !this.printer) {
          return reject("No printer initialized");
        }

        // Convert canvas to image and print
        escpos.Image.load(canvas.toDataURL("image/png"), (img: any) => {
          if (img instanceof escpos.Image) {
            this.device?.open((error: any) => {
              if (error) {
                return reject(error);
              }

              this.printer
                ?.align("CT")
                .raster(img)
                .cut()
                .close(() => {
                  console.log("✅ Order printed successfully");
                  resolve("Print completed successfully");
                });
            });
          } else {
            reject("Failed to create image from canvas");
          }
        });

        // For now, just resolve since printing is commented out
        resolve("PNG saved successfully");
      } catch (printError) {
        console.error("❌ Printing error:", printError);
        reject(printError);
      }
    });
  }

  private calculateReceiptHeight(order: PrinterOrder): number {
    // Base height for header, invoice title, and summary (reduced font sizes with underlines)
    let height = 500;

    // Add height for GSTIN if present (reduced font size)
    if (order.shop.gstin) {
      height += 40;
    }

    // Add height for each item (40px per item + table header with spacing)
    height += order.items.length * 40 + 150;

    // Add some bottom padding
    height += 150;

    return height;
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}
