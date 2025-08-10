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
} from "ui";

export type TProductFormProps = {
  categoryId?: string | null;
  onSuccess?: () => void;
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
  } = useProductForm(props);
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Product</Typography>

      <Box className="h-8" />

      <form onSubmit={onSubmit} className="flex h-full flex-row gap-4">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-between gap-4 p-6"
        >
          <ProfileImagePicker onImageChange={setProductImage} />
          <Button color="error" variant="outlined">
            Delete Product
          </Button>
        </Card>
        <Card elevation={5} className="flex-1 p-6">
          <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

              <FormControl error={!!formErrors.categoryId}>
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
            </Box>
          </Box>

          <Box className="h-8" />

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
