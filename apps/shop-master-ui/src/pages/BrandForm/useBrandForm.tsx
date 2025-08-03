import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TBrandFormSchema, BrandFormSchema } from "schema";
import { createBrand } from "../../services/brand";
import { useGlobalStore } from "../../store/globalStore";

const useBrandForm = () => {
  const navigate = useNavigate();
  const [owner, selectedShop] = useGlobalStore((state) => [
    state.owner,
    state.selectedShop,
  ]);
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);

  const {
    mutate,
    isPending: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
    Awaited<ReturnType<typeof createBrand>>,
    IRequestError,
    TBrandFormSchema
  >({
    mutationKey: ["brand", "create"],
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop", selectedShop?.id, "brands"],
      });
      navigate("/brands");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue: setFormState,
  } = useForm<TBrandFormSchema>({
    defaultValues: {
      image: null,
    },
    resolver: yupResolver(BrandFormSchema as any),
  });

  useEffect(() => {
    setFormState("shopId", selectedShop?.id ?? "");
    setFormState("ownerId", owner?.id ?? "");
  }, [owner?.id, setFormState, selectedShop?.id]);

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return {
    register,
    onSubmit,
    formErrors,
    isMutateError,
    isMutateLoading,
    mutateError,
    mutate,
    setProfileImage: setImage,
    shop: selectedShop,
    owner,
  };
};

export default useBrandForm;
