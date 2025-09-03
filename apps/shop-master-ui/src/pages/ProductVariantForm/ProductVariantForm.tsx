import { FC, useState } from "react";
import useProductVariantForm from "./useProductVariantForm";
import {
  Box,
  Typography,
  Card,
  ProfileImagePicker,
  Switch,
  Button,
  TextField,
  LoadingButton,
  Snackbar,
  Alert,
  FormControlLabel,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
} from "ui";
import { Close } from "ui/icons";
import { Controller } from "react-hook-form";
import { UNITS, TProductVariantData } from "schema";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog/DeleteConfirmationDialog";

export type TProductVariantFormProps = {
  productId?: string;
  onSuccess?: () => void;
  variant?: TProductVariantData; // For editing existing variant
};

const ProductVariantForm: FC<TProductVariantFormProps> = (props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    selectedCategory,
    selectedProduct,
    shop,
    owner,
    control,
    handleClose,
    handleDelete,
    isDeleteLoading,
    deleteError,
  } = useProductVariantForm(props);

  // Check if this is being used in a modal context
  const isModal = !!props.productId;

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Box className="px-4 py-4 sm:px-6 lg:px-8">
        <Box className="mb-4 flex items-center justify-between sm:mb-6">
          <Typography variant="h5">
            {props.variant ? "Edit Product Variant" : "Add New Product Variant"}
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
            <ProfileImagePicker onImageChange={console.log} />

            <Box className="flex w-full items-center gap-3">
              <Box className="flex-1">
                <Typography variant="subtitle2">Only for Billing</Typography>
                <Typography
                  variant="caption"
                  className="m-0 p-0 leading-none text-slate-600"
                >
                  Enabling this will only make the variant available only for
                  billing purposes. It is hidden from the customer{`&apos;`}s
                  app.
                </Typography>
              </Box>
              <Switch color="secondary" {...register("onlyForBilling")} />
            </Box>

            {props.variant && (
              <Button
                color="error"
                variant="outlined"
                fullWidth
                onClick={handleDeleteClick}
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? "Deleting..." : "Delete Product Variant"}
              </Button>
            )}
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

                  <Controller
                    control={control}
                    name="unit"
                    render={({ field }) => (
                      <FormControl error={!!formErrors.unit} required fullWidth>
                        <InputLabel id="unit-label" required>
                          Unit
                        </InputLabel>
                        <Select
                          labelId="unit-label"
                          id="unit"
                          {...(field as any)}
                          label="Unit *"
                        >
                          {UNITS.map((unit) => (
                            <MenuItem key={unit} value={unit}>
                              {unit}
                            </MenuItem>
                          ))}
                        </Select>

                        <FormHelperText>
                          {formErrors.unit?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

                  <TextField
                    label="No of Units *"
                    {...register("noOfUnits")}
                    error={!!formErrors.noOfUnits}
                    helperText={formErrors.noOfUnits?.message}
                    fullWidth
                  />

                  <TextField
                    label="Acquired Price *"
                    {...register("acquiredPrice")}
                    error={!!formErrors.acquiredPrice}
                    helperText={formErrors.acquiredPrice?.message}
                    fullWidth
                  />
                  <TextField
                    label="Sale Price *"
                    {...register("salePrice")}
                    error={!!formErrors.salePrice}
                    helperText={formErrors.salePrice?.message}
                    fullWidth
                  />
                  <TextField
                    label="MRP *"
                    {...register("mrp")}
                    error={!!formErrors.mrp}
                    helperText={formErrors.mrp?.message}
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
                  <TextField
                    label="Product"
                    contentEditable={false}
                    value={
                      (selectedProduct?.tamilName || selectedProduct?.name) ??
                      ""
                    }
                    fullWidth
                  />

                  <TextField
                    label="Category"
                    contentEditable={false}
                    value={
                      (selectedCategory?.tamilName || selectedCategory?.name) ??
                      "No Category"
                    }
                    fullWidth
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        {...register("availability")}
                        color="secondary"
                        defaultChecked
                      />
                    }
                    label="Availability"
                    labelPlacement="start"
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
                  {props.variant ? "Update Variant" : "Add Variant"}
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product Variant"
        message="Are you sure you want to delete this product variant? This action cannot be undone."
        itemName={
          props.variant?.name || props.variant?.tamilName || "Product Variant"
        }
        isLoading={isDeleteLoading}
        error={deleteError?.response?.data?.error || null}
      />
    </>
  );
};

export default ProductVariantForm;
