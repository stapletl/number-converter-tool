import { describe, it, expect } from "bun:test";
import convertBase from "./convertBase";

describe("convertBase", () => {
  describe("basic conversions", () => {
    it("converts 0 in any base to 0", () => {
      expect(convertBase("0", 10, 2)).toBe("0");
      expect(convertBase("0", 2, 16)).toBe("0");
      expect(convertBase("0", 64, 10)).toBe("0");
    });

    it("converts decimal to binary", () => {
      expect(convertBase("10", 10, 2)).toBe("1010");
      expect(convertBase("255", 10, 2)).toBe("11111111");
    });

    it("converts binary to decimal", () => {
      expect(convertBase("1010", 2, 10)).toBe("10");
      expect(convertBase("11111111", 2, 10)).toBe("255");
    });

    it("converts decimal to hex (uppercase output)", () => {
      expect(convertBase("255", 10, 16)).toBe("FF");
      expect(convertBase("16", 10, 16)).toBe("10");
    });

    it("converts hex to decimal (case-insensitive input)", () => {
      expect(convertBase("A", 16, 10)).toBe("10");
      expect(convertBase("a", 16, 10)).toBe("10");
      expect(convertBase("ff", 16, 10)).toBe("255");
      expect(convertBase("FF", 16, 10)).toBe("255");
    });

    it("converts base 36 max digit", () => {
      expect(convertBase("Z", 36, 10)).toBe("35");
      expect(convertBase("z", 36, 10)).toBe("35");
    });

    it("identity conversion (same base)", () => {
      expect(convertBase("1", 10, 10)).toBe("1");
      expect(convertBase("ABC", 16, 16)).toBe("ABC");
    });

    it("handles single digit", () => {
      expect(convertBase("1", 2, 10)).toBe("1");
      expect(convertBase("F", 16, 10)).toBe("15");
    });

    it("returns empty string for empty input", () => {
      expect(convertBase("", 10, 2)).toBe("");
    });
  });

  describe("large numbers beyond Number.MAX_SAFE_INTEGER", () => {
    it("converts 2^53 (Number.MAX_SAFE_INTEGER + 1) correctly", () => {
      // 2^53 = 9007199254740992
      expect(convertBase("9007199254740992", 10, 2)).toBe(
        "100000000000000000000000000000000000000000000000000000"
      );
      expect(convertBase("100000000000000000000000000000000000000000000000000000", 2, 10)).toBe(
        "9007199254740992"
      );
    });

    it("converts max uint64 (2^64 - 1) correctly", () => {
      // FFFFFFFFFFFFFFFF hex = 18446744073709551615 decimal
      expect(convertBase("FFFFFFFFFFFFFFFF", 16, 10)).toBe("18446744073709551615");
      expect(convertBase("18446744073709551615", 10, 16)).toBe("FFFFFFFFFFFFFFFF");
    });

    it("round-trips large decimal through hex", () => {
      const large = "18446744073709551615";
      expect(convertBase(convertBase(large, 10, 16), 16, 10)).toBe(large);
    });

    it("round-trips large decimal through binary", () => {
      const large = "9999999999999999";
      expect(convertBase(convertBase(large, 10, 2), 2, 10)).toBe(large);
    });

    it("correctly converts 9999999999999999 (the reported bug case)", () => {
      // This was the value that triggered the bug — must NOT round to 10000000000000000
      const result = convertBase("9999999999999999", 10, 10);
      expect(result).toBe("9999999999999999");
      expect(result).not.toBe("10000000000000000");
    });

    it("handles very large numbers (2^128 - 1)", () => {
      const maxUint128Hex = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
      const maxUint128Dec = "340282366920938463463374607431768211455";
      expect(convertBase(maxUint128Hex, 16, 10)).toBe(maxUint128Dec);
      expect(convertBase(maxUint128Dec, 10, 16)).toBe(maxUint128Hex);
    });
  });

  describe("high-base conversions (base > 36, case-sensitive)", () => {
    it("treats lowercase and uppercase as different digits in base > 36", () => {
      // In base 64: 0-9 = 0-9, A-Z = 10-35, a-z = 36-61, + = 62, / = 63
      expect(convertBase("a", 64, 10)).toBe("36");
      expect(convertBase("A", 64, 10)).toBe("10");
    });

    it("converts + and / (base 64 digits)", () => {
      expect(convertBase("+", 64, 10)).toBe("62");
      expect(convertBase("/", 64, 10)).toBe("63");
    });

    it("round-trips through base 64", () => {
      const val = "255";
      expect(convertBase(convertBase(val, 10, 64), 64, 10)).toBe(val);
    });
  });

  describe("error cases", () => {
    it("throws RangeError when fromBase < 2", () => {
      expect(() => convertBase("1", 1, 10)).toThrow(RangeError);
    });

    it("throws RangeError when toBase < 2", () => {
      expect(() => convertBase("1", 10, 1)).toThrow(RangeError);
    });

    it("throws RangeError when fromBase > 64", () => {
      expect(() => convertBase("1", 65, 10)).toThrow(RangeError);
    });

    it("throws RangeError when toBase > 64", () => {
      expect(() => convertBase("1", 10, 65)).toThrow(RangeError);
    });

    it("throws Error for digit invalid in fromBase", () => {
      expect(() => convertBase("2", 2, 10)).toThrow(Error);
      expect(() => convertBase("G", 16, 10)).toThrow(Error);
      expect(() => convertBase("Z", 10, 2)).toThrow(Error);
    });
  });
});
