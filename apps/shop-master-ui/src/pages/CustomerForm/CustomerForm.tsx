import { FC } from "react";
import useCustomerForm from "./useCustomerForm";
import {
  Box,
  Typography,
  Card,
  ProfileImagePicker,
  Switch,
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
} from "ui";
import { CUSTOMER_TYPES, TCustomerData, TCustomerFormSchema } from "schema";
import { Controller } from "react-hook-form";

export type TCustomerFormProps = {
  onCustomerAdded?: (customer: TCustomerData) => void;
  initalData?: Partial<TCustomerFormSchema>;
};

const CustomerForm: FC<TCustomerFormProps> = (props) => {
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
    control,
  } = useCustomerForm(props);
  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Customer</Typography>

      <Box className="h-8" />

      <Box className="grid grid-cols-1 grid-rows-2 lg:grid-cols-[300px_2fr] lg:grid-rows-1">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-8 px-6 py-10"
        >
          <ProfileImagePicker onImageChange={setProfileImage} />

          <Box className="flex items-center">
            <Box className="flex-1">
              <Typography variant="subtitle2">Email Verified</Typography>
              <Typography
                variant="caption"
                className="m-0 p-0 leading-none text-slate-600"
              >
                Disabling this will automatically send the user a verification
                email
              </Typography>
            </Box>
            <Switch color="secondary" />
          </Box>

          <Button color="error" variant="outlined">
            Delete Customer
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
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormControl error={!!formErrors.type} required>
                      <InputLabel id="type-label" required>
                        Type
                      </InputLabel>
                      <Select
                        labelId="type-label"
                        id="type"
                        {...(field as any)}
                        label="Type"
                      >
                        {CUSTOMER_TYPES.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {formErrors.type?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
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
              Create Customer
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

export default CustomerForm;
