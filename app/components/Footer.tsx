import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-[24px] py-[40px] max-w-[1280px] mx-auto gap-[16px]">
        <div className="flex flex-col items-center md:items-start gap-[4px]">
          <div
            className="text-[24px] leading-[1.4] font-semibold text-primary"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            FreelanceDocs
          </div>
          <p className="text-[16px] leading-[1.5] text-on-surface-variant">
            © 2026 Created By Trisno Sanjaya
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-[24px]">
          <Link
            href="#privacy"
            className="text-on-surface-variant hover:text-primary transition-colors text-[16px] leading-[1.5]"
          >
            Kebijakan Privasi
          </Link>
          <Link
            href="#terms"
            className="text-on-surface-variant hover:text-primary transition-colors text-[16px] leading-[1.5]"
          >
            Syarat & Ketentuan
          </Link>
          <Link
            href="#contact"
            className="text-on-surface-variant hover:text-primary transition-colors text-[16px] leading-[1.5]"
          >
            Kontak Kami
          </Link>
        </div>
      </div>
    </footer>
  );
}
