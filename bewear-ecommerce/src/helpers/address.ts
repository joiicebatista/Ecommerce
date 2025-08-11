export const formatAddress = (address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}) => {
  const addressLine = `${address.street}, ${address.number}${
    address.complement ? `, ${address.complement}` : ""
  }`;
  const cityLine = `${address.neighborhood}, ${address.city} - ${address.state}`;
  const zipLine = `CEP: ${address.zipCode}`;
  
  return `${address.recipientName} • ${addressLine}, ${cityLine} • ${zipLine}`;
};
