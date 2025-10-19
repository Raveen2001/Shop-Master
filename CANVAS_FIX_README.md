# Canvas Library Fix for Raspberry Pi

## Problem

When running Node.js applications with the `canvas` package on Raspberry Pi, you may encounter:

```
libcairo.so.2: ELF load command address/offset not page-aligned
```

Or build errors like:

```
ModuleNotFoundError: No module named 'distutils'
gyp ERR! command failed
```

## Solution Applied

### Step 1: Update System Packages

```bash
sudo apt update
sudo apt upgrade
sudo reboot
```

### Step 2: Install Python Development Tools

```bash
sudo apt install python3-dev
```

### Step 3: Rebuild Canvas

```bash
cd /path/to/your/project
npm rebuild canvas
```

## Why This Works

1. **System Updates**: Ensures all system libraries are compatible
2. **python3-dev**: Provides the Python development headers needed for building native modules
3. **Rebuild**: Forces canvas to recompile with the correct dependencies

## Verification

Test that canvas is working:

```bash
node -e "const { createCanvas } = require('canvas'); console.log('Canvas loaded successfully');"
```

## Alternative Solutions (If Above Doesn't Work)

### Option 1: Kernel Configuration

```bash
sudo nano /boot/firmware/config.txt
# Add this line:
kernel=kernel8.img
sudo reboot
```

now rebuild and test

_Last updated: October 2024_
