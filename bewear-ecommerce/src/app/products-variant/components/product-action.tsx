"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionProps {
  productVariantId: string;
}

const ProductAction = ({ productVariantId }: ProductActionProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
      <div className="space-y-5">
        <h3 className="font-medium">Quantidade</h3>
        <div className="flex w-[100px] justify-between items-center rounded-lg border">
          <Button size="icon" variant="ghost" onClick={handleDecrement}>
            <MinusIcon />
          </Button>
          <p>{quantity}</p>
          <Button size="icon" variant="ghost" onClick={handleIncrement}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="px-5 space-y-3">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="w-full rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductAction;
