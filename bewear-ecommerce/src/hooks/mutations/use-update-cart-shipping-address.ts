import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shippingAddressId: string) =>
      updateCartShippingAddress(shippingAddressId),
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCartQueryKey(),
      });
      toast.success("Endereço vinculado ao carrinho com sucesso!");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao vincular endereço ao carrinho. Tente novamente.";
      toast.error(errorMessage);
    },
  });
};

export const getUpdateCartShippingAddressMutationKey = () => [
  "update-cart-shipping-address",
];

export const getCartQueryKey = () => ["cart"];
