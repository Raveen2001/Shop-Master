import { Box, Grid, useTheme, toast } from "ui";
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
  const { products, employee, productVariants } = useGlobalStore();
  const {
    currentStep,
    selectedCategory,
    selectedProduct,
    completeOrder,
    clearOrder,
  } = useBillingStore();

  const shop = useGlobalStore((state) => state.shop);

  const { mutate: createOrderMutation, isPending: isCreatingOrder } =
    useMutation({
      mutationFn: createOrder,
      onSuccess: (data) => {
        toast.success("Order created successfully");
        printBill(
          convertOrderToPrinterOrder(data.data, productVariants, shop!)
        );
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
      <Grid container spacing={2} height="100%">
        {/* Product Selection Section */}
        <Grid item xs={12} md={8} lg={9} height="100%">
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              marginBottom: 0,
              height: "100%",
            }}
          >
            {renderLeftSection()}
          </Box>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
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
