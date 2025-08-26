import { FC } from "react";
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
} from "ui";
import { Controller } from "react-hook-form";
import { UNITS, TProductVariantData } from "schema";

export type TProductVariantFormProps = {
  productId?: string;
  onSuccess?: () => void;
  variant?: TProductVariantData; // For editing existing variant
};

const ProductVariantForm: FC<TProductVariantFormProps> = (props) => {
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
  } = useProductVariantForm(props);

  // Check if this is being used in a modal context
  const isModal = !!props.productId;

  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">
        {props.variant ? "Edit Product Variant" : "Add New Product Variant"}
      </Typography>

      <Box className="h-8" />

      <form onSubmit={onSubmit}>
        <Box className="grid grid-cols-1 grid-rows-2 lg:grid-cols-[300px_2fr] lg:grid-rows-1">
          <Card
            elevation={5}
            className="flex flex-col items-center justify-center gap-8 px-6 py-10"
          >
            <ProfileImagePicker onImageChange={console.log} />

            <Box className="flex items-center">
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

            {!isModal && (
              <Button color="error" variant="outlined">
                Delete Product Variant
              </Button>
            )}
          </Card>

          <Card elevation={5} className="ml-10 flex h-full flex-col gap-4 p-6">
            <Box className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Name *"
                  {...register("name")}
                  error={!!formErrors.name}
                  helperText={formErrors.name?.message}
                />

                <TextField
                  label="Tamil Name"
                  {...register("tamilName")}
                  error={!!formErrors.tamilName}
                  helperText={formErrors.tamilName?.message}
                />

                <Controller
                  control={control}
                  name="unit"
                  render={({ field }) => (
                    <FormControl error={!!formErrors.unit} required>
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
                />

                <TextField
                  label="Acquired Price *"
                  {...register("acquiredPrice")}
                  error={!!formErrors.acquiredPrice}
                  helperText={formErrors.acquiredPrice?.message}
                />
                <TextField
                  label="MRP *"
                  {...register("mrp")}
                  error={!!formErrors.mrp}
                  helperText={formErrors.mrp?.message}
                />
                <TextField
                  label="Sale Price *"
                  {...register("salePrice")}
                  error={!!formErrors.salePrice}
                  helperText={formErrors.salePrice?.message}
                />
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
                  label="Product"
                  contentEditable={false}
                  value={
                    (selectedProduct?.tamilName || selectedProduct?.name) ?? ""
                  }
                />

                <TextField
                  label="Category"
                  contentEditable={false}
                  value={
                    (selectedCategory?.tamilName || selectedCategory?.name) ??
                    "No Category"
                  }
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

            <LoadingButton
              loading={isMutateLoading}
              variant="contained"
              className="float-right"
              type="submit"
            >
              {props.variant ? "Update Variant" : "Add Variant"}
            </LoadingButton>
          </Card>
        </Box>
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

export default ProductVariantForm;
