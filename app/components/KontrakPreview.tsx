"use client";

import { useState } from "react";
import { KontrakData } from "./KontrakForm";
import { copyToClipboard, formatDocumentText } from "../lib/clipboard";
import { exportDocumentToPDF } from "../lib/pdf";

interface KontrakPreviewProps {
  data: KontrakData;
}

export default function KontrakPreview({ data }: KontrakPreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [printing, setPrinting] = useState(false);

  const handleCopy = async () => {
    const documentElement = document.querySelector(".document-canvas");
    if (!documentElement) return;

    const text = formatDocumentText(documentElement as HTMLElement);
    const success = await copyToClipboard(text);

    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handlePrint = async () => {
    setPrinting(true);
    const success = await exportDocumentToPDF("kontrak");
    setPrinting(false);
    
    if (!success) {
      alert("Gagal export PDF. Silakan coba lagi.");
    }
  };

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const deadlineFormatted = data.deadline
    ? new Date(data.deadline).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "...";

  return (
    <section className="flex-1 bg-surface-dim p-[24px] md:p-[40px] overflow-y-auto custom-scrollbar flex flex-col items-center">
      <div className="w-full max-w-[800px] mb-[16px] flex justify-between items-center text-on-surface-variant">
        <div className="flex items-center gap-[8px]">
          <span className="material-symbols-outlined">visibility</span>
          <span className="text-[14px] leading-[1.4] tracking-[0.05em] uppercase">
            Pratinjau Real-time
          </span>
        </div>
        <div className="flex items-center gap-[16px]">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-[4px] px-[12px] py-[6px] rounded-full border transition-all text-[12px] font-medium ${
              copySuccess
                ? "bg-secondary text-white border-secondary"
                : "bg-white border-outline-variant hover:bg-surface-container"
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
            className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-full border transition-all text-[12px] font-medium bg-white border-outline-variant hover:bg-surface-container disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              {printing ? "hourglass_empty" : "picture_as_pdf"}
            </span>
            {printing ? "Proses..." : "PDF"}
          </button>
          <button className="p-[8px] rounded-full hover:bg-white/50 transition-colors">
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <button className="p-[8px] rounded-full hover:bg-white/50 transition-colors">
            <span className="material-symbols-outlined">file_download</span>
          </button>
          <button className="p-[8px] rounded-full hover:bg-white/50 transition-colors">
            <span className="material-symbols-outlined">print</span>
          </button>
        </div>
      </div>

      {/* A4 Document Page */}
      <div className="document-canvas w-full max-w-[800px] bg-white p-20 font-serif text-[#222]">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[8rem] font-black opacity-[0.03] transform -rotate-45 whitespace-nowrap uppercase">
            DRAFT KONTRAK
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-16 relative z-10">
          <h1 className="text-2xl font-bold uppercase underline decoration-2 underline-offset-4 mb-2">
            Perjanjian Kerja Sama Jasa
          </h1>
          <p className="text-sm italic">
            Nomor: FDX/{new Date().getFullYear()}/001
          </p>
        </header>

        <div className="space-y-8 relative z-10">
          {/* Identity Section */}
          <section>
            <p className="mb-4">
              Perjanjian ini dibuat pada tanggal{" "}
              <span className="border-b border-dotted border-black px-4">{today}</span>, oleh dan
              antara:
            </p>
            <div className="space-y-2 ml-4">
              <p>
                <strong>Pihak Pertama:</strong>{" "}
                <span className="border-b border-dotted border-black px-4 min-w-[200px] inline-block">
                  {data.freelancerName || "..."}
                </span>{" "}
                (Selanjutnya disebut sebagai &quot;Penyedia Jasa&quot;)
              </p>
              <p>
                <strong>Pihak Kedua:</strong>{" "}
                <span className="border-b border-dotted border-black px-4 min-w-[200px] inline-block">
                  {data.clientName || "..."}
                </span>{" "}
                (Selanjutnya disebut sebagai &quot;Klien&quot;)
              </p>
            </div>
          </section>

          {/* Scope Section */}
          <section>
            <h2 className="font-bold mb-2">Pasal 1: Lingkup Pekerjaan</h2>
            <p>
              Penyedia Jasa setuju untuk melaksanakan pekerjaan berupa{" "}
              <strong>{data.projectTitle || "..."}</strong> dengan rincian sebagai berikut:
            </p>
            <p className="mt-2 text-sm leading-relaxed italic">
              {data.projectDescription || "... Deskripsi pekerjaan akan muncul di sini ..."}
            </p>
          </section>

          {/* Payment Section */}
          <section>
            <h2 className="font-bold mb-2">Pasal 2: Nilai Kontrak & Pembayaran</h2>
            <p>
              Klien menyetujui total nilai kontrak sebesar{" "}
              <strong>
                Rp <span>{data.contractValue || "0"}</span>
              </strong>{" "}
              yang akan diselesaikan paling lambat pada tanggal{" "}
              <strong>
                <span>{deadlineFormatted}</span>
              </strong>
              .
            </p>
          </section>

          {/* Generic Clauses */}
          <section>
            <h2 className="font-bold mb-2">Pasal 3: Ketentuan Lainnya</h2>
            <ul className="list-decimal ml-6 space-y-1 text-sm">
              {data.includeCopyright && (
                <li>
                  Hak Cipta atas hasil karya akan menjadi milik Klien sepenuhnya setelah pelunasan
                  dilakukan.
                </li>
              )}
              {data.includeConfidentiality && (
                <li>
                  Kedua belah pihak wajib menjaga kerahasiaan data yang dipertukarkan selama masa
                  kerja.
                </li>
              )}
              {data.includeRevisionLimit && (
                <li>Revisi pekerjaan dibatasi maksimal 3 (tiga) kali revisi minor.</li>
              )}
              <li>Perselisihan yang muncul akan diselesaikan secara musyawarah mufakat.</li>
            </ul>
          </section>

          {/* Signature Section */}
          <section className="pt-16 flex justify-between items-start">
            <div className="text-center w-1/3">
              <p className="mb-20">Pihak Pertama,</p>
              <div className="border-b border-black w-full"></div>
              <p className="mt-2">{data.freelancerName || "..."}</p>
            </div>
            <div className="text-center w-1/3">
              <p className="mb-20">Pihak Kedua,</p>
              <div className="border-b border-black w-full"></div>
              <p className="mt-2">{data.clientName || "..."}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
