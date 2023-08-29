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
  TextField,
  Typography,
} from "ui";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShopFormSchema, TShopFormSchema } from "schema";
import { useGlobalStore } from "../../store/globalStore";
import { IRequestError } from "schema";
import { createShop } from "../../services/shop";

const ShopForm = () => {
  const navigate = useNavigate();
  const ownerId = useGlobalStore((state) => state.owner?.id);
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);

  const { mutate, isLoading, isError, error } = useMutation<
    Awaited<ReturnType<typeof createShop>>,
    IRequestError,
    TShopFormSchema
  >({
    mutationKey: ["shops", "create"],
    mutationFn: createShop,
    onSuccess: () => {
      queryClient.invalidateQueries(["shops"]);
      navigate("/shops");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TShopFormSchema>({
    defaultValues: {
      image: null,
      website: null,
    },
    resolver: yupResolver(ShopFormSchema) as any,
  });

  useEffect(() => {
    setValue("ownerId", ownerId ?? "");
  }, [ownerId, setValue]);

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
          <form
            onSubmit={handleSubmit((data) => {
              if (!data.website) delete data.website;
              mutate(data);
            })}
            className="flex h-full flex-col gap-4"
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
                  label="Website"
                  {...register("website")}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              </Box>
              <Box className="flex flex-col gap-4">
                <TextField
                  label="Description *"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  multiline
                  rows={4}
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
          {error?.response?.data.error ??
            "Something went wrong, please try again later"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShopForm;
