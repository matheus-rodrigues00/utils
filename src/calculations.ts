/**
 * This method should calculate the discount amount based on the original price and discount percentage
 * @param price
 * @param discount
 * @returns number
 */
function discountOnPrice(price: number, discount: number): number {
  if (discount > 100) {
    throw new Error("Discount can't be bigger than 100");
  }
  if (discount < 0) {
    throw new Error("Discount can't be smaller than 0");
  }
  const discounted_value: number = price * (discount / 100);

  return discounted_value;
}

/**
 * This method should calculate the discounted price based on the original price and discount percentage
 * @param price
 * @param discount
 * @returns number
 */
function discountedPrice(price: number, discount: number): number {
  if (discount > 100) {
    throw new Error("Discount can't be bigger than 100");
  }
  if (discount < 0) {
    throw new Error("Discount can't be smaller than 0");
  }
  const discounted_value: number = price * (discount / 100);

  return price - discounted_value;
}

export { discountOnPrice, discountedPrice };
