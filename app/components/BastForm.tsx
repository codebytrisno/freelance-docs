"use client";

import { useState } from "react";

interface BastFormProps {
  onUpdate: (data: BastData) => void;
}

export interface BastData {
  freelancerName: string;
  freelancerAddress: string;
  clientName: string;
  clientCompany: string;
  projectName: string;
  contractNumber: string;
  completionDate: string;
  deliverables: string;
  notes: string;
}

export default function BastForm({ onUpdate }: BastFormProps) {
  const [formData, setFormData] = useState<BastData>({
    freelancerName: "",
    freelancerAddress: "",
    clientName: "",
    clientCompany: "",
    projectName: "",
    contractNumber: "",
    completionDate: "",
    deliverables: "",
    notes: "",
  });

  const handleChange = (field: keyof BastData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <aside className="w-full lg:w-[40%] flex flex-col gap-[24px]">
      {/* Stepper Progress */}
      <div className="flex items-center gap-[4px]">
        <div className="h-1 bg-primary rounded-full flex-1"></div>
        <div className="h-1 bg-outline-variant rounded-full flex-1"></div>
        <div className="h-1 bg-outline-variant rounded-full flex-1"></div>
      </div>

      {/* Form Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px] shadow-sm">
        <form className="space-y-[40px]">
          {/* Pihak Freelancer (Pihak Pertama) */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">person</span>
              <h3 className="text-[24px] leading-[1.4] font-semibold">Informasi Freelancer</h3>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                  placeholder="cth: Ahmad Freelancer"
                  value={formData.freelancerName}
                  onChange={(e) => handleChange("freelancerName", e.target.value)}
                />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                  Alamat / Instansi
                </label>
                <input
                  type="text"
                  className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                  placeholder="cth: Studio Desain Kreatif, Jakarta"
                  value={formData.freelancerAddress}
                  onChange={(e) => handleChange("freelancerAddress", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pihak Klien (Pihak Kedua) */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-secondary">
              <span className="material-symbols-outlined">corporate_fare</span>
              <h3 className="text-[24px] leading-[1.4] font-semibold">Informasi Klien</h3>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                  Nama Klien / Perwakilan
                </label>
                <input
                  type="text"
                  className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                  placeholder="cth: Ibu Budi Manager"
                  value={formData.clientName}
                  onChange={(e) => handleChange("clientName", e.target.value)}
                />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                  Nama Perusahaan Klien
                </label>
                <input
                  type="text"
                  className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                  placeholder="cth: PT Maju Jaya Bersama"
                  value={formData.clientCompany}
                  onChange={(e) => handleChange("clientCompany", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Info Project */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-on-surface">
              <span className="material-symbols-outlined">assignment</span>
              <h3 className="text-[24px] leading-[1.4] font-semibold">Detail Pekerjaan</h3>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                  Nama Proyek
                </label>
                <input
                  type="text"
                  className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                  placeholder="cth: Pengembangan Website E-commerce"
                  value={formData.projectName}
                  onChange={(e) => handleChange("projectName", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-[16px]">
                <div className="space-y-[4px]">
                  <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                    Nomor Kontrak
                  </label>
                  <input
                    type="text"
                    className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                    placeholder="cth: 001/CTR/2024"
                    value={formData.contractNumber}
                    onChange={(e) => handleChange("contractNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-[4px]">
                  <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                    Tanggal Serah Terima
                  </label>
                  <input
                    type="date"
                    className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                    value={formData.completionDate}
                    onChange={(e) => handleChange("completionDate", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-on-surface">
              <span className="material-symbols-outlined">checklist</span>
              <h3 className="text-[24px] leading-[1.4] font-semibold">
                Daftar Hasil (Deliverables)
              </h3>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                Rincian Pekerjaan
              </label>
              <textarea
                className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                placeholder="Sebutkan item yang diserahkan, pisahkan dengan baris baru..."
                rows={4}
                value={formData.deliverables}
                onChange={(e) => handleChange("deliverables", e.target.value)}
              />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface">
                Catatan Tambahan
              </label>
              <textarea
                className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary"
                placeholder="cth: Termasuk garansi maintenance 1 bulan"
                rows={2}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-[16px] pt-[16px]">
            <button
              type="button"
              className="flex-1 border border-primary text-primary text-[14px] leading-[1.4] tracking-[0.05em] font-medium py-[16px] rounded-lg hover:bg-surface-container-low transition-colors"
            >
              Simpan Draft
            </button>
            <button
              type="button"
              className="flex-1 bg-primary text-on-primary text-[14px] leading-[1.4] tracking-[0.05em] font-medium py-[16px] rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              Unduh PDF
            </button>
          </div>
        </form>
      </div>

      {/* Tips Card */}
      <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-[16px] flex gap-[16px] items-start">
        <span className="material-symbols-outlined">lightbulb</span>
        <div>
          <p className="text-[14px] leading-[1.4] tracking-[0.05em] font-bold">
            Tips Profesional
          </p>
          <p className="text-[12px] leading-[1.4] opacity-80 mt-[4px]">
            Pastikan semua poin deliverables sudah diperiksa bersama sebelum menandatangani BAST.
          </p>
        </div>
      </div>
    </aside>
  );
}
