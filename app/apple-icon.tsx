import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        {/* Binary icon — two rounded rectangles mirroring the SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fafafa"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="14" y="14" width="4" height="6" rx="2" />
          <rect x="6" y="4" width="4" height="6" rx="2" />
          <path d="M6 20h4" />
          <path d="M14 10h4" />
          <path d="M6 14h2v6" />
          <path d="M14 4h2v6" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
