import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  LoadingButton,
  ProfileImagePicker,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "ui";
import { createEmployee } from "../../services/employee";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmployeeFormSchema, TEmployeeFormSchema } from "schema";
import { useGlobalStore } from "../../store/globalStore";
import { IRequestError } from "schema";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [ownerId, shops, selectedShopId] = useGlobalStore((state) => [
    state.owner?.id,
    state.shops,
    state.selectedShopId,
  ]);
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { mutate, isLoading, isError, error } = useMutation<
    Awaited<ReturnType<typeof createEmployee>>,
    IRequestError,
    TEmployeeFormSchema
  >({
    mutationKey: ["employee", "create"],
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      navigate("/employees");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEmployeeFormSchema>({
    defaultValues: {
      image: null,
    },
    resolver: yupResolver(EmployeeFormSchema),
  });

  useEffect(() => {
    setValue("shopId", selectedShopId ?? "");
    setValue("ownerId", ownerId ?? "");
  }, [selectedShopId, ownerId, setValue]);

  return (
    <Box className="px-8 py-4">
      <Typography variant="h5">Create a new Employee</Typography>

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
            Delete Employee
          </Button>
        </Card>

        <Card elevation={5} className="ml-10 p-6">
          <form
            onSubmit={handleSubmit((data) => {
              mutate(data);
            })}
            className="flex h-full flex-col"
          >
            <Box className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Name *"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Phone Number *"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
                <TextField
                  label="Shop"
                  disabled
                  value={shops?.[selectedShopId ?? ""]?.name ?? ""}
                />
                <TextField
                  label="Type *"
                  {...register("type")}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                />
              </Box>
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Username *"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Password *"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  type="password"
                />
                <TextField
                  label="Address *"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  multiline
                  rows={4}
                />
              </Box>
            </Box>

            <LoadingButton
              loading={isLoading}
              variant="contained"
              className="float-right"
              type="submit"
            >
              Create Employee
            </LoadingButton>
          </form>
        </Card>
      </Box>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {error?.response?.data.message ??
            "Something went wrong, please try again later"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeForm;
