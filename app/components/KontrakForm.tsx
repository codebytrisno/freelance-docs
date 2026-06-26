"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      d.setDate(d.getDate() + estimatedDays);
      deadline = d.toISOString().split("T")[0];
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
    <section className="w-full md:w-[45%] lg:w-[40%] bg-surface border-r border-outline-variant flex flex-col h-full">


      {/* Scrollable Form Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-[24px] space-y-[40px]">
        <button
          type="button"
          onClick={loadFromQuotation}
          className="flex items-center gap-[4px] text-[12px] leading-[1.4] tracking-[0.05em] font-medium text-primary hover:opacity-80 transition-opacity shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">file_copy</span>
          Ambil dari Quotation
        </button>

        {/* Section: Identitas Pihak */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">person_outline</span>
            <h2 className="font-bold text-lg">PIHAK KEDUA (Developer)</h2>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama</label>
            <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: Budi Santoso" value={formData.freelancerName} onChange={(e) => handleChange("freelancerName", e.target.value)} />
          </div>
        </div>

        {/* Section: Pihak Pertama */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">business</span>
            <h2 className="font-bold text-lg">PIHAK PERTAMA (Klien)</h2>
          </div>
          <div className="grid grid-cols-1 gap-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Perusahaan / Instansi</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: PT Maju Jaya" value={formData.clientCompany} onChange={(e) => handleChange("clientCompany", e.target.value)} />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Diwakili oleh (Nama Lengkap)</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: Aji Pratama" value={formData.clientName} onChange={(e) => handleChange("clientName", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Section: Lingkup Pekerjaan */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">work_outline</span>
            <h2 className="font-bold text-lg">Lingkup Pekerjaan</h2>
          </div>
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nomor Quotation</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: 082025/1" value={formData.quotationNo} onChange={(e) => handleChange("quotationNo", e.target.value)} />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tanggal Quotation</label>
              <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" value={formData.quotationDate} onChange={(e) => handleChange("quotationDate", e.target.value)} />
            </div>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Judul Proyek</label>
            <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: Desain UI/UX Mobile App" value={formData.projectTitle} onChange={(e) => handleChange("projectTitle", e.target.value)} />
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Deskripsi Detail</label>
            <textarea className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="Jelaskan apa yang akan Anda kerjakan..." rows={3} value={formData.projectDescription} onChange={(e) => handleChange("projectDescription", e.target.value)} />
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
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tanggal Mulai</label>
              <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Tenggat Waktu</label>
              <input type="date" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" value={formData.deadline} onChange={(e) => handleChange("deadline", e.target.value)} />
            </div>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nilai Kontrak (Rp)</label>
            <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: 5.000.000" value={formData.contractValue} onChange={(e) => handleChange("contractValue", e.target.value)} />
          </div>
        </div>

        {/* Section: Kota & Bank */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">location_city</span>
            <h2 className="font-bold text-lg">Lainnya</h2>
          </div>
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Kota</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: Jakarta" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Nama Bank</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: Bank BCA" value={formData.bankName} onChange={(e) => handleChange("bankName", e.target.value)} />
            </div>
            <div className="space-y-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">No. Rekening</label>
              <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: 1234567890" value={formData.bankAccount} onChange={(e) => handleChange("bankAccount", e.target.value)} />
            </div>
          </div>
          <div className="space-y-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">Atas Nama Rekening</label>
            <input type="text" className="w-full px-[16px] py-[8px] rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" placeholder="cth: Budi Santoso" value={formData.bankHolder} onChange={(e) => handleChange("bankHolder", e.target.value)} />
          </div>
        </div>

        {/* Section: Klausul */}
        <div className="space-y-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">gavel</span>
            <h2 className="font-bold text-lg">Klausul Tambahan</h2>
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
      </div>

      {/* Footer Action */}
      <div className="p-[24px] bg-surface border-t border-outline-variant flex justify-between items-center">
        <button
          onClick={() => router.push("/quotation")}
          className="flex items-center gap-[8px] text-primary font-medium hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Quotation
        </button>
        <button
          onClick={() => router.push("/timeline")}
          className="flex items-center gap-[8px] bg-primary text-white px-[40px] py-[16px] rounded-xl font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
        >
          Lanjut ke Timeline
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}
