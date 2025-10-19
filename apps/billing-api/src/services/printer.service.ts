import escpos from "escpos";
// @ts-expect-error - escpos-usb package lacks TypeScript definitions
import escposUSB from "escpos-usb";
import { PrinterOrder } from "../types/order";
import { Canvas } from "canvas";
import fs from "fs";
import path from "path";
import { getBillCanvas } from "../canvas.utils";

// Assign USB adapter
escpos.USB = escposUSB;

export class PrinterService {
  private printer: escpos.Printer | null = null;
  private device: escpos.USB | null = null;

  private initializeUSBPrinter() {
    try {
      // Create USB device (first available printer)
      this.device = new escpos.USB();
      this.printer = new escpos.Printer(this.device);
      console.log("✅ USB thermal printer initialized");
    } catch (error: any) {
      console.error("❌ Failed to initialize USB printer:", error.message);
      throw error;
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
          name: "1234567890123456789",
          quantity: 2,
          unitPrice: 100,
          totalPrice: 200,
          mrp: 100,
          discount: 0,
        },
        {
          name: "123456789012345678903493",
          quantity: 10,
          unitPrice: 1000,
          totalPrice: 10000,
          mrp: 10000,
          discount: 0,
        },

        {
          name: "123456789012345678903493985787",
          quantity: 10,
          unitPrice: 1000,
          totalPrice: 10000,
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

  async sendCanvasToPrinter(canvas: Canvas) {
    return new Promise((resolve, reject) => {
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
    });
  }

  async saveCanvasAsPNG(canvas: Canvas, order: any) {
    return new Promise((resolve, reject) => {
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
        resolve("PNG saved successfully");
      } catch (saveError) {
        console.error("❌ Failed to save receipt PNG:", saveError);
        reject(`PNG Error: ${saveError}`);
      }
    });
  }

  async printOrder(order: PrinterOrder) {
    try {
      const canvas = getBillCanvas(order);

      console.log("🔥 Printing order", process.env.NODE_ENV);
      if (process.env.NODE_ENV === "development") {
        await this.saveCanvasAsPNG(canvas, order);
      }

      this.initializeUSBPrinter();

      await this.sendCanvasToPrinter(canvas);
      return "Printed successfully";
    } catch (error) {
      console.error("❌ Failed to print order:", error);
      throw error;
    }
  }
}
