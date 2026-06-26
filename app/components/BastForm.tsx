"use client";

import { useState } from "react";
import { loadDraft } from "../lib/storage";

interface BastFormProps {
  onUpdate: (data: BastData) => void;
}

export interface BastData {
  bastNo: string;
  bastDate: string;
  freelancerName: string;
  freelancerAddress: string;
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  projectName: string;
  quotationNo: string;
  quotationDate: string;
  systemUrl: string;
  appUrl: string;
  warrantyPeriod: number;
  notes: string;
}

export default function BastForm({ onUpdate }: BastFormProps) {
  const [formData, setFormData] = useState<BastData>({
    bastNo: "",
    bastDate: "",
    freelancerName: "",
    freelancerAddress: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    projectName: "",
    quotationNo: "",
    quotationDate: "",
    systemUrl: "",
    appUrl: "",
    warrantyPeriod: 30,
    notes: "",
  });

  const handleChange = (field: keyof BastData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleAmbilQuotation = () => {
    const quotation = loadDraft<any>("quotation");
    if (!quotation) {
      alert("Belum ada data Quotation. Silakan buat Quotation terlebih dahulu.");
      return;
    }

    const newData: BastData = {
      ...formData,
      freelancerName: quotation.freelancerName || formData.freelancerName,
      clientName: quotation.clientName || formData.clientName,
      clientCompany: quotation.clientCompany || formData.clientCompany,
      projectName: quotation.projectName || formData.projectName,
      quotationNo: quotation.quotationNo || formData.quotationNo,
      quotationDate: quotation.date || formData.quotationDate,
    };

    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="w-full lg:w-[40%] space-y-[24px]">
      {/* Ambil dari Quotation */}
      <button
        type="button"
        onClick={handleAmbilQuotation}
        className="flex items-center gap-[8px] w-full px-[16px] py-[12px] bg-primary-container/50 text-primary font-medium rounded-xl border border-primary-container hover:bg-primary-container transition-all text-[14px] leading-[1.4] tracking-[0.05em]"
      >
        <span className="material-symbols-outlined text-[18px]">file_copy</span>
        Ambil dari Quotation
      </button>

      {/* Form Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px] shadow-sm">
        <form className="space-y-[40px]">
          {/* Nomor & Tanggal BAST */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">description</span>
              <h2 className="text-[18px] font-semibold">Identitas BAST</h2>
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nomor BAST</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: BAST/001/06/2025" value={formData.bastNo} onChange={(e) => handleChange("bastNo", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tanggal BAST</label>
                <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" value={formData.bastDate} onChange={(e) => handleChange("bastDate", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Quotation Reference */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">receipt</span>
              <h2 className="text-[18px] font-semibold">Referensi Quotation</h2>
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nomor Quotation</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="Dari Quotation" value={formData.quotationNo} onChange={(e) => handleChange("quotationNo", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tanggal Quotation</label>
                <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" value={formData.quotationDate} onChange={(e) => handleChange("quotationDate", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Pihak Pertama (Klien) */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">corporate_fare</span>
              <h2 className="text-[18px] font-semibold">Pihak Pertama — Pemberi Kerja</h2>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Perusahaan / Klien</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: PT Maju Jaya Bersama" value={formData.clientCompany} onChange={(e) => handleChange("clientCompany", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Diwakili oleh</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Ibu Budi" value={formData.clientName} onChange={(e) => handleChange("clientName", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Alamat</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Jl. Merdeka No. 123, Jakarta" value={formData.clientAddress} onChange={(e) => handleChange("clientAddress", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Pihak Kedua (Developer) */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">person</span>
              <h2 className="text-[18px] font-semibold">Pihak Kedua — Penyedia Jasa</h2>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Developer / Perusahaan</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Mas Seno" value={formData.freelancerName} onChange={(e) => handleChange("freelancerName", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Alamat</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Jl. Developer No. 45, Bandung" value={formData.freelancerAddress} onChange={(e) => handleChange("freelancerAddress", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">link</span>
              <h2 className="text-[18px] font-semibold">Deliverables</h2>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Proyek</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Pengembangan Sistem Informasi" value={formData.projectName} onChange={(e) => handleChange("projectName", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Link Akses (Web)</label>
                <input type="url" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: https://sistem.klien.com" value={formData.systemUrl} onChange={(e) => handleChange("systemUrl", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Link Download Aplikasi Mobile</label>
                <input type="url" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: https://play.google.com/..." value={formData.appUrl} onChange={(e) => handleChange("appUrl", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Garansi */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">shield</span>
              <h2 className="text-[18px] font-semibold">Masa Garansi & Support</h2>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Periode Garansi (hari)</label>
              <input type="number" min={0} className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: 30" value={formData.warrantyPeriod || ""} onChange={(e) => handleChange("warrantyPeriod", parseInt(e.target.value) || 0)} />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Catatan Tambahan</label>
              <textarea className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Garansi tidak mencakup penambahan fitur baru" rows={3} value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
