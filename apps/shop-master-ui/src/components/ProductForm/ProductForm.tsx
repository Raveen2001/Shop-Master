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
  ProfileImagePicker,
  IconButton,
} from "ui";
import { Close } from "ui/icons";
import { TProductData } from "schema";

export type TProductFormProps = {
  categoryId?: string | null;
  onSuccess?: () => void;
  product?: TProductData; // For editing existing product
};

const ProductForm: FC<TProductFormProps> = (props) => {
  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    categories,
    shop,
    owner,
    setProductImage,
    handleClose,
  } = useProductForm(props);
  return (
    <Box className="px-4 py-4 sm:px-6 lg:px-8">
      <Box className="mb-4 flex items-center justify-between sm:mb-6">
        <Typography variant="h5">
          {props.product ? "Edit Product" : "Create a new Product"}
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6 lg:p-8"
        >
          <ProfileImagePicker
            onImageChange={setProductImage}
            currentImageUrl={props.product?.image}
          />
          <Button color="error" variant="outlined" fullWidth>
            Delete Product
          </Button>
        </Card>

        <Card elevation={5} className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-6">
            <Box className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Name *"
                  {...register("name")}
                  error={!!formErrors.name}
                  helperText={formErrors.name?.message}
                  fullWidth
                />

                <TextField
                  label="Tamil Name"
                  {...register("tamilName")}
                  error={!!formErrors.tamilName}
                  helperText={formErrors.tamilName?.message}
                  fullWidth
                />

                <FormControl error={!!formErrors.categoryId} fullWidth>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    {...register("categoryId")}
                    label="Category"
                    defaultValue={props.categoryId ?? ""}
                    disabled={props.categoryId != null}
                  >
                    {categories.map((category: any) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        selected={category.id === props.categoryId}
                      >
                        <TableProfileCell
                          name={category.tamilName || category.name}
                          imageUrl={category.image}
                        />
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>
                    {formErrors.categoryId?.message}
                  </FormHelperText>
                </FormControl>
                <TextField
                  label="Description"
                  {...register("description")}
                  error={!!formErrors.description}
                  helperText={formErrors.description?.message}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Box>
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Shop"
                  contentEditable={false}
                  value={shop?.name ?? ""}
                  fullWidth
                />
                <TextField
                  label="Owner"
                  contentEditable={false}
                  value={owner?.name ?? ""}
                  fullWidth
                />
              </Box>
            </Box>

            <Box className="flex justify-end">
              <LoadingButton
                loading={isMutateLoading}
                variant="contained"
                type="submit"
                size="large"
              >
                {props.product ? "Update Product" : "Create Product"}
              </LoadingButton>
            </Box>
          </form>
        </Card>
      </Box>

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
