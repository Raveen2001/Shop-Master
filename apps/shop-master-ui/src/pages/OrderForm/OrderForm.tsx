import { FC } from "react";
import useOrderForm from "./useOrderForm";
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
  SingleSelectSearch,
} from "ui";

const OrderForm: FC = () => {
  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    setProfileImage,
    shop,
    owner,
    productVariants,
  } = useOrderForm();
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Brand</Typography>

      <Box className="h-8" />

      <Box className="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-[2fr_300px] lg:grid-rows-1">
        <Card elevation={5} className="p-6">
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
            <Box className="grid flex-1 grid-cols-1 gap-6 ">
              <Box className="flex flex-col gap-4">
                <SingleSelectSearch
                  data={productVariants}
                  labelKey="name"
                  valueKey="id"
                  subLabelKey="brand.name"
                />
                <TextField
                  label="Name *"
                  {...register("name")}
                  error={!!formErrors.name}
                  helperText={formErrors.name?.message}
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
              Create Brand
            </LoadingButton>
          </form>
        </Card>

        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-8 px-6 py-10"
        >
          <ProfileImagePicker onImageChange={setProfileImage} />

          <Button color="error" variant="outlined">
            Delete Brand
          </Button>
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

export default OrderForm;
