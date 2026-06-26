import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-[80px] bg-gradient-to-br from-surface to-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col md:flex-row items-center gap-[40px]">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <h1
            className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold md:text-[48px] text-on-surface mb-[16px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Bikin dokumen project freelance dalam{" "}
            <span className="text-primary">hitungan menit.</span>
          </h1>
          <p
            className="text-[18px] leading-[1.6] text-on-surface-variant mb-[40px] max-w-2xl"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Quotation, Timeline, BAST, dan Kontrak yang rapi dan profesional.
            Fokus pada karya Anda, biar kami yang urus administrasinya.
          </p>
          <div className="flex flex-col sm:flex-row gap-[16px] justify-center md:justify-start">
            <Link
              href="/quotation"
              className="bg-primary text-on-primary px-[40px] py-[16px] rounded-xl text-[14px] leading-[1.4] tracking-[0.05em] font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Buat Dokumen Sekarang
            </Link>
            <button className="border border-outline text-primary px-[40px] py-[16px] rounded-xl text-[14px] leading-[1.4] tracking-[0.05em] font-bold hover:bg-surface-container transition-all">
              Lihat Contoh
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex-1 relative w-full aspect-square md:aspect-auto h-[400px]">
          {/* Abstract document preview graphics */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Background Card */}
            <div className="w-64 h-80 bg-surface-container-lowest rounded-lg shadow-xl transform translate-x-12 translate-y-8 z-0 opacity-40 animate-float-1"></div>

            {/* Front Card with Content */}
            <div className="w-64 h-80 bg-surface-container-lowest rounded-lg shadow-2xl transform z-10 flex flex-col p-[16px] border border-outline-variant animate-float-2">
              <div className="h-4 w-1/2 bg-surface-container-highest rounded mb-[16px]"></div>
              <div className="space-y-[8px] mb-[24px]">
                <div className="h-2 w-full bg-surface-container rounded"></div>
                <div className="h-2 w-full bg-surface-container rounded"></div>
                <div className="h-2 w-3/4 bg-surface-container rounded"></div>
              </div>
              <div className="mt-auto flex justify-between items-center">
                <div className="h-8 w-8 rounded-full bg-primary-container opacity-20"></div>
                <div className="h-4 w-20 bg-secondary-container opacity-20 rounded"></div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-0 w-24 h-24 bg-secondary opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-32 h-32 bg-primary opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Background Shape */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
    </section>
  );
}
