"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema
) => {
  try {
    const validatedData = createShippingAddressSchema.parse(data);

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    const recipientName = `${validatedData.firstName} ${validatedData.lastName}`;

    const [shippingAddress] = await db
      .insert(shippingAddressTable)
      .values({
        userId: session.user.id,
        recipientName,
        street: validatedData.street,
        number: validatedData.number,
        complement: validatedData.complement || "",
        city: validatedData.city,
        state: validatedData.state,
        neighborhood: validatedData.neighborhood,
        zipCode: validatedData.zipCode,
        country: validatedData.country,
        phone: validatedData.phone,
        cpfOrCnpj: validatedData.cpfOrCnpj,
      })
      .returning();

    return { success: true, data: shippingAddress };
  } catch (error) {
    console.error("Erro ao criar endereço:", error);

    if (error instanceof Error) {
      throw new Error(`Erro ao salvar endereço: ${error.message}`);
    }

    throw new Error("Erro interno do servidor");
  }
};
