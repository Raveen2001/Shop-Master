import { FC } from "react";
import {
  Box,
  Typography,
  Card,
  ProfileImagePicker,
  Button,
  TextField,
  LoadingButton,
  Snackbar,
  Alert,
  IconButton,
} from "ui";
import { Close } from "ui/icons";
import useCategoryForm from "./useCategoryForm";
import { TCategoryData } from "schema";

export type TCategoryFormProps = {
  parentCategoryId?: string | null;
  onSuccess?: () => void;
  category?: TCategoryData; // For editing existing category
};

const CategoryForm: FC<TCategoryFormProps> = (props) => {
  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    setCategoryImage,
    shop,
    owner,
    handleClose,
  } = useCategoryForm(props);

  console.log("props", props);
  return (
    <Box className="px-4 py-4 sm:px-6 lg:px-8">
      <Box className="mb-4 flex items-center justify-between sm:mb-6">
        <Typography variant="h5">
          {props.category ? "Edit Category" : "Create a new Category"}
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
            onImageChange={setCategoryImage}
            currentImageUrl={props.category?.image}
          />

          <Button color="error" variant="outlined" fullWidth>
            Delete Category
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
                {props.category ? "Update Category" : "Create Category"}
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

export default CategoryForm;
