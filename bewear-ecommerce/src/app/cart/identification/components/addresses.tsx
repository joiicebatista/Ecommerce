"use client";

import { useState } from "react";

import { AddressForm } from "@/components/common/address-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Endereços</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAddress || ""}
          onValueChange={setSelectedAddress}
        >
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <div className="mt-4">
            <AddressForm onSuccess={() => setSelectedAddress(null)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
