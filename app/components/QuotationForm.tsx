"use client";

import { useState, useEffect } from "react";

interface QuotationFormProps {
  onUpdate: (data: QuotationData) => void;
  data?: QuotationData;
}

export interface QuotationPlatformItem {
  title: string;
  estimatedHours: number;
  details: string;
}

export interface QuotationPlatform {
  name: string;
  items: QuotationPlatformItem[];
}

export interface QuotationData {
  quotationNo: string;
  date: string;
  projectName: string;
  clientName: string;
  clientCompany: string;
  freelancerName: string;
  validUntil: string;
  platforms: QuotationPlatform[];
  technology: string;
  hourlyRate: number;
  workHoursPerDay: number;
  paymentTerms: string;
  maintenance: string;
  bonus: string;
}

const defaultData: QuotationData = {
  quotationNo: "",
  date: new Date().toISOString().split("T")[0],
  projectName: "",
  clientName: "",
  clientCompany: "",
  freelancerName: "",
  validUntil: "",
  platforms: [
    {
      name: "",
      items: [{ title: "", estimatedHours: 0, details: "" }],
    },
  ],
  technology: "",
  hourlyRate: 0,
  workHoursPerDay: 8,
  paymentTerms: "",
  maintenance: "",
  bonus: "",
};

export default function QuotationForm({ onUpdate, data: externalData }: QuotationFormProps) {
  const [formData, setFormData] = useState<QuotationData>(externalData || defaultData);

  useEffect(() => {
    if (externalData && externalData !== formData) {
      setFormData(externalData);
      onUpdate(externalData);
    }
  }, [externalData]);

  const update = (data: QuotationData) => {
    setFormData(data);
    onUpdate(data);
  };

  const handleChange = (field: keyof QuotationData, value: any) => {
    update({ ...formData, [field]: value });
  };

  const addPlatform = () => {
    handleChange("platforms", [
      ...formData.platforms,
      { name: "", items: [{ title: "", estimatedHours: 0, details: "" }] },
    ]);
  };

  const removePlatform = (pi: number) => {
    const ps = formData.platforms.filter((_, i) => i !== pi);
    handleChange("platforms", ps);
  };

  const handlePlatformName = (pi: number, value: string) => {
    const ps = [...formData.platforms];
    ps[pi] = { ...ps[pi], name: value };
    handleChange("platforms", ps);
  };

  const addItem = (pi: number) => {
    const ps = [...formData.platforms];
    ps[pi] = {
      ...ps[pi],
      items: [...ps[pi].items, { title: "", estimatedHours: 0, details: "" }],
    };
    handleChange("platforms", ps);
  };

  const removeItem = (pi: number, ii: number) => {
    const ps = [...formData.platforms];
    ps[pi] = {
      ...ps[pi],
      items: ps[pi].items.filter((_, i) => i !== ii),
    };
    handleChange("platforms", ps);
  };

  const handleItemChange = (pi: number, ii: number, field: keyof QuotationPlatformItem, value: any) => {
    const ps = [...formData.platforms];
    ps[pi].items[ii] = { ...ps[pi].items[ii], [field]: value };
    handleChange("platforms", ps);
  };

  const totalHours = formData.platforms.reduce((s, p) => s + p.items.reduce((s2, it) => s2 + (it.estimatedHours || 0), 0), 0);
  const totalHarga = totalHours * formData.hourlyRate;
  const estimatedDays = formData.workHoursPerDay > 0 ? Math.ceil(totalHours / formData.workHoursPerDay) : 0;

  return (
    <div className="w-full lg:w-5/12 bg-surface-container-lowest rounded-xl border border-outline-variant p-[24px] space-y-[40px] sticky top-[100px]">
      {/* Section 1: Info Project */}
      <div className="space-y-[16px]">
        <div className="flex items-center gap-[8px] text-primary">
          <span className="material-symbols-outlined">info</span>
          <h2 className="text-[18px] font-semibold">Informasi Project</h2>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              No. Quotation
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: 082025/1"
              value={formData.quotationNo}
              onChange={(e) => handleChange("quotationNo", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Tanggal
            </label>
            <input
              type="date"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Nama Project
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: Pembuatan Sistem Blog"
              value={formData.projectName}
              onChange={(e) => handleChange("projectName", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Nama Developer
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: Mas Seno"
              value={formData.freelancerName}
              onChange={(e) => handleChange("freelancerName", e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Nama Perusahaan / Instansi
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: PT. Sukses Selalu"
              value={formData.clientCompany}
              onChange={(e) => handleChange("clientCompany", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Diwakili oleh (Nama Lengkap)
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: Mas Aji"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Masa Berlaku
            </label>
            <input
              type="date"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              value={formData.validUntil}
              onChange={(e) => handleChange("validUntil", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Platform & Fitur */}
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px] text-primary">
            <span className="material-symbols-outlined">layers</span>
            <h2 className="text-[18px] font-semibold">Platform & Fitur</h2>
          </div>
          <button
            onClick={addPlatform}
            className="text-primary text-[14px] leading-[1.4] tracking-[0.05em] font-medium flex items-center gap-[4px] hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Tambah Platform
          </button>
        </div>
        <div className="space-y-[24px]">
          {formData.platforms.map((platform, pi) => (
            <div
              key={pi}
              className="p-[16px] bg-surface-container-low rounded-lg border border-outline-variant/30 space-y-[12px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-[4px] flex-1 mr-[8px]">
                  <label className="text-[12px] leading-[1.4] text-on-surface-variant">Nama Platform</label>
                  <input
                    type="text"
                    className="rounded-lg border-outline-variant text-[14px] py-[4px]"
                    placeholder="cth: Web Admin"
                    value={platform.name}
                    onChange={(e) => handlePlatformName(pi, e.target.value)}
                  />
                </div>
                {formData.platforms.length > 1 && (
                  <button
                    onClick={() => removePlatform(pi)}
                    className="text-error hover:bg-error-container/20 p-[4px] rounded mt-[16px]"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
              <div className="space-y-[8px]">
                {platform.items.map((item, ii) => (
                  <div key={ii} className="border border-outline-variant/20 rounded-lg p-[12px] space-y-[8px]">
                    <div className="grid grid-cols-12 gap-[8px] items-start">
                      <div className="col-span-7 flex flex-col gap-[2px]">
                        <label className="text-[11px] leading-[1.4] text-on-surface-variant">Fitur</label>
                        <input
                          type="text"
                          className="rounded-lg border-outline-variant text-[13px] py-[4px]"
                          placeholder="cth: 1. Sistem autentifikasi"
                          value={item.title}
                          onChange={(e) => handleItemChange(pi, ii, "title", e.target.value)}
                        />
                      </div>
                      <div className="col-span-3 flex flex-col gap-[2px]">
                        <label className="text-[11px] leading-[1.4] text-on-surface-variant">Jam</label>
                        <input
                          type="number"
                          className="rounded-lg border-outline-variant text-[13px] py-[4px]"
                          placeholder="0"
                          value={item.estimatedHours || ""}
                          onChange={(e) => handleItemChange(pi, ii, "estimatedHours", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2 pt-[16px] flex justify-end">
                        {platform.items.length > 1 && (
                          <button
                            onClick={() => removeItem(pi, ii)}
                            className="text-error hover:bg-error-container/20 p-[4px] rounded"
                          >
                            <span className="material-symbols-outlined text-[18px]">remove_circle</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <label className="text-[11px] leading-[1.4] text-on-surface-variant">
                        Detail (pisahkan dengan baris baru)
                      </label>
                      <textarea
                        className="rounded-lg border-outline-variant text-[13px] py-[4px] h-[60px] resize-none"
                        placeholder="Halaman login dan register User&#10;SMTP untuk registrasi"
                        value={item.details}
                        onChange={(e) => handleItemChange(pi, ii, "details", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addItem(pi)}
                className="text-primary text-[12px] font-medium flex items-center gap-[4px] hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Tambah Fitur
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Penawaran */}
      <div className="space-y-[16px]">
        <div className="flex items-center gap-[8px] text-primary">
          <span className="material-symbols-outlined">request_quote</span>
          <h2 className="text-[18px] font-semibold">Detail Penawaran</h2>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="col-span-2 flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Teknologi
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: Laravel Filament + Livewire"
              value={formData.technology}
              onChange={(e) => handleChange("technology", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Harga per Jam
            </label>
            <div className="relative">
              <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] font-medium pointer-events-none select-none">
                Rp
              </span>
              <input
                type="text"
                inputMode="numeric"
                className="rounded-lg border-outline-variant text-[16px] py-[8px] pl-[40px]"
                placeholder="0"
                value={formData.hourlyRate ? formData.hourlyRate.toLocaleString("id-ID") : ""}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  handleChange("hourlyRate", raw ? parseInt(raw, 10) : 0);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Jam Kerja / Hari
            </label>
            <input
              type="number"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              value={formData.workHoursPerDay}
              onChange={(e) => handleChange("workHoursPerDay", parseFloat(e.target.value) || 8)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Termin Pembayaran
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: 30% DP, 70% Pelunasan"
              value={formData.paymentTerms}
              onChange={(e) => handleChange("paymentTerms", e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Maintenance
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: 2 Pekan (setelah project selesai)"
              value={formData.maintenance}
              onChange={(e) => handleChange("maintenance", e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Bonus
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant text-[16px] py-[8px]"
              placeholder="cth: Hosting + Domain"
              value={formData.bonus}
              onChange={(e) => handleChange("bonus", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="bg-surface-container rounded-xl p-[16px] space-y-[8px]">
        <div className="flex justify-between text-[14px]">
          <span className="text-on-surface-variant">Total Jam</span>
          <span className="font-semibold">{totalHours} jam</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span className="text-on-surface-variant">Estimasi Hari</span>
          <span className="font-semibold">{estimatedDays} hari</span>
        </div>
        <div className="border-t border-outline-variant/30 pt-[8px] flex justify-between text-[16px]">
          <span className="font-medium">Total Harga</span>
          <span className="font-bold text-primary">Rp {totalHarga.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
