import { Box, Typography } from "ui";
import { useGlobalStore } from "../../store";
import { BillingNoDataState } from "../../components";

const BillingPage = () => {
  const { products, categories, getProductsByCategory } = useGlobalStore();

  // Show no data state if there are no categories or products
  if (categories.length === 0 || products.length === 0) {
    return (
      <BillingNoDataState 
        title="No Products Available"
        message="There are no products or categories available for billing at the moment."
      />
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      {/* Products and Categories */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Available Products
        </Typography>
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {categories.map((category) => (
            <Box
              key={category.id}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
                minWidth: "200px",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                {category.name}
              </Typography>
              {getProductsByCategory(category.id).map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Typography variant="body2">{product.name}</Typography>
                  <Typography variant="body2" color="primary">
                    ${product.price}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Billing Actions */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Ready for Billing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          All data has been loaded successfully. You can now proceed with
          billing operations.
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingPage;
