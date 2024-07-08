export function formatCurrency(currency: number): string {
  return currency.toLocaleString('en-ID');
}

export const getTotalPriceWithDiscount = (price: number, discount: number) => {
  const calculateDiscount = (100 - discount) / 100;
  return formatCurrency(price * calculateDiscount);
};
