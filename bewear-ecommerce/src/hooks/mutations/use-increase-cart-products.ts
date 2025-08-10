import { useMutation, useQueryClient } from "@tanstack/react-query";

import increaseCartProductQuantity from "@/actions/increase-cart-product-quantitiy";

import { getUseCartQueryKey } from "../queries/use-carts";

export const getIncreaseCartProductMutationKey = (cartItemId: string) =>
  ["increase-cart-product-quantity", cartItemId] as const;

export const useIncreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(cartItemId),
    mutationFn: () => increaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
