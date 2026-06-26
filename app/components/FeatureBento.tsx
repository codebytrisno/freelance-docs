import Link from "next/link";

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  href: string;
}

const features: FeatureCard[] = [
  {
    title: "Quotation",
    description:
      "Buat penawaran harga yang jelas untuk klien. Hitung otomatis pajak dan diskon untuk transparansi penuh.",
    icon: "request_quote",
    iconBg: "bg-primary-container",
    href: "/quotation",
  },
  {
    title: "Surat Kontrak",
    description:
      "Surat perjanjian kerja dasar untuk keamanan legal. Atur hak cipta dan ketentuan pembayaran dengan aman.",
    icon: "gavel",
    iconBg: "bg-on-secondary-fixed-variant",
    href: "/kontrak",
  },
  {
    title: "Timeline",
    description:
      "Atur fase kerja dan deadline dengan terstruktur. Pastikan klien paham kapan project akan selesai.",
    icon: "schedule",
    iconBg: "bg-secondary-container",
    href: "/timeline",
  },
  {
    title: "BAST",
    description:
      "Berita acara serah terima untuk bukti kerja selesai. Lindungi diri Anda dengan tanda tangan serah terima resmi.",
    icon: "fact_check",
    iconBg: "bg-tertiary-container",
    href: "/bast",
  },
];

export default function FeatureBento() {
  return (
    <section className="py-[80px] bg-background">
      <div className="max-w-[1280px] mx-auto px-[24px]">
        <div className="text-center mb-[40px]">
          <h2
            className="text-[32px] leading-[1.3] font-bold text-on-surface mb-[8px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Pilih Dokumen yang Ingin Dibuat
          </h2>
          <p
            className="text-[16px] leading-[1.5] text-on-surface-variant"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Dokumen standar industri yang siap pakai dalam sekejap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex flex-col bg-surface-container-lowest p-[24px] rounded-xl border border-outline-variant hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-[16px] group-hover:scale-110 transition-transform`}
              >
                <span className="material-symbols-outlined text-on-primary">
                  {feature.icon}
                </span>
              </div>
              <h3
                className="text-[24px] leading-[1.4] font-semibold text-on-surface mb-[8px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[16px] leading-[1.5] text-on-surface-variant flex-grow mb-[40px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {feature.description}
              </p>
              <button className="w-full bg-surface-container-low text-primary py-[8px] rounded-lg text-[14px] leading-[1.4] tracking-[0.05em] font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors">
                Mulai Buat
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
