"use client";

import { useState } from "react";

import { AddressForm } from "@/components/common/address-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
}

const Addresses = ({ shippingAddresses }: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const {
    data: addresses,
    isLoading,
    error,
  } = useShippingAddresses({
    initialData: shippingAddresses,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Endereços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground">Carregando endereços...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Endereços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-red-500">Erro ao carregar endereços</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Endereços</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAddress || ""}
          onValueChange={setSelectedAddress}
          className="space-y-3"
        >
          {/* Renderizar endereços existentes */}
          {addresses?.map((address) => (
            <Card key={address.id} className="cursor-pointer hover:bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <div className="flex-1">
                    <Label
                      htmlFor={address.id}
                      className="cursor-pointer font-medium"
                    >
                      {address.recipientName}
                    </Label>
                    <div className="text-sm text-muted-foreground mt-1">
                      <p>
                        {address.street}, {address.number}
                        {address.complement && `, ${address.complement}`}
                      </p>
                      <p>
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <p>CEP: {address.zipCode}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Botão para adicionar novo endereço */}
          <Card className="cursor-pointer hover:bg-muted/50">
            <CardContent className="pt-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new" className="cursor-pointer">
                  Adicionar novo endereço
                </Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {/* Formulário para novo endereço */}
        {selectedAddress === "add_new" && (
          <div className="mt-4">
            <AddressForm
              onSuccess={() => {
                setSelectedAddress(null);
                // A query será invalidada automaticamente pelo hook
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
