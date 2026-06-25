"use client";

import { QuotationData } from "./QuotationForm";

interface QuotationPreviewProps {
  data: QuotationData;
}

export default function QuotationPreview({ data }: QuotationPreviewProps) {
  const total = data.items.reduce((sum, item) => sum + item.price, 0);
  const dpAmount = (total * data.dpPercent) / 100;

  const handleCopy = () => {
    // Copy functionality
    alert("Teks dokumen berhasil disalin!");
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col gap-[16px]">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant uppercase">
          Preview Dokumen
        </h3>
        <div className="flex gap-[8px]">
          <button
            onClick={handleCopy}
            className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-white border border-outline-variant hover:bg-surface-container transition-colors text-[14px] leading-[1.4] tracking-[0.05em] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Salin Teks
          </button>
          <button className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-white border border-outline-variant hover:bg-surface-container transition-colors text-[14px] leading-[1.4] tracking-[0.05em] font-medium">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Cetak
          </button>
        </div>
      </div>

      {/* Paper Container */}
      <div className="document-canvas bg-white w-full p-[40px] md:p-[60px] flex flex-col overflow-hidden relative border border-outline-variant/20 rounded-sm">
        {/* Letterhead */}
        <div className="flex justify-between items-start mb-[40px]">
          <div>
            <div className="font-serif italic font-bold text-[24px] leading-[1.4] text-primary mb-[4px]">
              QUOTATION
            </div>
            <div className="text-[12px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              #QTN-2024-001
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-[16px] leading-[1.5]">Seno Freelance</div>
            <div className="text-[12px] leading-[1.4] text-on-surface-variant">
              Jakarta, Indonesia
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-[40px] grid grid-cols-2 gap-[24px]">
          <div>
            <p className="text-[12px] leading-[1.4] font-bold uppercase text-on-surface-variant mb-[4px]">
              Kepada:
            </p>
            <div className="font-bold text-[16px] leading-[1.5]">
              {data.clientName || "PT. Sukses Selalu"}
            </div>
            <div className="text-[16px] leading-[1.5] text-on-surface-variant">
              {data.clientEmail || "hello@client.com"}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[12px] leading-[1.4] font-bold uppercase text-on-surface-variant mb-[4px]">
              Tanggal:
            </p>
            <div className="text-[16px] leading-[1.5]">
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Project Title */}
        <div className="mb-[24px]">
          <p className="text-[12px] leading-[1.4] font-bold uppercase text-on-surface-variant mb-[4px]">
            Project:
          </p>
          <div className="font-bold text-[24px] leading-[1.4] font-serif">
            {data.projectName || "Desain Website E-Commerce"}
          </div>
        </div>

        {/* Table */}
        <div className="flex-grow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-[8px] font-bold text-[12px] leading-[1.4] uppercase">
                  Deskripsi Pekerjaan
                </th>
                <th className="text-right py-[8px] font-bold text-[12px] leading-[1.4] uppercase">
                  Harga (IDR)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 || data.items.every(item => !item.service) ? (
                <tr className="border-b border-outline-variant/30">
                  <td className="py-[16px]">
                    <div className="font-bold text-[16px] leading-[1.5]">UI Design</div>
                    <div className="text-[12px] leading-[1.4] text-on-surface-variant italic">
                      High-fidelity design untuk 10 halaman mobile & desktop
                    </div>
                  </td>
                  <td className="py-[16px] text-right text-[16px] leading-[1.5]">
                    Rp 5.000.000
                  </td>
                </tr>
              ) : (
                data.items.map((item, index) => (
                  <tr key={index} className="border-b border-outline-variant/30">
                    <td className="py-[16px]">
                      <div className="font-bold text-[16px] leading-[1.5]">
                        {item.service || "Tanpa Nama"}
                      </div>
                      <div className="text-[12px] leading-[1.4] text-on-surface-variant italic">
                        {item.description || ""}
                      </div>
                    </td>
                    <td className="py-[16px] text-right text-[16px] leading-[1.5]">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-[40px] space-y-[8px] pt-[24px] border-t-2 border-outline-variant">
          <div className="flex justify-between items-center">
            <span className="text-[16px] leading-[1.5]">Total Penawaran</span>
            <span className="font-bold text-[24px] leading-[1.4] text-primary">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="text-[12px] leading-[1.4]">
              Down Payment (DP) {data.dpPercent}%
            </span>
            <span className="font-medium text-[16px] leading-[1.5]">
              Rp {dpAmount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-[40px] text-[12px] leading-[1.4] italic text-on-surface-variant">
          <p>
            * Metode Pembayaran:{" "}
            <span className="font-bold not-italic text-on-surface">{data.payMethod}</span>
          </p>
          <p>* Penawaran ini berlaku selama 14 hari sejak tanggal diterbitkan.</p>
        </div>

        {/* Decorative Background element */}
        <div className="absolute bottom-[-10px] right-[-10px] opacity-[0.03] select-none pointer-events-none">
          <span
            className="material-symbols-outlined text-[200px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            description
          </span>
        </div>
      </div>
    </div>
  );
}
