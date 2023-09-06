"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validBrazilianPhoneNumber = void 0;
/**
 * This method recieves a time in milliseconds and returns a promise that resolves after that time.
 * @param phoneNumber
 * @returns {boolean}
 */
function validBrazilianPhoneNumber(phoneNumber) {
    const sanitized_number = phoneNumber.replace(/[^0-9]/g, "");
    const regex = /^(?:55)?0?(\d{2})(\d{8,9})$/;
    return regex.test(sanitized_number);
}
exports.validBrazilianPhoneNumber = validBrazilianPhoneNumber;
