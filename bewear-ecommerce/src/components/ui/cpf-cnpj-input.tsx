import { forwardRef } from "react";

import { Input } from "@/components/ui/input";

export const CpfCnpjInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    // Aplica máscara de CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00)
    if (value.length <= 11) {
      // CPF
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // CNPJ
      value = value.replace(/(\d{2})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1/$2");
      value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    const maskedEvent = {
      ...e,
      target: {
        ...e.target,
        value,
      },
    };

    onChange?.(maskedEvent);
  };

  return <Input {...props} ref={ref} onChange={handleChange} maxLength={18} />;
});

CpfCnpjInput.displayName = "CpfCnpjInput";
