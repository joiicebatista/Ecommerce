"use client";

import { ShoppingBagIcon } from "lucide-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBagIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ShoppingBagIcon />
            <SheetTitle>Sacola</SheetTitle>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
