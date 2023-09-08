"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDiscount = exports.getDiscountedValue = void 0;
/**
 * This method should calculate the discount amount based on the original price and discount percentage
 * @param price
 * @param discount_percentage
 * @returns number
 */
function getDiscountedValue(price, discount_percentage) {
    if (discount_percentage > 100 || discount_percentage < 0) {
        throw new Error("Discount must be a value between 0 and 100");
    }
    const discounted_value = price * (discount_percentage / 100);
    return discounted_value;
}
exports.getDiscountedValue = getDiscountedValue;
/**
 * This method should calculate the discounted price based on the original price and discount percentage
 * @param price
 * @param discount_percentage
 * @returns number
 */
function applyDiscount(price, discount_percentage) {
    if (discount_percentage > 100 || discount_percentage < 0) {
        throw new Error("Discount must be a value between 0 and 100");
    }
    const discounted_value = price * (discount_percentage / 100);
    return price - discounted_value;
}
exports.applyDiscount = applyDiscount;
