import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IRequestError, TShopFormSchema, ShopFormSchema } from "schema";
import { createShop } from "../../services/shop";
import { useGlobalStore } from "../../store/globalStore";

const useShopForm = () => {
  const navigate = useNavigate();
  const ownerId = useGlobalStore((state) => state.owner?.id);
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);

  const {
    mutate,
    isLoading: isMutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useMutation<
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
    formState: { errors: formErrors },
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
  return {
    mutate,
    isMutateError,
    isMutateLoading,
    mutateError,
    formErrors,
    handleSubmit,
    register,
    setImage,
  };
};

export default useShopForm;
