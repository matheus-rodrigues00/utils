"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountedPrice = exports.discountOnPrice = void 0;
/**
 * This method should calculate the discount amount based on the original price and discount percentage
 * @param price
 * @param discount
 * @returns number
 */
function discountOnPrice(price, discount) {
    if (discount > 100) {
        throw new Error("Discount can't be bigger than 100");
    }
    if (discount < 0) {
        throw new Error("Discount can't be smaller than 0");
    }
    const discounted_value = price * (discount / 100);
    return discounted_value;
}
exports.discountOnPrice = discountOnPrice;
/**
 * This method should calculate the discounted price based on the original price and discount percentage
 * @param price
 * @param discount
 * @returns number
 */
function discountedPrice(price, discount) {
    if (discount > 100) {
        throw new Error("Discount can't be bigger than 100");
    }
    if (discount < 0) {
        throw new Error("Discount can't be smaller than 0");
    }
    const discounted_value = price * (discount / 100);
    return price - discounted_value;
}
exports.discountedPrice = discountedPrice;
