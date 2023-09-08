/**
 * Checks if a string phone number has valid brazilian phone number format.
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - True if the string is a valid brazilian phone number, false otherwise.
 */
function validBrazilianPhoneNumber(phoneNumber: string): boolean {
  const sanitized_number: string = phoneNumber.replace(/[^0-9]/g, "");
  const regex: RegExp = /^(?:55)?0?(\d{2})(\d{8,9})$/;

  return regex.test(sanitized_number);
}

export { validBrazilianPhoneNumber };
