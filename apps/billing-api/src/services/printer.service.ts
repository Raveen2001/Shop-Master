import escpos from "escpos";
// @ts-expect-error - escpos-usb package lacks TypeScript definitions
import escposUSB from "escpos-usb";

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
    return new Promise((resolve, reject) => {
      if (!this.device || !this.printer) {
        return reject("No printer initialized");
      }

      this.device.open((error: any) => {
        if (error) {
          return reject(error);
        }

        this.printer
          ?.align("CT")
          .style("BU")
          .size(1, 1)
          .text("Hello Boss 🚀")
          .text("Item 1   x2   $20.00")
          .text("Item 2   x1   $10.00")
          .text("----------------------")
          .text("TOTAL:        $30.00")
          .barcode("1234567", "EAN8")
          .table(["One", "Two", "Three"])
          .cut()
          .close();
      });
    });
  }
}
