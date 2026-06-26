import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#3525cd",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Document */}
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <rect x="1" y="1" width="14" height="18" rx="2" fill="white" />
          <path d="M11 1v4h4" fill="white" />
          <path d="M11 1v4h4" stroke="#3525cd" strokeWidth="0.5" />
          <rect x="4" y="8" width="8" height="1.2" rx="0.6" fill="#3525cd" fillOpacity="0.3" />
          <rect x="4" y="11" width="6" height="1.2" rx="0.6" fill="#3525cd" fillOpacity="0.3" />
          <rect x="4" y="14" width="5" height="1.2" rx="0.6" fill="#3525cd" fillOpacity="0.3" />
        </svg>
        {/* Checkmark circle */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ position: "absolute", bottom: 2, right: 2 }}
        >
          <circle cx="6" cy="6" r="6" fill="#22c55e" />
          <path d="M3.5 6l1.5 1.5 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
