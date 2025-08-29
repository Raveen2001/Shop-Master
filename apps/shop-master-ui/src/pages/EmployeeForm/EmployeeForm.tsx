import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  LoadingButton,
  MenuItem,
  ProfileImagePicker,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography,
  IconButton,
} from "ui";
import { Close } from "ui/icons";

import { EMPLOYEE_TYPES } from "schema";
import useEmployeeForm from "./useEmployeeForm";

const EmployeeForm = () => {
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
    handleClose,
  } = useEmployeeForm();
  return (
    <Box className="px-4 py-4 sm:px-6 lg:px-8">
      <Box className="mb-4 flex items-center justify-between sm:mb-6">
        <Typography variant="h5">Create a new Employee</Typography>
        <IconButton size="small" onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <Card
          elevation={5}
          className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6 lg:p-8"
        >
          <ProfileImagePicker onImageChange={setProfileImage} />

          <Box className="flex w-full items-center gap-3">
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

          <Button color="error" variant="outlined" fullWidth>
            Delete Employee
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
                <FormControl error={!!formErrors.type} fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    {...register("type")}
                    label="Type"
                  >
                    {EMPLOYEE_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>{formErrors.type?.message}</FormHelperText>
                </FormControl>
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
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Username *"
                  {...register("username")}
                  error={!!formErrors.username}
                  helperText={formErrors.username?.message}
                  fullWidth
                />
                <TextField
                  label="Password *"
                  {...register("password")}
                  error={!!formErrors.password}
                  helperText={formErrors.password?.message}
                  type="password"
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
                Create Employee
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

export default EmployeeForm;
