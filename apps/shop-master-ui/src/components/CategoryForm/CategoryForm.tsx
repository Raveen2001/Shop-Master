import { FC, useState } from "react";
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
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

export type TCategoryFormProps = {
  parentCategoryId?: string | null;
  onSuccess?: () => void;
  category?: TCategoryData; // For editing existing category
};

const CategoryForm: FC<TCategoryFormProps> = (props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    handleDelete,
    isDeleteLoading,
    deleteError,
  } = useCategoryForm(props);

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

            {props.category && (
              <Button
                color="error"
                variant="outlined"
                fullWidth
                onClick={handleDeleteClick}
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? "Deleting..." : "Delete Category"}
              </Button>
            )}
          </Card>

          <Card elevation={5} className="p-4 sm:p-6 lg:px-8">
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        itemName={
          props.category?.name || props.category?.tamilName || "Category"
        }
        isLoading={isDeleteLoading}
        error={deleteError?.response?.data?.error || null}
      />
    </>
  );
};

export default CategoryForm;
