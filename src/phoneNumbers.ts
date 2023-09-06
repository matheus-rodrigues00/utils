/**
 * This method recieves a time in milliseconds and returns a promise that resolves after that time.
 * @param phoneNumber
 * @returns {boolean}
 */
function validBrazilianPhoneNumber(phoneNumber: string): boolean {
    const sanitized_number: string = phoneNumber.replace(/[^0-9]/g, "");
    const regex: RegExp = /^(?:55)?0?(\d{2})(\d{8,9})$/;

    return regex.test(sanitized_number);
  }
  
  export { validBrazilianPhoneNumber };
  