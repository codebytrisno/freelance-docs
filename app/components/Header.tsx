"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-[24px] md:px-[40px] py-[16px] max-w-[1280px] mx-auto">
        <div className="flex items-center gap-[40px]">
          <Link
            href="/"
            className="text-[24px] leading-[1.4] font-semibold text-primary"
          >
            FreelanceDocs
          </Link>
          <div className="hidden md:flex items-center gap-[40px]">
            <Link
              href="/"
              className={`text-[14px] leading-[1.4] tracking-[0.05em] font-medium transition-colors duration-200 ${
                isActive("/") && pathname === "/"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-1">
                Dokumen
                <span className="material-symbols-outlined text-[18px]">
                  expand_more
                </span>
              </button>
              <div className="hidden group-hover:block absolute top-full left-0 mt-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg py-2 min-w-[200px]">
                <Link
                  href="/quotation"
                  className="block px-4 py-2 text-[14px] text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  📋 Quotation
                </Link>
                <Link
                  href="/timeline"
                  className="block px-4 py-2 text-[14px] text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  📅 Timeline
                </Link>
                <Link
                  href="/kontrak"
                  className="block px-4 py-2 text-[14px] text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  📝 Kontrak
                </Link>
                <Link
                  href="/bast"
                  className="block px-4 py-2 text-[14px] text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  ✅ BAST
                </Link>
              </div>
            </div>
            <Link
              href="#bantuan"
              className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              Bantuan
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <Link
            href="/quotation"
            className="bg-primary text-on-primary px-[24px] py-[8px] rounded-lg text-[14px] leading-[1.4] tracking-[0.05em] font-semibold hover:opacity-90 active:scale-95 transition-all"
          >
            Mulai Buat
          </Link>
          <button className="md:hidden flex items-center p-[8px]">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
