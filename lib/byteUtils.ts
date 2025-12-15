import type { DataTypeId } from "./dataTypeConfig";

export type Endianness = "big" | "little";

export type ByteRepresentation = {
  bytes: string[];
  formatted: string;
};

const BYTE_SIZES: Record<DataTypeId, number> = {
  int8: 1,
  uint8: 1,
  int16: 2,
  uint16: 2,
  int32: 4,
  uint32: 4,
  int64: 8,
  uint64: 8,
};

/**
 * Returns the number of bytes for a given data type
 */
export function getByteSize(dataTypeId: DataTypeId): number {
  return BYTE_SIZES[dataTypeId];
}

/**
 * Returns true if the data type has more than one byte
 */
export function isMultiByte(dataTypeId: DataTypeId): boolean {
  return getByteSize(dataTypeId) > 1;
}

/**
 * Converts a BigInt value to a byte array
 */
function valueToBytes(
  value: bigint,
  byteSize: number,
  signed: boolean
): Uint8Array {
  const bytes = new Uint8Array(byteSize);
  let workingValue = value;

  // Handle negative signed integers using two's complement
  if (signed && value < BigInt(0)) {
    const maxValue = BigInt(2) ** BigInt(byteSize * 8);
    workingValue = maxValue + value;
  }

  // Extract bytes in big-endian order
  for (let i = byteSize - 1; i >= 0; i--) {
    bytes[i] = Number(workingValue & BigInt(0xff));
    workingValue = workingValue >> BigInt(8);
  }

  return bytes;
}

/**
 * Formats a value as a byte representation according to endianness
 * Returns null if the value is invalid or empty
 */
export function formatByteRepresentation(
  value: string,
  dataTypeId: DataTypeId,
  endianness: Endianness
): ByteRepresentation | null {
  // Return null for empty or partial input
  if (!value || value === "" || value === "-") return null;

  try {
    const bigIntValue = BigInt(value);
    const byteSize = getByteSize(dataTypeId);
    const signed = dataTypeId.startsWith("int") && !dataTypeId.startsWith("uint");

    // Convert to bytes (big-endian order)
    const byteArray = valueToBytes(bigIntValue, byteSize, signed);

    // Apply endianness (reverse for little-endian)
    const orderedBytes =
      endianness === "little"
        ? Array.from(byteArray).reverse()
        : Array.from(byteArray);

    // Format as hex strings
    const bytes = orderedBytes.map((b) =>
      b.toString(16).toUpperCase().padStart(2, "0")
    );

    return {
      bytes,
      formatted: bytes.join(" "),
    };
  } catch {
    // Invalid number format
    return null;
  }
}
