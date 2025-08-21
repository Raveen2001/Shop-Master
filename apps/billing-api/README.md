# Billing API

A thermal printer API service built with Express.js and escpos for printing receipts and labels.

## Features

- 🖨️ **Dual Printer Support**: Works with both USB and Network thermal printers
- 📡 **RESTful API**: Simple endpoints for printing operations
- 🧾 **Receipt Printing**: Test receipts and custom receipt generation
- 🔧 **Auto-Detection**: Automatically detects and configures available printers
- 🌐 **CORS Enabled**: Ready for frontend integration

## Prerequisites

- Node.js 16+ 
- TypeScript
- USB thermal printer (optional) OR Network thermal printer

## Installation

```bash
# Navigate to the billing-api directory
cd apps/billing-api

# Install dependencies
npm install

# Create environment file (optional for network printer)
cp .env.example .env
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Network Printer Configuration (optional - if not using USB)
PRINTER_IP=192.168.1.100
PRINTER_PORT=9100

# USB Printer will be auto-detected if connected
```

### Printer Setup

#### USB Printer
- Connect your thermal printer via USB
- The app will auto-detect and configure the first available USB printer

#### Network Printer
- Configure your thermal printer for network access
- Set the `PRINTER_IP` and `PRINTER_PORT` in your `.env` file
- Default port for most thermal printers is `9100`

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and timestamp.

### Print Test Receipt
```
GET /print-test
```
Prints a sample receipt with test data.

**Response:**
```json
{
  "success": true,
  "message": "Test receipt printed successfully",
  "data": {
    "printed": true,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "receiptType": "test"
  }
}
```

### Print Custom Receipt
```
POST /print-receipt
```

**Request Body:**
```json
{
  "items": [
    {
      "name": "Product 1",
      "quantity": 2,
      "price": 10.00,
      "total": 20.00
    }
  ],
  "total": 20.00,
  "customerName": "John Doe",
  "orderNumber": "ORD-001"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Custom receipt printed successfully",
  "data": {
    "printed": true,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "receiptType": "custom",
    "itemCount": 1,
    "total": 20.00
  }
}
```

### Get Printer Status
```
GET /printer-status
```

Returns current printer configuration and availability.

**Response:**
```json
{
  "success": true,
  "data": {
    "usbAvailable": true,
    "networkAvailable": false,
    "currentPrinter": "USB",
    "printerIP": "Not configured",
    "printerPort": "Not configured"
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Troubleshooting

### USB Printer Not Detected
1. Ensure the printer is connected and powered on
2. Check that printer drivers are installed
3. Try a different USB port or cable
4. Run `lsusb` (Linux/Mac) or check Device Manager (Windows) to verify detection

### Network Printer Connection Issues
1. Verify the printer IP address and port
2. Ensure the printer is on the same network
3. Test connectivity with `ping [PRINTER_IP]`
4. Check firewall settings

### Print Quality Issues
1. Check paper alignment and quality
2. Clean printer head if necessary
3. Verify paper width matches printer specifications
4. Check ink/thermal paper expiration

## Dependencies

- **express**: Web framework
- **escpos**: Thermal printer communication
- **escpos-usb**: USB printer adapter  
- **escpos-network**: Network printer adapter
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## License

MIT License
