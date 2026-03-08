import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Number Converter - Binary, Octal, Decimal & Hex";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        padding: "60px",
        gap: "32px",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#fafafa",
          letterSpacing: "-1px",
          textAlign: "center",
        }}
      >
        Number Converter
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 28,
          color: "#a1a1aa",
          textAlign: "center",
        }}
      >
        Real-time base conversion
      </div>

      {/* Base pills */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label: "BIN", sub: "base 2" },
          { label: "OCT", sub: "base 8" },
          { label: "DEC", sub: "base 10" },
          { label: "HEX", sub: "base 16" },
          { label: "CUSTOM", sub: "base 2–64" },
        ].map(({ label, sub }) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "12px",
              padding: "16px 24px",
              gap: "4px",
            }}
          >
            <span style={{ color: "#fafafa", fontSize: 24, fontWeight: 700 }}>
              {label}
            </span>
            <span style={{ color: "#71717a", fontSize: 16 }}>{sub}</span>
          </div>
        ))}
      </div>

      {/* URL */}
      <div
        style={{
          fontSize: 20,
          color: "#52525b",
          marginTop: "8px",
        }}
      >
        number-converter-tool.vercel.app
      </div>
    </div>,
    { ...size },
  );
}
