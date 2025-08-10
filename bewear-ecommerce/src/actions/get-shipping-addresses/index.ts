"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getShippingAddresses = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    const shippingAddresses = await db.query.shippingAddressTable.findMany({
      where: eq(shippingAddressTable.userId, session.user.id),
      orderBy: (shippingAddresses, { desc }) => [desc(shippingAddresses.createdAt)],
    });

    return shippingAddresses;
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    
    if (error instanceof Error) {
      throw new Error(`Erro ao buscar endereços: ${error.message}`);
    }
    
    throw new Error("Erro interno do servidor");
  }
};
