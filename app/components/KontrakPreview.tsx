"use client";

import { useState } from "react";
import { KontrakData } from "./KontrakForm";
import { copyToClipboard, formatDocumentText } from "../lib/clipboard";
import { exportDocumentToPDF } from "../lib/pdf";

interface KontrakPreviewProps {
  data: KontrakData;
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

function terbilang(angka: number): string {
  const bilangan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if (angka < 12) return bilangan[angka];
  if (angka < 20) return terbilang(angka - 10) + " Belas";
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + " Puluh " + terbilang(angka % 10);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " Ratus " + terbilang(angka % 100);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " Ribu " + terbilang(angka % 1000);
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + " Juta " + terbilang(angka % 1000000);
  return "";
}

export default function KontrakPreview({ data }: KontrakPreviewProps) {
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
    const success = await exportDocumentToPDF("kontrak");
    setPrinting(false);
    if (!success) alert("Gagal export PDF. Silakan coba lagi.");
  };

  const today = formatDate(new Date().toISOString().split("T")[0]);
  const startFormatted = formatDate(data.startDate);
  const deadlineFormatted = formatDate(data.deadline);

  // Parse contract value
  const rawValue = data.contractValue.replace(/[^0-9]/g, "");
  const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
  const dpAmount = Math.round(numericValue * 0.3);
  const progressAmount = Math.round(numericValue * 0.4);
  const finalAmount = Math.round(numericValue * 0.3);

