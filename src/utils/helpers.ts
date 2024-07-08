/**
 * function to create a delimiter from numbers that have reached thousands
 *
 * @export
 * @param {number} currency the number that you will separate with point for thousand
 * @returns {string}
 */
export function formatCurrency(currency: number): string {
  return currency.toLocaleString('en-ID');
}

/**
 * Get total price calculate with discount, this function will call function `formatCurrency` for the result
 *
 * @param {number} price total price that you will calculate with discount
 * @param {number} discount the discount that you have
 * @returns {string}
 */
export const getTotalPriceWithDiscount = (
  price: number,
  discount: number
): string => {
  const calculateDiscount = (100 - discount) / 100;
  return formatCurrency(price * calculateDiscount);
};
