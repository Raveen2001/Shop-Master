import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  LoadingButton,
  ProfileImagePicker,
  Snackbar,
  TextField,
} from "ui";
import CloseIcon from "@mui/icons-material/Close";
import useCategoryForm from "./useCategoryForm";
import { useCategoryContext } from "./CategoryContext";

interface CreateCategoryModalProps {
  open: boolean;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ open }) => {
  const { closeCreateModal } = useCategoryContext();
  const {
    register,
    onSubmit,
    formErrors,
    isMutateError,
    isMutateLoading,
    mutateError,
    setCategoryImage,
  } = useCategoryForm();

  const handleCancel = () => {
    closeCreateModal();
  };

  return (
    <>
      <Dialog open={open} onClose={closeCreateModal} maxWidth="lg" fullWidth>
        <DialogTitle className="flex items-center justify-between">
          Create New Category
          <Box className="flex items-center justify-end">
            <IconButton onClick={handleCancel}>
              <CloseIcon className="text-gray-900" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Box className="grid grid-cols-1 grid-rows-2 lg:grid-cols-[300px_2fr] lg:grid-rows-1">
              <Card
                elevation={0}
                className="flex flex-col items-center justify-center gap-8 border-2 border-dotted border-gray-300 px-6 py-10"
              >
                <ProfileImagePicker onImageChange={setCategoryImage} />

                <Button color="error" variant="outlined">
                  Delete Category
                </Button>
              </Card>

              <Card
                elevation={0}
                className="ml-10 border-2 border-dotted border-gray-300 p-6"
              >
                <Box className="flex h-full flex-col gap-4">
                  <Box className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                    <Box className="flex flex-col gap-4">
                      <TextField
                        label="Category Name *"
                        {...register("name")}
                        error={!!formErrors.name}
                        helperText={formErrors.name?.message}
                        fullWidth
                      />
                    </Box>
                    <Box className="flex flex-col gap-4">
                      {/* Additional fields can be added here if needed */}
                    </Box>
                  </Box>

                  <LoadingButton
                    loading={isMutateLoading}
                    variant="contained"
                    className="float-right"
                    type="submit"
                  >
                    Create Category
                  </LoadingButton>
                </Box>
              </Card>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default CreateCategoryModal;
