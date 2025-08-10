import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShippingAddress } from "@/actions/add-shipping-address";
import { CreateShippingAddressSchema } from "@/actions/add-shipping-address/schema";

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
    mutationKey: getCreateShippingAddressMutationKey(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getShippingAddressesQueryKey(),
      });
      toast.success("Endereço adicionado com sucesso!");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao adicionar endereço. Tente novamente.";
      toast.error(errorMessage);
    },
  });
};

export const getCreateShippingAddressMutationKey = () => [
  "create-shipping-address",
];

export const getShippingAddressesQueryKey = () => ["shipping-addresses"];
