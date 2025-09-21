import { Canvas, CanvasRenderingContext2D, createCanvas } from "canvas";
import { PrinterOrder } from "./types/order";

const THERMAL_PAPER_WIDTH_PX = 832;

const calculateReceiptHeight = (order: PrinterOrder): number => {
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
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.stroke();
};

export const getFont = (
  fontSize: 42 | 32 | 30 | 28 | 24 | 20 | 18,
  fontWeight: "bold" | "normal"
) => {
  return `${fontWeight} ${fontSize}px 'Noto Sans Tamil', 'Arial Unicode MS', Latha, Arial`;
};

export const textWithUnderline = (
  canvas: Canvas,
  text: string,
  textAlign: "center" | "left" | "right",
  x: number,
  y: number
) => {
  const ctx = canvas.getContext("2d");
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
  const textWidth = ctx.measureText(text).width;
  const underlineY = y + 8;

  if (textAlign === "center") {
    drawLine(
      ctx,
      (canvas.width - textWidth) / 2,
      underlineY,
      (canvas.width + textWidth) / 2,
      underlineY
    );
    return;
  }
  drawLine(ctx, x, underlineY, x + textWidth, underlineY);
};

export const getBillCanvas = (order: PrinterOrder): Canvas => {
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
  const canvas = createCanvas(
    THERMAL_PAPER_WIDTH_PX,
    calculateReceiptHeight(order)
  );
  const ctx = canvas.getContext("2d");

  // Set white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set default text properties
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  let currentY = 10;

  // Shop header with underline
  ctx.font = getFont(42, "bold");
  const shopName = order.shop.name.toUpperCase();
  textWithUnderline(canvas, shopName, "center", canvas.width / 2, currentY);
  currentY += 40;

  // Smaller font for address, mobile, GST
  ctx.font = getFont(24, "normal");
  ctx.fillText(order.shop.address, canvas.width / 2, currentY);
  currentY += 25;

  ctx.fillText(`MOB: ${order.shop.phone}`, canvas.width / 2, currentY);
  currentY += 25;

  // Add GSTIN if available
  if (order.shop.gstin) {
    ctx.fillText(`GSTIN: ${order.shop.gstin}`, canvas.width / 2, currentY);
    currentY += 25;
  }

  // Bill details with bold and underlined bill number
  ctx.textAlign = "left";
  ctx.font = getFont(30, "bold");

  // Draw bill number text
  const billText = `Bill No: ${order.id}`;
  textWithUnderline(canvas, billText, "left", 20, currentY);
  currentY += 35;

  ctx.fillText(`Date: ${dateStr} ${timeStr}`, 20, currentY);
  currentY += 25;

  // Items table header
  ctx.font = getFont(30, "bold");
  drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
  currentY += 35;

  ctx.fillText("Item", 20, currentY);
  ctx.textAlign = "right";
  ctx.fillText("Price", 450, currentY);
  ctx.fillText("QTY", 550, currentY);
  ctx.fillText("MRP", 670, currentY);
  ctx.fillText("Amount", 812, currentY);

  currentY += 15;
  drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
  currentY += 45;

  // Print each item
  ctx.font = getFont(28, "normal");
  order.items.forEach((item) => {
    const [itemName, itemQuantity] = item.name.split(" - ");

    const fullName = `${itemName.trim()}${itemQuantity ? `(${itemQuantity})` : ""}`;

    ctx.textAlign = "left";
    if (fullName.length > 20) {
      ctx.font = getFont(24, "normal");
    }

    if (fullName.length > 23) {
      ctx.font = getFont(20, "normal");
    }

    if (fullName.length > 25) {
      ctx.font = getFont(18, "normal");
    }

    ctx.fillText(fullName, 20, currentY);
    ctx.font = getFont(28, "normal");

    ctx.textAlign = "right";
    ctx.fillText(item.unitPrice.toFixed(2), 450, currentY);
    ctx.fillText(item.quantity.toFixed(2), 550, currentY);
    ctx.fillText(
      item.unitPrice <= item.mrp
        ? item.mrp.toFixed(2)
        : item.unitPrice.toFixed(2),
      670,
      currentY
    );
    ctx.fillText(item.totalPrice.toFixed(2), 812, currentY);

    currentY += 40;
  });

  currentY -= 20;

  // Separator line
  drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
  currentY += 35;

  // display total amount in bold at right
  ctx.textAlign = "right";
  ctx.font = getFont(28, "normal");
  ctx.fillText(`${totalAmount.toFixed(2)}`, canvas.width - 20, currentY);
  ctx.textAlign = "left";
  currentY += 20;

  // Separator line
  drawLine(ctx, 20, currentY, canvas.width - 20, currentY);
  currentY += 35;

  // Summary
  ctx.textAlign = "center";
  ctx.font = getFont(32, "normal");
  ctx.fillText(`No of Items: ${totalItems}`, canvas.width / 2, currentY);
  currentY += 45;
  ctx.fillText(`Total Quantity: ${totalQuantity}`, canvas.width / 2, currentY);
  currentY += 60;

  // Total amount with bold and underline
  ctx.font = getFont(42, "bold");
  const totalText = `Total Amount : ₹${totalAmount.toFixed(2)}`;
  textWithUnderline(canvas, totalText, "center", canvas.width / 2, currentY);
  currentY += 70;

  return canvas;
};
