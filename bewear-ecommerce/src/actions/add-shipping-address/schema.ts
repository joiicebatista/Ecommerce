import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.string().email("Email inválido"),
  firstName: z.string().min(1, "Nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  cpfOrCnpj: z
    .string()
    .min(11, "CPF/CNPJ inválido")
    .max(18, "CPF/CNPJ inválido"),
  phone: z.string().min(10, "Celular é obrigatório"),
  zipCode: z.string().min(8, "CEP é obrigatório").max(9, "CEP inválido"),
  street: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório").max(2, "Estado inválido"),
  country: z.string().min(1, "País é obrigatório").default("Brasil"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
