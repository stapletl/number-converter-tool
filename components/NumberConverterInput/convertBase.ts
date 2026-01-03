/**
 * Converts a number string from one base to another.
 * @param {string} value the number string to convert
 * @param {number} fromBase the base of the input number string
 * @param {number} toBase the base to convert the number string to
 * @returns {string} the converted number string
 * @throws {RangeError} if fromBase or toBase is out of range
 * @throws {Error} if the input value contains invalid digits for the fromBase
 * @example
 * convertBase("1010", 2, 10); // returns "10"
 * convertBase("A", 16, 2); // returns "1010"
 */
const convertBase = (
  value: string,
  fromBase: number,
  toBase: number
): string => {
  // Align with getValidInput.ts character order
  const allowedDigits: string[] =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/".split(
      ""
    );

  // For bases <= 36, only lowercase letters are used (0-9a-z)
  // Make input case-insensitive by normalizing to uppercase
  // For bases > 36, case matters (a-z and A-Z are different digits)
  if (fromBase <= 36) {
    value = value.toUpperCase();
  }

  if (fromBase < 2 || fromBase > allowedDigits.length) {
    throw new RangeError(
      `convertBase() fromBase argument must be between 2 and ${allowedDigits.length}`
    );
  }

  if (toBase < 2 || toBase > allowedDigits.length) {
    throw new RangeError(
      `convertBase() toBase argument must be between 2 and ${allowedDigits.length}`
    );
  }

  const fromRange = allowedDigits.slice(0, fromBase);
  const toRange = allowedDigits.slice(0, toBase);

  let decValue = value
    .split("")
    .reverse()
    .reduce((carry: number, digit: string, index: number) => {
      const fromIndex = fromRange.indexOf(digit);
      if (fromIndex === -1) {
        throw new Error(`Invalid digit ${digit} for base ${fromBase}.`);
      }
      return carry + fromIndex * Math.pow(fromBase, index);
    }, 0);

  let newValue = value === "0" ? "0" : "";
  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue;
    decValue = Math.floor(decValue / toBase); // Use Math.floor for integer division
  }
  return newValue || "";
};

export default convertBase;
