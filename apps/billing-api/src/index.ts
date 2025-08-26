import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrinterService } from "./services/printer.service";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PRINTER_API_PORT || 6060;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize printer service
const printerService = new PrinterService();

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Billing API is running",
    timestamp: new Date().toISOString(),
  });
});

// Print test receipt endpoint
app.get("/print-test", async (req, res) => {
  try {
    const result = await printerService.printTestReceipt();
    res.json({
      success: true,
      message: "Test receipt printed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Print error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to print test receipt",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/print-order", async (req, res) => {
  try {
    const result = await printerService.printOrder(req.body);
    res.json({
      success: true,
      message: "Order printed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Print error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to print order",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get printer status
app.get("/printer-status", async (req, res) => {
  try {
    const status = await printerService.getPrinterStatus();
    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Printer status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get printer status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server
app.listen(port, () => {
  console.log(`🖨️  Billing API server running on port ${port}`);
  console.log(`📍 Health check: http://localhost:${port}/health`);
  console.log(`🧾 Test print: http://localhost:${port}/print-test`);
});

export default app;
