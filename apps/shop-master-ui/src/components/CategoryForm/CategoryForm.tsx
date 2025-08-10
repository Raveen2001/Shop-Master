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
} from "ui";
import useCategoryForm from "./useCategoryForm";

export type TCategoryFormProps = {
  parentCategoryId?: string | null;
  onSuccess?: () => void;
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
  } = useCategoryForm(props);
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Category</Typography>

      <Box className="h-8" />

      <Box className="grid grid-cols-1 grid-rows-2 lg:grid-cols-[300px_2fr] lg:grid-rows-1">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-8 px-6 py-10"
        >
          <ProfileImagePicker onImageChange={setCategoryImage} />

          <Button color="error" variant="outlined">
            Delete Category
          </Button>
        </Card>

        <Card elevation={5} className="ml-10 p-6">
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
            <Box className="grid flex-1 grid-cols-1 gap-6 ">
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

            <LoadingButton
              loading={isMutateLoading}
              variant="contained"
              className="float-right"
              type="submit"
            >
              Create Category
            </LoadingButton>
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
