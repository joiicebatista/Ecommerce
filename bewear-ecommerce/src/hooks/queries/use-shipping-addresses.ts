import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";
import { getShippingAddressesQueryKey } from "@/hooks/mutations/use-create-shipping-address";
import { ShippingAddress } from "@/types/shipping-address";

export const useShippingAddresses = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery<ShippingAddress[]>({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: () => getShippingAddresses(),
    initialData: params?.initialData,
  });
};
