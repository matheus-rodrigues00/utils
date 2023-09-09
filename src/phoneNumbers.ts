/**
 * Checks if a string phone number has valid brazilian phone number format.
 * @param {string} phone_number - The phone number to validate.
 * @returns {boolean} - True if the string is a valid brazilian phone number, false otherwise.
 * author: ycarooliveira - Ycaro Oliveira
 */
function validBrazilianPhoneNumber(phone_number: string): boolean {
  const sanitized_number: string = phone_number.replace(/[^0-9]/g, "");
  const regex: RegExp = /^(?:55)?0?(\d{2})(\d{8,9})$/;

  return regex.test(sanitized_number);
}

export { validBrazilianPhoneNumber };
