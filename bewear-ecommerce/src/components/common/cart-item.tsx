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

import { useState } from "react";

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const handleDecrement = () => {
    setLocalQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleIncrement = () => {
    setLocalQuantity((prev) => prev + 1);
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
                onClick={handleDecrement}
              >
                <MinusIcon />
              </Button>
              <p className="text-xs font-medium">{localQuantity}</p>
              <Button
                className="h-4 w-4"
                variant="ghost"
                onClick={handleIncrement}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <Button variant="outline" size="icon">
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
