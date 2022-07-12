const toReal = (value: number | string) => {
  return Number(value)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace("R$", "R$ ");
};
export default toReal;
