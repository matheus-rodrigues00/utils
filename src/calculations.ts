/**
 * Calculates the discount amount based on the original price and discount percentage
 * @param {number} price - The original price
 * @param {number} discount_percentage - The discount percentage
 * @returns number
 * author: nalmeida94 - Nathan Almeida
 */
function getDiscountedValue(
  price: number,
  discount_percentage: number
): number {
  if (discount_percentage > 100 || discount_percentage < 0) {
    throw new Error("Discount must be a value between 0 and 100");
  }
  const discounted_value: number = price * (discount_percentage / 100);

  return discounted_value;
}

/**
 * Calculates the discounted price based on the original price and discount percentage
 * @param {number} price - The original price
 * @param {number} discount_percentage - The discount percentage
 * @returns number
 * author: nalmeida94 - Nathan Almeida
 */
function applyDiscount(price: number, discount_percentage: number): number {
  if (discount_percentage > 100 || discount_percentage < 0) {
    throw new Error("Discount must be a value between 0 and 100");
  }
  const discounted_value: number = price * (discount_percentage / 100);

  return price - discounted_value;
}

export { getDiscountedValue, applyDiscount };
