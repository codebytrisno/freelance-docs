"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { QuotationData } from "./QuotationForm";
import { copyToClipboard, formatDocumentText } from "../lib/clipboard";
import { exportDocumentToPDF } from "../lib/pdf";
import { exportToExcel, importFromExcel } from "../lib/excel";
import { downloadPrd } from "../lib/prd";

interface QuotationPreviewProps {
  data: QuotationData;
  onImport?: (data: QuotationData) => void;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function QuotationPreview({ data, onImport }: QuotationPreviewProps) {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);
  const [printing, setPrinting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalHours = data.platforms.reduce(
    (s, p) => s + p.items.reduce((s2, it) => s2 + (it.estimatedHours || 0), 0),
    0
  );
  const totalHarga = totalHours * data.hourlyRate;
  const estimatedDays = data.workHoursPerDay > 0 ? Math.ceil(totalHours / data.workHoursPerDay) : 0;

  const handleExportExcel = () => {
    exportToExcel(data);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importFromExcel(file);
      onImport?.(imported);
    } catch (err) {
      alert("Gagal import file. Pastikan format file sesuai.");
    }
    e.target.value = "";
  };

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
    const success = await exportDocumentToPDF("quotation");
    setPrinting(false);
    if (!success) alert("Gagal export PDF. Silakan coba lagi.");
  };

  return (
    <div className="w-full lg:w-7/12 flex flex-col gap-[16px]">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant uppercase">
          Preview Dokumen
        </h3>
        <div className="flex gap-[8px] flex-wrap">
          <button
            onClick={handleImportClick}
            className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container transition-colors text-[14px] leading-[1.4] tracking-[0.05em] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            Import Excel
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container transition-colors text-[14px] leading-[1.4] tracking-[0.05em] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Excel
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-[4px] px-[16px] py-[8px] rounded-full border transition-all text-[14px] leading-[1.4] tracking-[0.05em] font-medium ${
              copySuccess
                ? "bg-secondary text-on-secondary border-secondary"
                : "bg-surface-container-lowest border-outline-variant hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {copySuccess ? "check" : "content_copy"}
            </span>
            {copySuccess ? "Tersalin!" : "Salin Teks"}
          </button>
          <button
            onClick={() => downloadPrd(data)}
            className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container transition-colors text-[14px] leading-[1.4] tracking-[0.05em] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            Generate PRD
          </button>
          <button
            onClick={handlePrint}
            disabled={printing}
            className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-surface-container-lowest border border-outline-variant hover:bg-surface-container transition-colors text-[14px] leading-[1.4] tracking-[0.05em] font-medium disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {printing ? "hourglass_empty" : "print"}
            </span>
            {printing ? "Memproses..." : "Cetak PDF"}
          </button>
          <button
            onClick={() => router.push("/kontrak")}
            className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-full bg-primary text-on-primary border border-primary hover:opacity-90 transition-all text-[14px] leading-[1.4] tracking-[0.05em] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            Lanjut ke Kontrak
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleImportFile}
        />
      </div>

      <div className="document-canvas bg-surface-container-lowest w-full p-[40px] md:p-[60px] flex flex-col overflow-hidden relative border border-outline-variant/20 rounded-sm">
        {/* Header Title */}
        <div className="text-center mb-[32px]">
          <div className="font-serif italic font-bold text-[22px] leading-[1.4] text-primary uppercase tracking-[0.02em]">
            SYSTEM DEVELOPMENT QUOTATION
          </div>

        </div>

        {/* Info Section */}
        <table className="w-full mb-[32px] text-[12px] leading-[1.5]">
          <tbody>
            <tr>
              <td className="font-bold text-on-surface-variant w-[140px] align-top">Nomor</td>
              <td className="text-on-surface">: {data.quotationNo || "-"}</td>
            </tr>
            <tr>
              <td className="font-bold text-on-surface-variant align-top">Tanggal</td>
              <td className="text-on-surface">: {data.date ? formatDate(data.date) : "-"}</td>
            </tr>
            <tr>
              <td className="font-bold text-on-surface-variant align-top">Nama Project</td>
              <td className="text-on-surface">: {data.projectName || "-"}</td>
            </tr>
            <tr>
              <td className="font-bold text-on-surface-variant align-top">Developer</td>
              <td className="text-on-surface">: {data.freelancerName || "-"}</td>
            </tr>
            <tr>
              <td className="font-bold text-on-surface-variant align-top">Perusahaan</td>
              <td className="text-on-surface">: {data.clientCompany || "-"}</td>
            </tr>
            <tr>
              <td className="font-bold text-on-surface-variant align-top">Diwakili oleh</td>
              <td className="text-on-surface">: {data.clientName || "-"}</td>
            </tr>
            <tr>
              <td className="font-bold text-on-surface-variant align-top">Masa Berlaku</td>
              <td className="text-on-surface">: {data.validUntil ? formatDate(data.validUntil) : "-"}</td>
            </tr>
          </tbody>
        </table>

        {/* Feature Table */}
        {data.platforms.some((p) => p.items.length > 0) && (
          <table className="w-full border-collapse mb-[32px] text-[11px] leading-[1.5]">
            <thead>
              <tr className="bg-surface-container border-y-2 border-primary">
                <th className="text-left py-[8px] px-[8px] font-bold uppercase w-[120px]">
                  Platform
                </th>
                <th className="text-left py-[8px] px-[8px] font-bold uppercase">
                  Fitur Utama
                </th>
                <th className="text-center py-[8px] px-[8px] font-bold uppercase w-[60px]">
                  Estimasi Waktu (Jam)
                </th>
                <th className="text-left py-[8px] px-[8px] font-bold uppercase">
                  Fitur Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {data.platforms.map((platform, pi) =>
                platform.items.map((item, ii) => {
                  const details = item.details
                    ? item.details.split("\n").filter((d) => d.trim())
                    : [];
                  const isFirst = ii === 0;
                  return (
                    <tr key={`${pi}-${ii}`} className="border-b border-outline-variant/20">
                      {isFirst && (
                        <td
                          rowSpan={platform.items.length}
                          className="py-[8px] px-[8px] font-bold text-on-surface align-top text-[12px]"
                        >
                          {platform.name}
                        </td>
                      )}
                      <td className="py-[8px] px-[8px] text-on-surface font-medium">
                        {item.title}
                      </td>
                      <td className="py-[8px] px-[8px] text-center text-on-surface">
                        {item.estimatedHours || 0}
                      </td>
                      <td className="py-[8px] px-[8px] text-on-surface-variant align-top">
                        {details.length > 0 ? (
                          <div className="space-y-[2px]">
                            {details.map((d, di) => (
                              <div key={di}>{d}</div>
                            ))}
                          </div>
                        ) : (
                          <span className="italic text-on-surface-variant/50">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {/* Total Row */}
            <tfoot>
              <tr className="bg-surface-container border-t-2 border-primary">
                <td colSpan={2} className="py-[8px] px-[8px] font-bold text-right text-[12px]">
                  Total
                </td>
                <td className="py-[8px] px-[8px] text-center font-bold text-[12px]">
                  {totalHours}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}

        {/* Ringkasan Penawaran */}
        <div className="border border-outline-variant/30 rounded-sm p-[16px] space-y-[6px] text-[12px] leading-[1.5]">
          <div className="font-bold text-[14px] text-primary mb-[8px]">Penawaran</div>
          <div className="grid grid-cols-[140px_1fr] gap-x-[16px]">
            <span className="font-semibold text-on-surface-variant">Teknologi</span>
            <span className="text-on-surface">: {data.technology || "-"}</span>

            <span className="font-semibold text-on-surface-variant">Durasi Kerja</span>
            <span className="text-on-surface">: {estimatedDays} hari</span>

            <span className="font-semibold text-on-surface-variant">Harga (Rp)</span>
            <span className="text-on-surface font-bold text-[14px]">
              : Rp {totalHarga.toLocaleString("id-ID")}
            </span>

            <span className="font-semibold text-on-surface-variant">Termin Pembayaran</span>
            <span className="text-on-surface">: {data.paymentTerms || "-"}</span>

            <span className="font-semibold text-on-surface-variant">Maintenance</span>
            <span className="text-on-surface">: {data.maintenance || "-"}</span>

            <span className="font-semibold text-on-surface-variant">Bonus</span>
            <span className="text-on-surface">: {data.bonus || "-"}</span>
          </div>
        </div>

        {/* Decorative Background */}
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
