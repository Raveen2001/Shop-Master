import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IRequestError, TBrandFormSchema } from "schema";
import { createBrand } from "../../services/brand";
import { useGlobalStore } from "../../store/globalStore";

const useOrderForm = () => {
  const navigate = useNavigate();
  const [selectedShop] = useGlobalStore((state) => [state.selectedShop]);

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutateLoading,
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
      queryClient.invalidateQueries(["shop", selectedShop?.id, "brands"]);
      navigate("/brands");
    },
  });

  return {
    isMutateError,
    isMutateLoading,
    mutateError,
    mutate,
  };
};

export default useOrderForm;
