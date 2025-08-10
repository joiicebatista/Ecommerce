import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";
import { getShippingAddressesQueryKey } from "@/hooks/mutations/use-create-shipping-address";
import { ShippingAddress } from "@/types/shipping-address";

export const useShippingAddresses = () => {
  return useQuery<ShippingAddress[]>({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: () => getShippingAddresses(),
  });
};
