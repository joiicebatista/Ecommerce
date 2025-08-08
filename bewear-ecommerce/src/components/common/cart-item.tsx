"use client";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { incrementCartProductQuantity } from "@/actions/increment-cart-product-quantity";
import { removeCartProduct } from "@/actions/remove-cart-product";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increment-cart-products";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-cart-products";

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const incrementCartProductQuantityMutation = useIncreaseCartProduct(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
    });
  };
  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto diminuida.");
      },
    });
  };
  const handleIncreaseQuantityClick = () => {
    incrementCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto aumentada.");
      },
    });
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={productVariantImageUrl}
            alt={productVariantName}
            width={78}
            height={78}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{productName}</p>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-xs font-medium">
                {productVariantName}
              </p>
              <Button
                className="h-4 w-4"
                variant="ghost"
                onClick={handleDecreaseQuantityClick}
              >
                <MinusIcon />
              </Button>
              <p className="text-xs font-medium">{quantity}</p>
              <Button
                className="h-4 w-4"
                variant="ghost"
                onClick={handleIncreaseQuantityClick}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <Button variant="outline" size="icon" onClick={handleDeleteClick}>
            <TrashIcon />
          </Button>
          <p className="text-sm font-bold">
            {formatCentsToBRL(productVariantPriceInCents)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
