export const formatCentsToBRL = (centes: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(centes / 100);
};
