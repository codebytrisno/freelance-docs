"use client";

import { useState } from "react";

interface KontrakFormProps {
  onUpdate: (data: KontrakData) => void;
}

export interface KontrakData {
  freelancerName: string;
  clientName: string;
  projectTitle: string;
  projectDescription: string;
  contractValue: string;
  deadline: string;
  includeCopyright: boolean;
  includeConfidentiality: boolean;
  includeRevisionLimit: boolean;
}

export default function KontrakForm({ onUpdate }: KontrakFormProps) {
  const [formData, setFormData] = useState<KontrakData>({
    freelancerName: "",
    clientName: "",
    projectTitle: "",
    projectDescription: "",
    contractValue: "",
    deadline: "",
    includeCopyright: true,
    includeConfidentiality: true,
    includeRevisionLimit: false,
  });

  const handleChange = (field: keyof KontrakData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <section className="w-full md:w-[45%] lg:w-[40%] bg-surface border-r border-outline-variant flex flex-col h-full">
      {/* Breadcrumbs & Stepper Header */}
      <div className="px-[24px] py-[16px] border-b border-outline-variant bg-surface-bright">
        <div className="flex items-center gap-[4px] text-[12px] leading-[1.4] text-on-surface-variant mb-[16px]">
          <span>Home</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-medium">Kontrak</span>
        </div>
        {/* Stepper */}
        <div className="flex items-center justify-between gap-[8px]">
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mb-[4px]">
              1
            </div>
            <span className="text-[12px] leading-[1.4] font-medium text-primary">Data Pihak</span>
          </div>
          <div className="h-[2px] bg-outline-variant flex-1 mb-6"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm mb-[4px]">
              2
            </div>
            <span className="text-[12px] leading-[1.4] font-medium text-on-surface-variant">
              Detail Proyek
            </span>
          </div>
          <div className="h-[2px] bg-outline-variant flex-1 mb-6"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm mb-[4px]">
              3
            </div>
            <span className="text-[12px] leading-[1.4] font-medium text-on-surface-variant">
              Review
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Form Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-[24px] space-y-[40px]">
        <div>
          <h1 className="text-[24px] leading-[1.4] font-semibold text-on-background mb-[8px]">
            Mari buat dokumen Anda
          </h1>
          <p className="text-on-surface-variant">
            Lengkapi detail di bawah untuk menghasilkan draf kontrak yang sah secara hukum.
          </p>
        </div>

        {/* Section: Identitas Pihak */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">person_outline</span>
            <h2 className="font-bold text-lg">Identitas Pihak</h2>
          </div>
          <div className="grid grid-cols-1 gap-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Nama Lengkap Freelancer
              </label>
              <input
                type="text"
                className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                placeholder="cth: Budi Santoso"
                value={formData.freelancerName}
                onChange={(e) => handleChange("freelancerName", e.target.value)}
              />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Nama Lengkap Klien / Perusahaan
              </label>
              <input
                type="text"
                className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                placeholder="cth: PT Maju Jaya"
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section: Lingkup Pekerjaan */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">work_outline</span>
            <h2 className="font-bold text-lg">Lingkup Pekerjaan</h2>
          </div>
          <div className="space-y-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Judul Proyek
              </label>
              <input
                type="text"
                className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                placeholder="cth: Desain UI/UX Mobile App"
                value={formData.projectTitle}
                onChange={(e) => handleChange("projectTitle", e.target.value)}
              />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Deskripsi Detail
              </label>
              <textarea
                className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                placeholder="Jelaskan apa yang akan Anda kerjakan secara mendalam..."
                rows={4}
                value={formData.projectDescription}
                onChange={(e) => handleChange("projectDescription", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section: Durasi & Pembayaran */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">payments</span>
            <h2 className="font-bold text-lg">Durasi & Pembayaran</h2>
          </div>
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Nilai Kontrak (Rp)
              </label>
              <input
                type="text"
                className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                placeholder="cth: 5.000.000"
                value={formData.contractValue}
                onChange={(e) => handleChange("contractValue", e.target.value)}
              />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Tenggat Waktu
              </label>
              <input
                type="date"
                className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section: Klausul Tambahan */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">gavel</span>
            <h2 className="font-bold text-lg">Klausul Tambahan</h2>
          </div>
          <div className="space-y-[8px]">
            <label className="flex items-center gap-[16px] p-[16px] rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary"
                checked={formData.includeCopyright}
                onChange={(e) => handleChange("includeCopyright", e.target.checked)}
              />
              <div className="flex flex-col">
                <span className="font-medium text-[16px] leading-[1.5]">Hak Cipta (Copyright)</span>
                <span className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Penyerahan penuh hak cipta setelah pelunasan.
                </span>
              </div>
            </label>
            <label className="flex items-center gap-[16px] p-[16px] rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary"
                checked={formData.includeConfidentiality}
                onChange={(e) => handleChange("includeConfidentiality", e.target.checked)}
              />
              <div className="flex flex-col">
                <span className="font-medium text-[16px] leading-[1.5]">
                  Kerahasiaan (Confidentiality)
                </span>
                <span className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Kedua pihak setuju untuk menjaga data sensitif.
                </span>
              </div>
            </label>
            <label className="flex items-center gap-[16px] p-[16px] rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all">
              <input
                type="checkbox"
                className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary"
                checked={formData.includeRevisionLimit}
                onChange={(e) => handleChange("includeRevisionLimit", e.target.checked)}
              />
              <div className="flex flex-col">
                <span className="font-medium text-[16px] leading-[1.5]">Revisi Terbatas</span>
                <span className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Maksimal 3 kali revisi minor.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-[24px] bg-surface border-t border-outline-variant flex justify-between items-center">
        <button className="text-primary font-medium hover:underline">Simpan Draf</button>
        <button className="bg-primary text-white px-[40px] py-[16px] rounded-xl font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all">
          Selanjutnya
        </button>
      </div>
    </section>
  );
}
