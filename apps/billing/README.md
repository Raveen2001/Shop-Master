# Billing Interface

A tablet-friendly billing and point-of-sale interface designed for horizontal tablet mode.

## Features

### 1. Category Selection

- Browse available product categories
- Grid layout optimized for tablet screens
- Touch-friendly category cards

### 2. Product Selection

- View products within selected categories
- Breadcrumb navigation with back button
- Product cards showing name, description, and pricing

### 3. Product Variant Selection

- Choose specific product variants (size, weight, etc.)
- See pricing, availability, and unit information
- Add variants to the order

### 4. Order Management

- Real-time order summary
- Update quantities and remove items
- Calculate total amount
- Print bill functionality

## Design Principles

### Tablet-First Design

- Optimized for horizontal tablet orientation
- Touch-friendly interface elements
- Responsive grid layouts
- Proper spacing for finger navigation

### Navigation Flow

1. **Categories** → Select a product category
2. **Products** → Choose a product from the category
3. **Variants** → Select a specific product variant
4. **Order Summary** → Manage items and print bill

### Layout Structure

- **Left Section (2/3 width)**: Product selection interface
- **Right Section (1/3 width)**: Order summary and billing

## Usage

1. Start by selecting a product category
2. Browse products within that category
3. Select a product to view its variants
4. Choose a variant and add it to your order
5. Manage quantities and items in the order summary
6. Print the final bill

## Technical Implementation

- Built with React and Material-UI
- Zustand state management (no reducers)
- Responsive design with tablet-specific optimizations
- Component-based architecture for maintainability

## Responsive Breakpoints

- **Mobile**: Single column layout
- **Tablet**: Optimized grid layouts with touch-friendly elements
- **Desktop**: Full-featured interface with hover effects
