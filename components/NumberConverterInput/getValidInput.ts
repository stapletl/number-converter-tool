const getValidInput = (base: number, input: string) => {
  if (base < 2 || base > 64) {
    return "";
  }

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
  const validChars = chars.slice(0, base);

  const pattern = new RegExp(`[^${validChars}]`, 'gi');
  return input.replace(pattern, '');
};

export default getValidInput;
