"use client";

import { useState } from "react";
import { TimelineData } from "./TimelineForm";
import { copyToClipboard, formatDocumentText } from "../lib/clipboard";
import { exportDocumentToPDF } from "../lib/pdf";

interface TimelinePreviewProps {
  data: TimelineData;
}

export default function TimelinePreview({ data }: TimelinePreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [printing, setPrinting] = useState(false);

  const handleCopy = async () => {
    const el = document.querySelector(".document-canvas");
    if (!el) return;
    const text = formatDocumentText(el as HTMLElement);
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handlePrint = async () => {
    setPrinting(true);
    const success = await exportDocumentToPDF("timeline");
    setPrinting(false);
    if (!success) alert("Gagal export PDF. Silakan coba lagi.");
  };

  const validFeatures = (data.features || []).filter((f) => f.name.trim());
  const totalWeeks = data.totalWeeks || 4;

  return (
    <section className="lg:col-span-7 sticky top-24 self-start">
      <div className="flex justify-between items-center mb-[16px] px-[16px]">
        <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant flex items-center gap-[4px]">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Live Preview
        </span>
        <div className="flex gap-[8px]">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-[4px] px-[12px] py-[6px] rounded-full border transition-all text-[12px] font-medium ${
              copySuccess
                ? "bg-secondary text-on-secondary border-secondary"
                : "bg-surface-container-lowest border-outline-variant hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {copySuccess ? "check" : "content_copy"}
            </span>
            {copySuccess ? "Tersalin!" : "Salin"}
          </button>
          <button
            onClick={handlePrint}
            disabled={printing}
            className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-full border transition-all text-[12px] font-medium bg-surface-container-lowest border-outline-variant hover:bg-surface-container disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              {printing ? "hourglass_empty" : "picture_as_pdf"}
            </span>
            {printing ? "Proses..." : "PDF"}
          </button>
        </div>
      </div>

      {/* Document Paper */}
      <div className="document-canvas bg-surface-container-lowest p-[40px] md:p-[60px] font-serif text-[13px] leading-[1.7] text-on-surface relative border border-outline-variant/20 rounded-sm">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="text-[10rem] font-black opacity-[0.035] -rotate-45 whitespace-nowrap uppercase select-none">TIMELINE PROYEK</div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-[36px]">
            <h1 className="font-serif italic font-bold text-[22px] leading-[1.4] text-primary uppercase tracking-[0.02em]">
              Timeline Proyek
            </h1>
            <p className="text-[12px] text-on-surface-variant mt-[4px]">
              Rencana Jadwal Pengembangan Sistem
            </p>
          </div>

          {/* Info Section */}
          <table className="w-full mb-[32px] text-[12px] leading-[1.5]">
            <tbody>
              <tr>
                <td className="font-bold text-on-surface-variant w-[160px] align-top">Nomor Quotation</td>
                <td className="text-on-surface">: {data.quotationNo || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold text-on-surface-variant align-top">Nama Project</td>
                <td className="text-on-surface">: {data.projectName || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold text-on-surface-variant align-top">Client</td>
                <td className="text-on-surface">: {data.clientName || "-"}</td>
              </tr>
              <tr>
                <td className="font-bold text-on-surface-variant align-top">Developer</td>
                <td className="text-on-surface">: {data.developerName || "-"}</td>
              </tr>
            </tbody>
          </table>

          {/* Summary Card */}
          {validFeatures.length > 0 && (
            <div className="flex gap-[24px] mb-[24px] text-[12px]">
              <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-surface-container rounded-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">checklist</span>
                <span><strong>{validFeatures.length}</strong> Fitur</span>
              </div>
              <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-surface-container rounded-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                <span><strong>{totalWeeks}</strong> Pekan</span>
              </div>
              <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-surface-container rounded-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                <span>Total <strong>{totalWeeks * 7}</strong> Hari</span>
              </div>
            </div>
          )}

          {/* Legend */}
          {validFeatures.length > 0 && (
            <div className="flex gap-[16px] mb-[16px] text-[11px] text-on-surface-variant items-center">
              <span className="flex items-center gap-[4px]">
                <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Pengerjaan
              </span>
            </div>
          )}

          {/* Timeline Table */}
          {validFeatures.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] leading-[1.5] border-collapse border border-outline-variant/40">
                <thead>
                  <tr className="bg-surface-container border-y-2 border-primary">
                    <th className="text-center py-[8px] px-[6px] font-bold text-on-surface border border-outline-variant/40 w-[8px]">
                      No
                    </th>
                    <th className="text-left py-[8px] px-[8px] font-bold text-on-surface border border-outline-variant/40 uppercase">
                      Fitur
                    </th>
                    {Array.from({ length: totalWeeks }, (_, w) => (
                      <th key={w} className="text-center py-[8px] px-[6px] font-bold text-on-surface border border-outline-variant/40 min-w-[56px]">
                        <div className="text-[10px] uppercase tracking-[0.03em]">Pekan</div>
                        <div className="text-[14px] font-serif">{w + 1}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {validFeatures.map((feature, fi) => (
                    <tr key={fi} className="even:bg-surface-container-low/30 border-b border-outline-variant/20">
                      <td className="text-center py-[8px] px-[6px] text-on-surface border-r border-outline-variant/20 font-medium text-[12px]">
                        {fi + 1}
                      </td>
                      <td className="py-[8px] px-[8px] text-on-surface font-medium border-r border-outline-variant/20">
                        {feature.name}
                      </td>
                      {Array.from({ length: totalWeeks }, (_, w) => (
                        <td key={w} className="text-center py-[6px] px-[4px] text-on-surface border-r border-outline-variant/20 last:border-r-0">
                          {feature.weeks.includes(w) ? (
                            <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-full bg-primary/10 mx-auto">
                              <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </span>
                          ) : (
                            <span className="text-on-surface-variant/30">&mdash;</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-container border-t-2 border-primary">
                    <td colSpan={2} className="py-[8px] px-[8px] font-bold text-right text-[12px] text-on-surface">
                      Total
                    </td>
                    {Array.from({ length: totalWeeks }, (_, w) => {
                      const count = validFeatures.filter(f => f.weeks.includes(w)).length;
                      return (
                        <td key={w} className="text-center py-[8px] px-[6px] font-bold text-[12px] text-on-surface border-r border-outline-variant/40 last:border-r-0">
                          {count > 0 ? `${count} fitur` : <span className="text-on-surface-variant/50">&mdash;</span>}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-center py-[80px] border border-dashed border-outline-variant/40 rounded-sm">
              <span className="material-symbols-outlined text-outline-variant text-[48px] block mb-[8px]">
                table_rows
              </span>
              <p className="text-on-surface-variant text-[13px] font-serif">
                Tambah fitur untuk menampilkan timeline.
              </p>
            </div>
          )}

          {/* Signature Section */}
          <div className="mt-[80px] pt-[32px] border-t-2 border-on-surface/15">
            <h2 className="text-center font-bold text-[14px] uppercase tracking-[0.04em] mb-[8px] font-serif">
              Penandatanganan
            </h2>
            <p className="text-center mb-[64px] text-[13px]">
              <strong>{data.clientName || "Klien"}</strong>, &nbsp; {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <div className="flex justify-between items-start gap-[40px]">
              <div className="text-center flex-1">
                <p className="font-bold text-[13px] mb-[72px] font-serif">Pemberi Kerja</p>
                <div className="border-b border-on-surface/40 w-full mb-[4px]"></div>
                <p className="text-[13px]">{data.clientName || <span className="text-on-surface-variant italic">(Nama Klien)</span>}</p>
              </div>
              <div className="text-center flex-1">
                <p className="font-bold text-[13px] mb-[72px] font-serif">Developer</p>
                <div className="border-b border-on-surface/40 w-full mb-[4px]"></div>
                <p className="text-[13px]">{data.developerName || <span className="text-on-surface-variant italic">(Nama Developer)</span>}</p>
              </div>
            </div>
          </div>

          {/* Bottom spacer */}
          <div className="h-[40px]" />
        </div>
      </div>
    </section>
  );
}
