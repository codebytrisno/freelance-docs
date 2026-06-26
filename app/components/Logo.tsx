"use client";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Document body */}
        <rect x="5" y="2" width="18" height="24" rx="2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        {/* Document fold corner */}
        <path d="M19 2v6h6" fill="currentColor" fillOpacity="0.08" />
        <path d="M19 2v6h6" stroke="currentColor" strokeWidth="1.5" />
        {/* Text lines */}
        <rect x="9" y="10" width="10" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.25" />
        <rect x="9" y="14" width="8" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.25" />
        <rect x="9" y="18" width="6" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.25" />
        {/* Pen/checkmark */}
        <circle cx="27" cy="21" r="5" fill="currentColor" />
        <path d="M24.5 21.5l1.5 1.5 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[24px] leading-[1.4] font-semibold" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
        FreelanceDocs
      </span>
    </span>
  );
}
