"use client";

import { BastData } from "./BastForm";

interface BastPreviewProps {
  data: BastData;
}

export default function BastPreview({ data }: BastPreviewProps) {
  const completionDateFormatted = data.completionDate
    ? new Date(data.completionDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "__________";

  const deliverablesList = data.deliverables
    .split("\n")
    .filter((item) => item.trim() !== "")
    .map((item) => item.trim());

  return (
    <section className="w-full lg:w-[60%] sticky top-[100px] h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar bg-surface-container rounded-xl p-[16px] lg:p-[40px] border border-outline-variant/30">
      <div className="flex justify-between items-center mb-[16px] px-[16px]">
        <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
          PREVIEW DOKUMEN
        </span>
        <div className="flex gap-[8px]">
          <button className="p-[4px] hover:bg-surface-bright rounded-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">zoom_in</span>
          </button>
          <button className="p-[4px] hover:bg-surface-bright rounded-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">print</span>
          </button>
        </div>
      </div>

      {/* The "Paper" */}
      <div className="document-canvas p-[40px] md:p-[60px] font-serif text-[#1a1a1a] leading-relaxed mx-auto max-w-[800px] transition-all duration-700 opacity-100 translate-y-0">
        <div className="text-center mb-[40px]">
          <h2 className="text-[22px] font-bold uppercase border-b-2 border-black inline-block px-[16px] pb-[4px]">
            Berita Acara Serah Terima
          </h2>
          <p className="text-[14px] mt-[8px] font-sans">
            Nomor: <span>{data.contractNumber || "..."}</span>
          </p>
        </div>

        <div className="space-y-[16px] text-[14px]">
          <p>
            Pada hari ini, tanggal{" "}
            <span className="font-bold underline">{completionDateFormatted}</span>, bertempat di{" "}
            <span className="font-bold underline">_________________</span>, kami yang bertanda
            tangan di bawah ini:
          </p>

          <div className="pl-[16px] space-y-[8px]">
            <div className="flex">
              <div className="w-32">Nama</div>
              <div className="w-4">:</div>
              <div className="font-bold">{data.freelancerName || "__________________________"}</div>
            </div>
            <div className="flex">
              <div className="w-32">Alamat/Instansi</div>
              <div className="w-4">:</div>
              <div>{data.freelancerAddress || "__________________________"}</div>
            </div>
          </div>

          <p>
            Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Freelancer)</strong>.
          </p>

          <div className="pl-[16px] space-y-[8px]">
            <div className="flex">
              <div className="w-32">Nama</div>
              <div className="w-4">:</div>
              <div className="font-bold">{data.clientName || "__________________________"}</div>
            </div>
            <div className="flex">
              <div className="w-32">Perusahaan</div>
              <div className="w-4">:</div>
              <div>{data.clientCompany || "__________________________"}</div>
            </div>
          </div>

          <p>
            Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Klien)</strong>.
          </p>
        </div>

        <div className="mt-[40px] text-[14px] space-y-[16px]">
          <p>
            PIHAK PERTAMA dengan ini menyerahkan hasil pekerjaan kepada PIHAK KEDUA, dan PIHAK
            KEDUA menyatakan telah menerima hasil pekerjaan berupa:
          </p>
          <div className="px-[16px]">
            <p className="font-bold mb-[4px]">
              Proyek: <span>{data.projectName || "__________________________"}</span>
            </p>
            <ul className="list-disc list-inside space-y-[4px] min-h-[60px]">
              {deliverablesList.length > 0 ? (
                deliverablesList.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>Pekerjaan Sesuai Kontrak</li>
              )}
            </ul>
          </div>

          <div className="bg-[#f9f9f9] p-[16px] border border-dashed border-gray-300 italic text-[13px]">
            <span className="font-bold not-italic">Catatan:</span>{" "}
            <span>{data.notes || "Tidak ada catatan tambahan."}</span>
          </div>

          <p>
            Demikian Berita Acara Serah Terima ini dibuat dalam rangkap 2 (dua) yang masing-masing
            mempunyai kekuatan hukum yang sama untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        {/* Signatures */}
        <div className="mt-[80px] grid grid-cols-2 text-[14px]">
          <div className="text-center">
            <p>Diserahkan Oleh,</p>
            <p className="font-bold">PIHAK PERTAMA</p>
            <div className="h-24"></div>
            <p className="font-bold underline">
              ( {data.freelancerName || "_________________"} )
            </p>
          </div>
          <div className="text-center">
            <p>Diterima Oleh,</p>
            <p className="font-bold">PIHAK KEDUA</p>
            <div className="h-24"></div>
            <p className="font-bold underline">( {data.clientName || "_________________"} )</p>
          </div>
        </div>
      </div>
    </section>
  );
}
