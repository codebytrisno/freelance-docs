"use client";

import { useState, useEffect } from "react";
import { loadDraft } from "../lib/storage";

interface KontrakFormProps {
  onUpdate: (data: KontrakData) => void;
  data?: KontrakData;
}

export interface KontrakData {
  quotationNo: string;
  quotationDate: string;
  freelancerName: string;
  clientName: string;
  clientCompany: string;
  projectTitle: string;
  projectDescription: string;
  contractValue: string;
  startDate: string;
  deadline: string;
  city: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  includeCopyright: boolean;
  includeConfidentiality: boolean;
  includeRevisionLimit: boolean;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function KontrakForm({ onUpdate, data: externalData }: KontrakFormProps) {
  const [formData, setFormData] = useState<KontrakData>({
    quotationNo: "",
    quotationDate: "",
    freelancerName: "",
    clientName: "",
    clientCompany: "",
    projectTitle: "",
    projectDescription: "",
    contractValue: "",
    startDate: "",
    deadline: "",
    city: "",
    bankName: "",
    bankAccount: "",
    bankHolder: "",
    includeCopyright: true,
    includeConfidentiality: true,
    includeRevisionLimit: false,
  });

  useEffect(() => {
    if (externalData && externalData !== formData) {
      setFormData(externalData);
      onUpdate(externalData);
    }
  }, [externalData]);

  const loadFromQuotation = () => {
    const quotation = loadDraft<any>("quotation");
    if (!quotation) {
      alert("Belum ada data Quotation. Buat Quotation terlebih dahulu.");
      return;
    }

    const platforms = quotation.platforms || [];
    const totalHours = platforms.reduce(
      (s: number, p: any) => s + p.items.reduce((s2: number, it: any) => s2 + (it.estimatedHours || 0), 0),
      0
    );
    const estimatedDays = quotation.hourlyRate && quotation.hourlyRate > 0 && quotation.workHoursPerDay
      ? Math.ceil(totalHours / (quotation.workHoursPerDay || 8))
      : 0;

    const totalHarga = totalHours * (quotation.hourlyRate || 0);
    const startDate = quotation.date || "";
    let deadline = "";
    if (startDate && estimatedDays > 0) {
      const d = new Date(startDate + "T00:00:00");
      if (!isNaN(d.getTime())) {
        d.setDate(d.getDate() + estimatedDays);
        deadline = d.toISOString().split("T")[0];
      }
    }

    const descParts = platforms.flatMap((p: any) => {
      const items = p.items?.filter((i: any) => i.title) || [];
      return items.map((i: any) => {
        const details = i.details
          ? i.details.split("\n").filter((d: string) => d.trim()).join("; ")
          : "";
        return `${i.title}${details ? ` (${details})` : ""}`;
      });
    });

    const newData: KontrakData = {
      quotationNo: quotation.quotationNo || "",
      quotationDate: quotation.date || "",
      freelancerName: quotation.freelancerName || formData.freelancerName,
      clientName: quotation.clientName || "",
      clientCompany: quotation.clientCompany || "",
      projectTitle: quotation.projectName || "",
      projectDescription: descParts.length > 0 ? descParts.join("\n") : "",
      contractValue: totalHarga > 0 ? totalHarga.toLocaleString("id-ID") : "",
      startDate,
      deadline,
      city: formData.city,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      bankHolder: formData.bankHolder,
      includeCopyright: true,
      includeConfidentiality: true,
      includeRevisionLimit: false,
    };

    setFormData(newData);
    onUpdate(newData);
  };

  const handleChange = (field: keyof KontrakData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="w-full lg:w-[40%] space-y-[24px]">
      <button
        type="button"
        onClick={loadFromQuotation}
        className="flex items-center gap-[8px] w-full px-[16px] py-[12px] bg-primary-container/50 text-primary font-medium rounded-xl border border-primary-container hover:bg-primary-container transition-all text-[14px] leading-[1.4] tracking-[0.05em]"
      >
        <span className="material-symbols-outlined text-[18px]">file_copy</span>
        Ambil dari Quotation
      </button>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px] shadow-sm">
        <form className="space-y-[40px]">
          {/* Section: Identitas Pihak */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">person_outline</span>
              <h2 className="text-[18px] font-semibold">Pihak Kedua (Developer)</h2>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Budi Santoso" value={formData.freelancerName} onChange={(e) => handleChange("freelancerName", e.target.value)} />
            </div>
          </div>

          {/* Section: Pihak Pertama */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">business</span>
              <h2 className="text-[18px] font-semibold">Pihak Pertama (Klien)</h2>
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Perusahaan / Instansi</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: PT Maju Jaya" value={formData.clientCompany} onChange={(e) => handleChange("clientCompany", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Diwakili oleh (Nama Lengkap)</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Aji Pratama" value={formData.clientName} onChange={(e) => handleChange("clientName", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section: Lingkup Pekerjaan */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">work_outline</span>
              <h2 className="text-[18px] font-semibold">Lingkup Pekerjaan</h2>
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nomor Quotation</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: 082025/1" value={formData.quotationNo} onChange={(e) => handleChange("quotationNo", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tanggal Quotation</label>
                <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" value={formData.quotationDate} onChange={(e) => handleChange("quotationDate", e.target.value)} />
              </div>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Judul Proyek</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Desain UI/UX Mobile App" value={formData.projectTitle} onChange={(e) => handleChange("projectTitle", e.target.value)} />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Deskripsi Detail</label>
              <textarea className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="Jelaskan apa yang akan Anda kerjakan..." rows={3} value={formData.projectDescription} onChange={(e) => handleChange("projectDescription", e.target.value)} />
            </div>
          </div>

          {/* Section: Durasi & Pembayaran */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">payments</span>
              <h2 className="text-[18px] font-semibold">Durasi & Pembayaran</h2>
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tanggal Mulai</label>
                <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tenggat Waktu</label>
                <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" value={formData.deadline} onChange={(e) => handleChange("deadline", e.target.value)} />
              </div>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nilai Kontrak (Rp)</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: 5.000.000" value={formData.contractValue} onChange={(e) => handleChange("contractValue", e.target.value)} />
            </div>
          </div>

          {/* Section: Kota & Bank */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">location_city</span>
              <h2 className="text-[18px] font-semibold">Informasi Bank</h2>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Kota</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Jakarta" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Bank</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Bank BCA" value={formData.bankName} onChange={(e) => handleChange("bankName", e.target.value)} />
              </div>
              <div className="space-y-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">No. Rekening</label>
                <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: 1234567890" value={formData.bankAccount} onChange={(e) => handleChange("bankAccount", e.target.value)} />
              </div>
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Atas Nama Rekening</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="cth: Budi Santoso" value={formData.bankHolder} onChange={(e) => handleChange("bankHolder", e.target.value)} />
            </div>
          </div>

          {/* Section: Klausul */}
          <div className="space-y-[16px]">
            <div className="flex items-center gap-[8px] text-primary">
              <span className="material-symbols-outlined">gavel</span>
              <h2 className="text-[18px] font-semibold">Klausul Tambahan</h2>
            </div>
            <div className="space-y-[8px]">
              <label className="flex items-center gap-[16px] p-[16px] rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" checked={formData.includeCopyright} onChange={(e) => handleChange("includeCopyright", e.target.checked)} />
                <div className="flex flex-col">
                  <span className="font-medium text-[16px] leading-[1.5]">Hak Cipta (Copyright)</span>
                  <span className="text-[12px] leading-[1.4] text-on-surface-variant">Penyerahan penuh hak cipta setelah pelunasan.</span>
                </div>
              </label>
              <label className="flex items-center gap-[16px] p-[16px] rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" checked={formData.includeConfidentiality} onChange={(e) => handleChange("includeConfidentiality", e.target.checked)} />
                <div className="flex flex-col">
                  <span className="font-medium text-[16px] leading-[1.5]">Kerahasiaan (Confidentiality)</span>
                  <span className="text-[12px] leading-[1.4] text-on-surface-variant">Kedua pihak setuju untuk menjaga data sensitif.</span>
                </div>
              </label>
              <label className="flex items-center gap-[16px] p-[16px] rounded-lg border border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all">
                <input type="checkbox" className="w-5 h-5 text-primary rounded border-outline-variant focus:ring-primary" checked={formData.includeRevisionLimit} onChange={(e) => handleChange("includeRevisionLimit", e.target.checked)} />
                <div className="flex flex-col">
                  <span className="font-medium text-[16px] leading-[1.5]">Revisi Terbatas</span>
                  <span className="text-[12px] leading-[1.4] text-on-surface-variant">Maksimal 3 kali revisi minor.</span>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
