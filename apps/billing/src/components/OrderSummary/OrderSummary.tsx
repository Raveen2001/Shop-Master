import React, { useState } from "react";
import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";

import { useBillingStore } from "../../store/billingStore";
import { AddCustomItemModal } from "../AddCustomItemModal";
import { CustomItemFormData } from "../AddCustomItemModal/AddCustomItemModal";
import OrderHeader from "./components/OrderHeader";
import OrderItemsList from "./components/OrderItemsList";
import OrderTotal from "./components/OrderTotal";
import PrintBillButton from "./components/PrintBillButton";
import FloatingActionButton from "./components/FloatingActionButton";
import MobileDrawer from "./components/MobileDrawer";

interface OrderSummaryProps {
  onPrintBill: () => void;
  isCreatingOrder: boolean;
}

type _OrderSummaryProps = {
  itemCount: number;
  total: number;
  items: any[];
  isCreatingOrder: boolean;
  onAddCustomItem: () => void;
  onClearOrder: () => void;
  onPrintBill: () => void;
  isCustomItemModalOpen: boolean;
  setIsCustomItemModalOpen: (isOpen: boolean) => void;
  handleAddCustomItem: (customItem: CustomItemFormData) => void;
};

// Desktop Order Summary Component
const _OrderSummary = ({
  itemCount,
  total,
  items,
  isCreatingOrder,
  onAddCustomItem,
  onClearOrder,
  onPrintBill,
  isCustomItemModalOpen,
  setIsCustomItemModalOpen,
  handleAddCustomItem,
}: _OrderSummaryProps) => (
  <Box
    sx={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    }}
  >
    <OrderHeader
      itemCount={itemCount}
      onAddCustomItem={onAddCustomItem}
      onClearOrder={onClearOrder}
    />

    <OrderItemsList items={items} />

    <Divider sx={{ margin: "16px 0" }} />

    <OrderTotal total={total} />

    <PrintBillButton
      disabled={items.length === 0 || isCreatingOrder}
      isLoading={isCreatingOrder}
      onClick={onPrintBill}
    />

    <AddCustomItemModal
      open={isCustomItemModalOpen}
      onClose={() => setIsCustomItemModalOpen(false)}
      onAddItem={handleAddCustomItem}
    />
  </Box>
);

// Main OrderSummary Component
export const OrderSummary: React.FC<OrderSummaryProps> = ({
  onPrintBill,
  isCreatingOrder,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { order, clearOrder, addCustomItemToOrder } = useBillingStore();
  const [isCustomItemModalOpen, setIsCustomItemModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddCustomItem = (customItem: CustomItemFormData) => {
    addCustomItemToOrder(customItem);
    setIsCustomItemModalOpen(false);
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const openCustomItemModal = () => setIsCustomItemModalOpen(true);

  // Mobile version with drawer
  if (isMobile) {
    return (
      <>
        {/* Floating action button */}
        {order.items.length > 0 && (
          <FloatingActionButton
            itemCount={order.items.length}
            total={order.total}
            isOpen={isDrawerOpen}
            onToggle={toggleDrawer}
          />
        )}

        {/* Mobile drawer */}
        <MobileDrawer isOpen={isDrawerOpen} onToggle={toggleDrawer}>
          <_OrderSummary
            itemCount={order.items.length}
            total={order.total}
            items={order.items}
            isCreatingOrder={isCreatingOrder}
            onAddCustomItem={openCustomItemModal}
            onClearOrder={clearOrder}
            onPrintBill={onPrintBill}
            isCustomItemModalOpen={isCustomItemModalOpen}
            setIsCustomItemModalOpen={setIsCustomItemModalOpen}
            handleAddCustomItem={handleAddCustomItem}
          />
        </MobileDrawer>
      </>
    );
  }

  // Desktop version
  return (
    <_OrderSummary
      itemCount={order.items.length}
      total={order.total}
      items={order.items}
      isCreatingOrder={isCreatingOrder}
      onAddCustomItem={openCustomItemModal}
      onClearOrder={clearOrder}
      onPrintBill={onPrintBill}
      isCustomItemModalOpen={isCustomItemModalOpen}
      setIsCustomItemModalOpen={setIsCustomItemModalOpen}
      handleAddCustomItem={handleAddCustomItem}
    />
  );
};
