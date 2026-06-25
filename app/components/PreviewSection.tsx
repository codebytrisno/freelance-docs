export default function PreviewSection() {
  const features = [
    "Format PDF siap cetak & kirim",
    "Template bahasa Indonesia yang baku",
    "Simpan draft untuk diedit nanti",
  ];

  return (
    <section className="py-[80px] bg-surface-container-lowest">
      <div className="max-w-[1280px] mx-auto px-[24px]">
        <div className="flex flex-col lg:flex-row gap-[40px] items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-[16px]">
            <span className="text-primary text-[14px] leading-[1.4] tracking-[0.05em] font-bold">
              PREVIEW REAL-TIME
            </span>
            <h2 className="text-[32px] leading-[1.3] font-bold text-on-surface">
              Lihat Dokumen Saat Anda Mengetik
            </h2>
            <p className="text-[18px] leading-[1.6] text-on-surface-variant">
              Editor kami dirancang khusus untuk freelancer. Tak perlu lagi
              bingung dengan format Word yang berantakan. Isi formulir, lihat
              hasilnya seketika.
            </p>
            <ul className="space-y-[8px]">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-[8px]">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-[16px] leading-[1.5]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Image Preview */}
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="bg-cover bg-center w-full aspect-video"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCG-iRLarH63NFIuYM2UL0M3yhQqwQfbQxXMqay3Oa-OBCGEK9RgMviDxA_IibstZk9HwdgnVQGetjQDRNvyou29HjiRGyGBzkGTQl3slbtFSc96gowATUq0hefzMYJsXSQBTRhVES4b1Fhuvo_HUrZcxCPwneSnwliXFSbOOjrZA_tx-Rx_dEADUoV7M4rGfWovKq40YyTdlvU6sXDElcNLBrkn4eL88CpIlC7S0JSKr8Gofb2cgPwkBarP9Qwb3EcnGluyLabNeQ')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
