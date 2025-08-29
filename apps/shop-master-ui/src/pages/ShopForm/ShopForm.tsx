import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  LoadingButton,
  ProfileImagePicker,
  Snackbar,
  TextField,
  Typography,
} from "ui";
import { Close } from "ui/icons";
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
    handleClose,
  } = useShopForm();
  return (
    <Box className="px-4 py-4 sm:px-6 lg:px-8">
      <Box className="mb-4 flex items-center justify-between sm:mb-6">
        <Typography variant="h5">Create a new Shop</Typography>
        <IconButton size="small" onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6 lg:p-8"
        >
          <ProfileImagePicker onImageChange={setImage} />

          <Button color="error" variant="outlined" fullWidth>
            Delete Shop
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
                  label="Domain *"
                  {...register("domain")}
                  error={!!formErrors.domain}
                  helperText={
                    formErrors.domain?.message ??
                    "Domain should be unique Eg: my-shop"
                  }
                  fullWidth
                />

                <TextField
                  label="Email"
                  {...register("email")}
                  error={!!formErrors.email}
                  helperText={formErrors.email?.message}
                  fullWidth
                />
                <TextField
                  label="Phone Number *"
                  {...register("phone")}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone?.message}
                  fullWidth
                />
                <TextField
                  label="Website"
                  {...register("website")}
                  error={!!formErrors.website}
                  helperText={formErrors.website?.message}
                  fullWidth
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
                  fullWidth
                />
                <TextField
                  label="Address *"
                  {...register("address")}
                  error={!!formErrors.address}
                  helperText={formErrors.address?.message}
                  multiline
                  rows={4}
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
                Create Shop
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

export default ShopForm;
