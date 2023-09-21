import { FC } from "react";
import useProductForm from "./useProductForm";
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  LoadingButton,
  Snackbar,
  Alert,
  TableProfileCell,
} from "ui";

const ProductForm: FC = () => {
  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    categories,
    brands,
    shop,
    owner,
    selectedCategoryId,
    subCategories,
  } = useProductForm();
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Product</Typography>

      <Box className="h-8" />

      <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
        <Card elevation={5} className="ml-10 p-6">
          <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Box className="flex flex-col gap-4">
              <TextField
                label="Name *"
                {...register("name")}
                error={!!formErrors.name}
                helperText={formErrors.name?.message}
              />
              <FormControl error={!!formErrors.brandId}>
                <InputLabel id="brand-label">Brand *</InputLabel>
                <Select
                  labelId="brand-label"
                  id="brand"
                  {...register("brandId")}
                  label="Brand"
                  defaultValue={""}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      <TableProfileCell
                        name={brand.name}
                        imageUrl={brand.image}
                      />
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>{formErrors.brandId?.message}</FormHelperText>
              </FormControl>

              <FormControl error={!!formErrors.categoryId}>
                <InputLabel id="category-label">Category *</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  {...register("categoryId")}
                  label="Category"
                  defaultValue={""}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <TableProfileCell
                        name={category.name}
                        imageUrl={category.image}
                      />
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {formErrors.categoryId?.message}
                </FormHelperText>
              </FormControl>

              <FormControl
                error={!!formErrors.subCategoryId}
                disabled={!selectedCategoryId}
              >
                <InputLabel id="subCategory-label">Sub-category *</InputLabel>
                <Select
                  labelId="subCategory-label"
                  id="subCategory"
                  {...register("subCategoryId")}
                  label="Sub-category"
                  defaultValue={""}
                >
                  {subCategories.map((subCategory) => (
                    <MenuItem key={subCategory.id} value={subCategory.id}>
                      <TableProfileCell
                        name={subCategory.name}
                        imageUrl={subCategory.image}
                      />
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {formErrors.subCategoryId?.message}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box className="flex flex-col gap-4">
              <TextField
                label="Shop"
                contentEditable={false}
                value={shop?.name ?? ""}
              />
              <TextField
                label="Owner"
                contentEditable={false}
                value={owner?.name ?? ""}
              />
              <TextField
                label="Description"
                {...register("description")}
                error={!!formErrors.description}
                helperText={formErrors.description?.message}
                multiline
                rows={4}
              />
            </Box>
          </Box>

          <Button color="error" variant="outlined">
            Delete Product
          </Button>
          <LoadingButton
            loading={isMutateLoading}
            variant="contained"
            className="float-right"
            type="submit"
          >
            Create Product
          </LoadingButton>
        </Card>
      </form>

      <Snackbar
        open={isMutateError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {mutateError?.response?.data.error ??
            "Something went wrong, please try again later"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductForm;
