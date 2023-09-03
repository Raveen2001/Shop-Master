import {
  Alert,
  Box,
  Button,
  Card,
  LoadingButton,
  ProfileImagePicker,
  Snackbar,
  TextField,
  Typography,
} from "ui";
import useShopForm from "./useShopForm";

const ShopForm = () => {
  const {
    formErrors,
    onSubmit,
    isMutateError,
    isMutateLoading,
    mutateError,
    register,
    setImage,
  } = useShopForm();
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Shop</Typography>

      <Box className="h-8" />

      <Box className="grid grid-cols-1 grid-rows-2 lg:grid-cols-[300px_2fr] lg:grid-rows-1">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-8 px-6 py-10"
        >
          <ProfileImagePicker onImageChange={setImage} />

          <Button color="error" variant="outlined">
            Delete Shop
          </Button>
        </Card>

        <Card elevation={5} className="ml-10 p-6">
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
            <Box className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Name *"
                  {...register("name")}
                  error={!!formErrors.name}
                  helperText={formErrors.name?.message}
                />

                <TextField
                  label="Domain *"
                  {...register("domain")}
                  error={!!formErrors.domain}
                  helperText={
                    formErrors.domain?.message ??
                    "Domain should be unique Eg: my-shop"
                  }
                />

                <TextField
                  label="Email"
                  {...register("email")}
                  error={!!formErrors.email}
                  helperText={formErrors.email?.message}
                />
                <TextField
                  label="Phone Number *"
                  {...register("phone")}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone?.message}
                />
                <TextField
                  label="Website"
                  {...register("website")}
                  error={!!formErrors.website}
                  helperText={formErrors.website?.message}
                />
              </Box>
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Description *"
                  {...register("description")}
                  error={!!formErrors.description}
                  helperText={formErrors.description?.message}
                  multiline
                  rows={4}
                />
                <TextField
                  label="Address *"
                  {...register("address")}
                  error={!!formErrors.address}
                  helperText={formErrors.address?.message}
                  multiline
                  rows={4}
                />
              </Box>
            </Box>

            <LoadingButton
              loading={isMutateLoading}
              variant="contained"
              className="float-right"
              type="submit"
            >
              Create Shop
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

export default ShopForm;
