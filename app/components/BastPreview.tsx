"use client";

import { useState } from "react";
import { BastData } from "./BastForm";
import { copyToClipboard, formatDocumentText } from "../lib/clipboard";
import { exportDocumentToPDF } from "../lib/pdf";

interface BastPreviewProps {
  data: BastData;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BastPreview({ data }: BastPreviewProps) {
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
    const success = await exportDocumentToPDF("bast");
    setPrinting(false);
    if (!success) alert("Gagal export PDF. Silakan coba lagi.");
  };

  const bastDateFormatted = formatDate(data.bastDate);
  const quotationDateFormatted = formatDate(data.quotationDate);
  const today = formatDate(new Date().toISOString().split("T")[0]);

  return (
    <section className="w-full lg:w-[60%] sticky top-[100px] h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar bg-surface-container rounded-xl p-[16px] lg:p-[40px] border border-outline-variant/30">
      <div className="flex justify-between items-center mb-[16px] px-[16px]">
        <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">PREVIEW DOKUMEN</span>
        <div className="flex gap-[8px]">
          <button onClick={handleCopy} className={`flex items-center gap-[4px] px-[12px] py-[6px] rounded-full border transition-all text-[12px] font-medium ${copySuccess ? "bg-secondary text-on-secondary border-secondary" : "bg-surface-container-lowest border-outline-variant hover:bg-surface-container"}`}>
            <span className="material-symbols-outlined text-[16px]">{copySuccess ? "check" : "content_copy"}</span>
            {copySuccess ? "Tersalin!" : "Salin"}
          </button>
          <button onClick={handlePrint} disabled={printing} className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-full border transition-all text-[12px] font-medium bg-surface-container-lowest border-outline-variant hover:bg-surface-container disabled:opacity-50">
            <span className="material-symbols-outlined text-[16px]">{printing ? "hourglass_empty" : "picture_as_pdf"}</span>
            {printing ? "Proses..." : "PDF"}
          </button>
        </div>
      </div>

      {/* Document Paper */}
      <div className="document-canvas w-full max-w-[800px] mx-auto bg-surface-container-lowest p-[40px] md:p-[60px] pb-[80px] md:pb-[100px] font-serif text-[13px] leading-[1.7] text-on-surface relative border border-outline-variant/20 rounded-sm">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="text-[10rem] font-black opacity-[0.035] -rotate-45 whitespace-nowrap uppercase select-none">BAST</div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-[36px]">
            <h1 className="text-[20px] font-bold uppercase tracking-[0.02em]">Berita Acara Serah Terima (BAST)</h1>
            <p className="text-[14px] mt-[4px] font-bold">Pengembangan Sistem Informasi {data.projectName || "[Nama Sistem]"}</p>
            <p className="text-[12px] text-on-surface-variant mt-[2px]">by {data.freelancerName || "[Nama Developer]"}</p>
          </div>

          {/* Nomor & Tanggal */}
          <table className="w-full mb-[24px] text-[13px]">
            <tbody>
              <tr>
                <td className="w-[100px] align-top font-bold">Nomor</td>
                <td className="align-top">: BAST/{data.bastNo || "[KODE]"}/{data.bastDate ? new Date(data.bastDate + "T00:00:00").toLocaleDateString("id-ID", { month: "long" }) : "[BULAN]"}/{new Date().getFullYear()}/{data.bastNo ? "" : "[NOMOR]"}</td>
              </tr>
              <tr>
                <td className="w-[100px] align-top font-bold">Tanggal</td>
                <td className="align-top">: {bastDateFormatted || "[Tanggal BAST]"}</td>
              </tr>
            </tbody>
          </table>

          {/* Pihak Pertama */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Pihak Pertama (Pemberi Kerja)</h2>
            <table className="w-full text-[13px]">
              <tbody>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Nama Perusahaan/Instansi</td>
                  <td className="align-top py-[2px]">: {data.clientCompany || <span className="text-on-surface-variant italic">[Nama Perusahaan/Klien]</span>}</td>
                </tr>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Diwakili oleh</td>
                  <td className="align-top py-[2px]">: {data.clientName || <span className="text-on-surface-variant italic">[Nama Klien]</span>}</td>
                </tr>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Alamat</td>
                  <td className="align-top py-[2px]">: {data.clientAddress || <span className="text-on-surface-variant italic">[Alamat Lengkap Klien]</span>}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Pihak Kedua */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Pihak Kedua (Penyedia Jasa)</h2>
            <table className="w-full text-[13px]">
              <tbody>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Nama Developer/Perusahaan</td>
                  <td className="align-top py-[2px]">: {data.freelancerName || <span className="text-on-surface-variant italic">[Nama Developer]</span>}</td>
                </tr>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Alamat</td>
                  <td className="align-top py-[2px]">: {data.freelancerAddress || <span className="text-on-surface-variant italic">[Alamat Developer]</span>}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Dasar Pelaksanaan */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Dasar Pelaksanaan</h2>
            <p className="text-justify indent-[32px]">
              Berdasarkan Surat Penawaran (Quotation) Nomor: <strong>{data.quotationNo || "[Nomor Quotation]"}</strong> tanggal{" "}
              <strong>{quotationDateFormatted || "[Tanggal Quotation]"}</strong> untuk pengembangan sistem informasi{" "}
              <strong>{data.projectName || "[Nama Sistem]"}</strong>.
            </p>
          </section>

          {/* Lingkup Pekerjaan */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Lingkup Pekerjaan Yang Diserahkan</h2>

            <p className="font-bold mt-[6px]">Deliverables Yang Diserahkan:</p>
            <div className="ml-[20px] space-y-[4px]">
              {data.systemUrl && <p>Link akses: <a href={data.systemUrl} className="text-primary underline">{data.systemUrl}</a></p>}
              {data.appUrl && <p>Link Download Aplikasi Mobile: <a href={data.appUrl} className="text-primary underline">{data.appUrl}</a></p>}
              {!data.systemUrl && !data.appUrl && <p className="text-on-surface-variant italic">[URL Sistem / Aplikasi]</p>}
            </div>

            <p className="font-bold mt-[10px]">Spesifikasi Sistem:</p>
            <div className="ml-[20px]">
              <p>Fitur utama: Sesuai dengan requirements yang telah disepakati (Terlampir)</p>
            </div>

            <p className="font-bold mt-[10px]">Testing & Verifikasi:</p>
            <div className="ml-[20px] space-y-[4px]">
              <p><span className="text-green-600">✓</span> Functional Testing — Semua fitur berjalan sesuai spesifikasi</p>
              <p><span className="text-green-600">✓</span> User Acceptance Testing (UAT) — Diverifikasi oleh user</p>
              <p><span className="text-green-600">✓</span> Performance Testing — Sistem berjalan optimal</p>
              <p><span className="text-green-600">✓</span> Bug Testing — Tidak ditemukan major/critical bugs</p>
            </div>
          </section>

          {/* Pernyataan Penerimaan */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Pernyataan Penerimaan</h2>

            <p className="font-bold mt-[6px]">Pihak Pertama ({data.clientName || "[Nama Klien]"}):</p>
            <div className="ml-[20px] space-y-[4px]">
              <p><span className="text-green-600">✓</span> Sistem telah diterima dan sesuai dengan spesifikasi yang diminta</p>
              <p><span className="text-green-600">✓</span> Sistem telah melalui proses testing dan tidak ditemukan major bugs</p>
              <p><span className="text-green-600">✓</span> Seluruh deliverables telah diterima dengan lengkap</p>
              <p><span className="text-green-600">✓</span> Sistem siap untuk diimplementasikan dan digunakan</p>
            </div>

            <p className="font-bold mt-[10px]">Pihak Kedua ({data.freelancerName || "[Nama Developer]"}):</p>
            <div className="ml-[20px] space-y-[4px]">
              <p><span className="text-green-600">✓</span> Seluruh pekerjaan pengembangan sistem telah diselesaikan 100%</p>
              <p><span className="text-green-600">✓</span> Sistem telah diserahkan kepada client dalam kondisi siap pakai</p>
              <p><span className="text-green-600">✓</span> Technical support akan diberikan sesuai dengan ketentuan dalam dokumen rujukan</p>
              <p><span className="text-green-600">✓</span> Garansi sistem berlaku sesuai dengan perjanjian</p>
            </div>
          </section>

          {/* Masa Garansi */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Masa Garansi & Support</h2>

            <p className="font-bold mt-[6px]">Periode Garansi:</p>
            <div className="ml-[20px]">
              <p><strong>{data.warrantyPeriod || "[X]"}</strong> Hari sejak tanggal BAST</p>
            </div>

            <p className="font-bold mt-[10px]">Technical Support:</p>
            <div className="ml-[20px] space-y-[4px]">
              <p>Technical supports meliputi:</p>
              <p>a. Perbaikan bugs yang dilaporkan oleh client,</p>
              <p>b. Pertanyaan teknis</p>
            </div>

            <p className="font-bold mt-[10px]">Notes:</p>
            <div className="ml-[20px] text-[12px] text-justify">
              <p>
                Technical supports selama masa garansi tidak dikenakan biaya. Technical supports selama masa garansi tidak mengcover biaya untuk penambahan atau upgrade fitur. Apabila client hendak melakukan tambah/upgrade fitur, wajib diinfokan kepada{" "}
                <strong>{data.freelancerName || "[Nama Developer]"}</strong> terlebih dahulu untuk dibuat estimasi biaya dan durasi pengerjaannya. Meski demikian,{" "}
                <strong>{data.freelancerName || "[Nama Developer]"}</strong> tetap berhak menolak tambahan/update fitur tersebut apabila tidak memungkinkan.
              </p>
            </div>

            {data.notes && (
              <div className="ml-[20px] mt-[8px] p-[12px] bg-surface-container-low border border-dashed border-outline-variant italic text-[12px]">
                <span className="font-bold not-italic">Catatan tambahan:</span> {data.notes}
              </div>
            )}
          </section>

          {/* Penutup */}
          <section className="mb-[36px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[6px]">Penutup</h2>
            <p className="text-justify indent-[32px]">
              Berita Acara Serah Terima ini dibuat sebagai bukti bahwa proses serah terima sistem telah dilaksanakan dengan baik dan menjadi dasar untuk proses pembayaran final.
            </p>
          </section>

          {/* Penandatanganan */}
          <section className="pt-[32px] border-t-2 border-on-surface/15">
            <h2 className="text-center font-bold text-[14px] uppercase tracking-[0.04em] mb-[8px]">Penandatanganan</h2>
            <p className="text-center mb-[64px] text-[13px]">
              <strong>{data.clientAddress ? data.clientAddress.split(",")[0] : "[Kota]"}</strong>, {today || "[Tanggal]"}
            </p>
            <div className="flex justify-between items-start gap-[40px]">
              <div className="text-center flex-1">
                <p className="font-bold text-[13px] mb-[72px]">Pihak Pertama (Klien)</p>
                <div className="border-b border-on-surface/40 w-full mb-[4px]"></div>
                <p className="text-[13px]">{data.clientName || <span className="text-on-surface-variant italic">(Nama Klien)</span>}</p>
              </div>
              <div className="text-center flex-1">
                <p className="font-bold text-[13px] mb-[72px]">Pihak Kedua (Developer)</p>
                <div className="border-b border-on-surface/40 w-full mb-[4px]"></div>
                <p className="text-[13px]">{data.freelancerName || <span className="text-on-surface-variant italic">(Nama Anda)</span>}</p>
              </div>
            </div>
          </section>

          {/* Bottom spacer */}
          <div className="h-[40px]" />
        </div>
      </div>
    </section>
  );
}
