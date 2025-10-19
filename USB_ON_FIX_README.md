# USB Connection Fix for ESC/POS Printer

## Problem

The `escpos-usb` package may have issues with USB connection handling that can cause the application to crash or fail to connect to USB printers.

## Solution

To fix USB connection issues with ESC/POS printers:

1. Navigate to the `node_modules/escpos-usb/index.js` file
2. Find and remove the line containing `usb.on`
3. Restart the application

This is a temporary fix and may need to be reapplied after package updates.
