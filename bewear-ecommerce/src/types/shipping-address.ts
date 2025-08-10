import { shippingAddressTable } from "@/db/schema";

export type ShippingAddress = typeof shippingAddressTable.$inferSelect;
