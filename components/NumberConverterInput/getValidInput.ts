export const getValidCharsForBase = (base: number): string => {
  if (base < 2 || base > 64) {
    return "";
  }

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
  return chars.slice(0, base);
};

const getValidInput = (base: number, input: string) => {
  if (base < 2 || base > 64) {
    return { validInput: "", hasInvalidChars: false, validChars: "" };
  }

  const validChars = getValidCharsForBase(base);

  // For bases <= 36, make input case-insensitive by normalizing to uppercase
  // For bases > 36, preserve case since both upper and lowercase are different digits
  let normalizedInput = input;
  if (base <= 36) {
    normalizedInput = input.toUpperCase();
  }

  const pattern = new RegExp(`[^${validChars}]`, base <= 36 ? 'gi' : 'g');
  const validInput = normalizedInput.replace(pattern, '');
  const hasInvalidChars = validInput !== normalizedInput;

  return { validInput, hasInvalidChars, validChars };
};

export default getValidInput;
