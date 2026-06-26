import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#3525cd",
          borderRadius: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Document */}
        <svg width="90" height="100" viewBox="0 0 24 28" fill="none">
          <rect x="2" y="2" width="18" height="23" rx="3" fill="white" />
          <path d="M15 2v5h5" fill="white" />
          <path d="M15 2v5h5" stroke="#3525cd" strokeWidth="0.6" />
          <rect x="6" y="10" width="10" height="1.4" rx="0.7" fill="#3525cd" fillOpacity="0.3" />
          <rect x="6" y="14" width="8" height="1.4" rx="0.7" fill="#3525cd" fillOpacity="0.3" />
          <rect x="6" y="18" width="6" height="1.4" rx="0.7" fill="#3525cd" fillOpacity="0.3" />
        </svg>
        {/* Checkmark circle */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          style={{ position: "absolute", bottom: 12, right: 12 }}
        >
          <circle cx="24" cy="24" r="24" fill="#22c55e" />
          <path d="M14 24.5l6.5 6.5 13-13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