  // Calculate estimated days
  const estimatedDays = data.startDate && data.deadline
    ? Math.ceil((new Date(data.deadline + "T00:00:00").getTime() - new Date(data.startDate + "T00:00:00").getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const quotationDateFormatted = data.quotationDate
    ? formatDate(data.quotationDate)
    : "";

  return (
    <section className="flex-1 bg-surface-dim p-[24px] md:p-[40px] overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[800px] mb-[16px] mx-auto flex justify-between items-center text-on-surface-variant">
        <div className="flex items-center gap-[8px]">
          <span className="material-symbols-outlined">visibility</span>
          <span className="text-[14px] leading-[1.4] tracking-[0.05em] uppercase">Pratinjau Real-time</span>
        </div>
        <div className="flex items-center gap-[16px]">
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

      {/* A4 Document Page */}
      <div className="document-canvas w-full max-w-[800px] mx-auto bg-surface-container-lowest p-[40px] md:p-[60px] pb-[80px] md:pb-[100px] font-serif text-[13px] leading-[1.7] text-on-surface relative border border-outline-variant/20 rounded-sm">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="text-[10rem] font-black opacity-[0.035] -rotate-45 whitespace-nowrap uppercase select-none">DRAFT KONTRAK</div>
        </div>

        <div className="relative z-10">
          {/* Title */}
          <h1 className="text-[20px] font-bold text-center uppercase mb-[36px] tracking-[0.02em]">
            Surat Perjanjian Kerjasama<br />
            <span className="text-[16px] font-normal normal-case">{data.projectTitle || "Pembuatan Sistem Informasi"}</span>
          </h1>

          {/* Pihak Pertama */}
          <section className="mb-[28px] pb-[16px] border-b border-on-surface/10">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[8px]">Pihak Pertama (Klien)</h2>
            <table className="w-full text-[13px]">
              <tbody>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Nama Perusahaan/Instansi</td>
                  <td className="align-top py-[2px]">: {data.clientCompany || <span className="text-on-surface-variant italic">[Nama Perusahaan/Instansi]</span>}</td>
                </tr>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Diwakili oleh</td>
                  <td className="align-top py-[2px]">: {data.clientName || <span className="text-on-surface-variant italic">[Nama &amp; Jabatan Penanggung Jawab]</span>}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Pihak Kedua */}
          <section className="mb-[28px] pb-[16px] border-b border-on-surface/10">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.04em] mb-[8px]">Pihak Kedua (Developer)</h2>
            <table className="w-full text-[13px]">
              <tbody>
                <tr>
                  <td className="w-[200px] align-top py-[2px]">Nama</td>
                  <td className="align-top py-[2px]">: {data.freelancerName || <span className="text-on-surface-variant italic">[Nama Anda]</span>}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* PASAL 1 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 1 — Objek Perjanjian</h2>
            <p className="text-justify indent-[32px]">
              Pihak Kedua akan menyediakan jasa pengembangan sistem informasi untuk Pihak Pertama dengan spesifikasi, ruang lingkup, dan detail teknis sebagaimana tercantum dalam Dokumen Quotation No.{" "}
              <strong>{data.quotationNo || <span className="text-on-surface-variant italic">[Nomor Quote]</span>}</strong> tanggal{" "}
              <strong>{quotationDateFormatted || <span className="text-on-surface-variant italic">[Tanggal Quote]</span>}</strong>{" "}
              yang merupakan bagian tidak terpisahkan dari perjanjian ini.
            </p>
          </section>

          {/* PASAL 2 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 2 — Ruang Lingkup Pekerjaan</h2>
            <p className="font-bold mt-[8px]">2.1 Tanggung Jawab Pihak Kedua:</p>
            <div className="ml-[20px] space-y-[1px]">
              <p>• Mengembangkan sistem sesuai spesifikasi dalam quotation</p>
              <p>• Melakukan testing dan quality assurance</p>
              <p>• Menyediakan dokumentasi sistem</p>
              <p>• Melakukan deployment dan go-live</p>
              <p>• Memberikan training dasar penggunaan sistem</p>
              <p>• Memberikan garansi sesuai ketentuan dalam perjanjian</p>
            </div>
            <p className="font-bold mt-[10px]">2.2 Tanggung Jawab Pihak Pertama:</p>
            <div className="ml-[20px] space-y-[1px]">
              <p>• Menyediakan data, informasi, dan akses yang diperlukan</p>
              <p>• Melakukan review dan memberikan feedback pada setiap tahapan</p>
              <p>• Menyediakan infrastruktur hosting/server (jika diperlukan)</p>
              <p>• Melakukan acceptance testing dan sign-off</p>
            </div>
          </section>

          {/* PASAL 3 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 3 — Waktu Pelaksanaan</h2>
            <p className="font-bold mt-[8px]">3.1 Jadwal Pengerjaan</p>
            <table className="ml-[20px] text-[13px]">
              <tbody>
                <tr>
                  <td className="w-[180px] align-top py-[2px]">Mulai Pengerjaan</td>
                  <td className="align-top py-[2px]">: <strong>{startFormatted || <span className="text-on-surface-variant italic">[Tanggal Mulai]</span>}</strong></td>
                </tr>
                <tr>
                  <td className="w-[180px] align-top py-[2px]">Target Selesai</td>
                  <td className="align-top py-[2px]">: <strong>{deadlineFormatted || <span className="text-on-surface-variant italic">[Tanggal Selesai]</span>}</strong></td>
                </tr>
                <tr>
                  <td className="w-[180px] align-top py-[2px]">Total Durasi</td>
                  <td className="align-top py-[2px]">: <strong>{estimatedDays > 0 ? estimatedDays : <span className="text-on-surface-variant italic">[X]</span>} hari kerja</strong></td>
                </tr>
              </tbody>
            </table>
            <p className="mt-[10px] text-justify indent-[32px]">
              3.2 Detail milestone dan deliverables mengacu pada dokumen quotation. Setiap milestone memerlukan approval dari Pihak Pertama sebelum melanjutkan ke tahap berikutnya.
            </p>
          </section>

          {/* PASAL 4 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 4 — Nilai Kontrak dan Pembayaran</h2>
            <p className="font-bold mt-[8px]">4.1 Nilai Kontrak</p>
            <div className="ml-[20px] space-y-[2px]">
              <p>
                Total Nilai Proyek: <strong>Rp {data.contractValue || <span className="text-on-surface-variant italic">[Jumlah]</span>}</strong>{" "}
                {numericValue > 0 && <span className="text-[12px]">(Terbilang: <em>{terbilang(numericValue)} Rupiah</em>)</span>}
              </p>
              <p className="text-justify text-[12px] text-on-surface-variant italic">
                Nilai ini sudah termasuk semua biaya pengembangan sebagaimana tercantum dalam quotation, tidak termasuk biaya hosting, domain, atau infrastruktur tambahan yang menjadi tanggung jawab Pihak Pertama.
              </p>
            </div>
            <p className="font-bold mt-[10px]">4.2 Skema Pembayaran</p>
            <div className="ml-[20px] space-y-[2px]">
              <p>• Down Payment (30%): <strong>Rp {dpAmount.toLocaleString("id-ID")}</strong> — saat kontrak ditandatangani</p>
              <p>• Progress Payment (40%): <strong>Rp {progressAmount.toLocaleString("id-ID")}</strong> — saat progress mencapai 60%</p>
              <p>• Final Payment (30%): <strong>Rp {finalAmount.toLocaleString("id-ID")}</strong> — saat serah terima sistem</p>
            </div>
            {(data.bankName || data.bankAccount || data.bankHolder) && (
              <>
                <p className="font-bold mt-[10px]">4.3 Metode Pembayaran</p>
                <table className="ml-[20px] text-[13px]">
                  <tbody>
                    <tr>
                      <td className="w-[140px] align-top py-[2px]">Bank</td>
                      <td className="align-top py-[2px]">: {data.bankName}</td>
                    </tr>
                    <tr>
                      <td className="w-[140px] align-top py-[2px]">No. Rekening</td>
                      <td className="align-top py-[2px]">: {data.bankAccount}</td>
                    </tr>
                    <tr>
                      <td className="w-[140px] align-top py-[2px]">Atas Nama</td>
                      <td className="align-top py-[2px]">: {data.bankHolder}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </section>

          {/* PASAL 5 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 5 — Garansi dan Support</h2>
            <p className="font-bold mt-[8px]">5.1 Garansi</p>
            <div className="ml-[20px] space-y-[2px]">
              <p>• Periode: 3 (tiga) minggu setelah serah terima sistem</p>
              <p>• Cakupan: Perbaikan bug, error, dan penyesuaian minor tanpa biaya tambahan</p>
              <p>• Pengecualian: Penambahan fitur baru, perubahan major, kerusakan akibat penyalahgunaan atau force majeure</p>
            </div>
            <p className="mt-[10px] text-justify indent-[32px]">
              5.2 Support dan maintenance setelah masa garansi dapat disepakati terpisah dengan biaya sesuai kesepakatan kedua belah pihak.
            </p>
          </section>

          {/* PASAL 6 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 6 — Perubahan Scope (Change Request)</h2>
            <p className="text-justify indent-[32px]">
              6.1 Perubahan yang tidak tercantum dalam quotation harus diajukan secara tertulis. Pihak Kedua akan memberikan estimasi biaya dan waktu tambahan dalam 3 hari kerja. Perubahan diimplementasi setelah persetujuan tertulis kedua belah pihak.
            </p>
            <p className="text-justify indent-[32px]">
              6.2 Biaya perubahan dihitung berdasarkan tarif yang disepakati atau negosiasi khusus.
            </p>
          </section>

          {/* PASAL 7 */}
          {data.includeCopyright && (
            <section className="mb-[28px]">
              <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 7 — Hak Kekayaan Intelektual</h2>
              <p className="text-justify indent-[32px]">
                7.1 Source code dan sistem menjadi milik Pihak Pertama setelah pelunasan penuh. Serah terima mencakup source code, database, dan dokumentasi lengkap.
              </p>
              <p className="text-justify indent-[32px]">
                7.2 Pihak Kedua tetap memiliki hak atas metodologi pengembangan dan konsep umum yang dapat digunakan untuk proyek lain yang tidak berkompetisi langsung.
              </p>
            </section>
          )}

          {/* PASAL 8 */}
          {data.includeConfidentiality && (
            <section className="mb-[28px]">
              <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 8 — Kerahasiaan</h2>
              <p className="text-justify indent-[32px]">
                Kedua belah pihak berkomitmen menjaga kerahasiaan seluruh informasi yang diperoleh selama pelaksanaan proyek, termasuk namun tidak terbatas pada data bisnis, strategi, source code, dan informasi teknis lainnya.
              </p>
            </section>
          )}

          {/* PASAL 9 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 9 — Wanprestasi dan Penyelesaian Sengketa</h2>
            <p className="text-justify indent-[32px]">
              9.1 Jika terjadi keterlambatan di luar kendali Pihak Kedua, akan dilakukan penyesuaian jadwal. Keterlambatan akibat kelalaian Pihak Kedua dapat dikenakan sanksi sesuai kesepakatan.
            </p>
            <p className="text-justify indent-[32px]">
              9.2 Penyelesaian sengketa mengutamakan musyawarah mufakat. Jika tidak tercapai kesepakatan, akan diselesaikan melalui mediasi atau sesuai hukum yang berlaku di Indonesia.
            </p>
          </section>

          {/* PASAL 10 */}
          <section className="mb-[28px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 10 — Force Majeure</h2>
            <p className="text-justify indent-[32px]">
              Kedua belah pihak tidak dapat dituntut atas keterlambatan atau kegagalan pelaksanaan kewajiban yang disebabkan oleh keadaan di luar kendali manusia seperti bencana alam, wabah penyakit, kebijakan pemerintah, atau keadaan kahar lainnya.
            </p>
          </section>

          {/* PASAL 11 */}
          <section className="mb-[40px]">
            <h2 className="font-bold text-[14px] uppercase tracking-[0.03em] mb-[10px] pb-[4px] border-b border-on-surface/20">Pasal 11 — Ketentuan Penutup</h2>
            <p className="text-justify indent-[32px]">
              11.1 Perjanjian ini berlaku sejak ditandatangani kedua belah pihak.
            </p>
            <p className="text-justify indent-[32px]">
              11.2 Perubahan atau tambahan perjanjian harus dibuat secara tertulis dan disetujui kedua belah pihak.
            </p>
            <p className="text-justify indent-[32px]">
              11.3 Dokumen Pendukung: Lampiran A: Quotation No. {data.quotationNo || <span className="text-on-surface-variant italic">[Nomor]</span>} tanggal {quotationDateFormatted || <span className="text-on-surface-variant italic">[Tanggal]</span>}.{data.includeRevisionLimit ? " Lampiran B: Ketentuan revisi terbatas." : ""}
            </p>
          </section>

          {/* Signature */}
          <section className="pt-[32px] border-t-2 border-on-surface/15">
            <h2 className="text-center font-bold text-[14px] uppercase tracking-[0.04em] mb-[8px]">Penandatanganan</h2>
            <p className="text-center mb-[64px] text-[13px]">
              <strong>{data.city || <span className="text-on-surface-variant italic">[Kota]</span>}</strong>, {today || <span className="text-on-surface-variant italic">[Tanggal]</span>}
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
            <p className="text-center text-[11px] text-on-surface-variant mt-[28px] italic">
              Kontrak dibuat dalam rangkap 2 (dua) dengan kekuatan hukum yang sama. Dokumen quotation merupakan bagian tidak terpisahkan dari perjanjian ini.
            </p>
          </section>

          {/* Bottom spacer so canvas extends to full content */}
          <div className="h-[40px]" />
        </div>
      </div>
    </section>
  );
}
