"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const updateCartShippingAddress = async (shippingAddressId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    // Buscar o carrinho do usuário
    const cart = await db.query.cartTable.findFirst({
      where: eq(cartTable.userId, session.user.id),
    });

    if (!cart) {
      throw new Error("Carrinho não encontrado");
    }

    // Atualizar o endereço de entrega do carrinho
    const [updatedCart] = await db
      .update(cartTable)
      .set({
        shippingAddressId,
      })
      .where(eq(cartTable.id, cart.id))
      .returning();

    return { success: true, data: updatedCart };
  } catch (error) {
    console.error("Erro ao atualizar endereço do carrinho:", error);

    if (error instanceof Error) {
      throw new Error(`Erro ao atualizar endereço: ${error.message}`);
    }

    throw new Error("Erro interno do servidor");
  }
};
