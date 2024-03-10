const convertBase = (
  value: string,
  fromBase: number,
  toBase: number
): string => {
  const allowedDigits: string[] = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("");

  if (fromBase < 2 || fromBase > allowedDigits.length) {
    throw new RangeError(`convertBase() from_base argument must be between 2 and ${allowedDigits.length}`);
  }

  if (toBase < 2 || toBase > allowedDigits.length) {
    throw new RangeError(`convertBase() to_base argument must be between 2 and ${allowedDigits.length}`);
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

  let newValue = "";
  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue;
    decValue = Math.floor(decValue / toBase); // Use Math.floor for integer division
  }
  return newValue || "";
}

export default convertBase;
