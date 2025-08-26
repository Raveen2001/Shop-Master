import { Box, Grid, useTheme, useMediaQuery, toast } from "ui";
import { useGlobalStore } from "../../store";
import { useBillingStore } from "../../store/billingStore";
import {
  BillingNoDataState,
  CategoriesView,
  CategoryDetailsView,
  ProductVariantsView,
} from "../../components";
import { OrderSummary } from "../../components/OrderSummary";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../services/order";
import { printBill } from "../../services/printer";
import { convertOrderToPrinterOrder } from "../../utils/printer";

const BillingPage = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const { products, employee, productVariants } = useGlobalStore();
  const {
    currentStep,
    selectedCategory,
    selectedProduct,
    completeOrder,
    clearOrder,
  } = useBillingStore();

  const { mutate: createOrderMutation, isPending: isCreatingOrder } =
    useMutation({
      mutationFn: createOrder,
      onSuccess: (data) => {
        toast.success("Order created successfully");
        printBill(convertOrderToPrinterOrder(data.data, productVariants));
        clearOrder();
      },
      onError: () => {
        toast.error("Failed to create order");
      },

      mutationKey: ["createOrder"],
    });

  if (products.length === 0) {
    return (
      <BillingNoDataState
        title="No Products Available"
        message="There are no products or categories available for billing at the moment."
      />
    );
  }

  const handlePrintBill = async () => {
    // TODO: Implement print bill functionality
    console.log("Printing bill for items");
    const completedOrder = completeOrder(employee!);

    createOrderMutation(completedOrder);
  };

  const renderLeftSection = () => {
    switch (currentStep) {
      case "categories":
        return <CategoriesView />;
      case "categoryDetails":
        return selectedCategory ? <CategoryDetailsView /> : null;
      case "variants":
        return selectedProduct ? <ProductVariantsView /> : null;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        height: "100%",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: "100%",
          flexWrap: "nowrap",
        }}
      >
        {/* Left Section - Product Selection (2/3 width on desktop, full width on tablet) */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: isTablet ? "12px" : "16px",
              padding: isTablet ? "16px" : "24px",
              height: "100%",
              overflowY: "auto",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            {renderLeftSection()}
          </Box>
        </Grid>

        {/* Right Section - Order Summary (1/3 width on desktop, fixed width on tablet) */}
        <Grid item xs={12} md={4}>
          <OrderSummary
            onPrintBill={handlePrintBill}
            isCreatingOrder={isCreatingOrder}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BillingPage;
