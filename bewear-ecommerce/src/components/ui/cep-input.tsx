import { forwardRef } from "react";

import { Input } from "@/components/ui/input";

export const CepInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    // Aplica máscara de CEP (00000-000)
    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    const maskedEvent = {
      ...e,
      target: {
        ...e.target,
        value,
      },
    };

    onChange?.(maskedEvent);
  };

  return <Input {...props} ref={ref} onChange={handleChange} maxLength={9} />;
});

CepInput.displayName = "CepInput";
