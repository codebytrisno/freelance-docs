"use client";

import { useState } from "react";

interface QuotationFormProps {
  onUpdate: (data: QuotationData) => void;
}

export interface QuotationData {
  clientName: string;
  clientEmail: string;
  projectName: string;
  items: QuotationItem[];
  dpPercent: number;
  payMethod: string;
}

export interface QuotationItem {
  service: string;
  description: string;
  price: number;
}

export default function QuotationForm({ onUpdate }: QuotationFormProps) {
  const [formData, setFormData] = useState<QuotationData>({
    clientName: "",
    clientEmail: "",
    projectName: "",
    items: [{ service: "", description: "", price: 0 }],
    dpPercent: 50,
    payMethod: "Transfer Bank",
  });

  const handleChange = (field: keyof QuotationData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleItemChange = (index: number, field: keyof QuotationItem, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...formData.items, { service: "", description: "", price: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    handleChange("items", newItems);
  };

  return (
    <div className="w-full lg:w-5/12 bg-surface-container-lowest rounded-xl border border-outline-variant p-[24px] space-y-[40px] sticky top-[100px]">
      {/* Section 1: Data Klien */}
      <div className="space-y-[16px]">
        <div className="flex items-center gap-[8px] text-primary">
          <span className="material-symbols-outlined">person</span>
          <h2 className="text-[18px] font-semibold">Data Klien & Project</h2>
        </div>
        <div className="grid grid-cols-1 gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Nama Klien
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant focus:border-primary focus:ring-primary-container text-[16px] leading-[1.5] py-[8px]"
              placeholder="cth: PT. Sukses Selalu"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Email Klien
            </label>
            <input
              type="email"
              className="rounded-lg border-outline-variant focus:border-primary focus:ring-primary-container text-[16px] leading-[1.5] py-[8px]"
              placeholder="cth: hello@client.com"
              value={formData.clientEmail}
              onChange={(e) => handleChange("clientEmail", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Nama Project
            </label>
            <input
              type="text"
              className="rounded-lg border-outline-variant focus:border-primary focus:ring-primary-container text-[16px] leading-[1.5] py-[8px]"
              placeholder="cth: Desain Website E-Commerce"
              value={formData.projectName}
              onChange={(e) => handleChange("projectName", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Item Pekerjaan */}
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px] text-primary">
            <span className="material-symbols-outlined">list_alt</span>
            <h2 className="text-[18px] font-semibold">Item Pekerjaan</h2>
          </div>
          <button
            onClick={addItem}
            className="text-primary text-[14px] leading-[1.4] tracking-[0.05em] font-medium flex items-center gap-[4px] hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Tambah Baris
          </button>
        </div>
        <div className="space-y-[16px]">
          {formData.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-[8px] items-start p-[16px] bg-surface-container-low rounded-lg border border-outline-variant/30"
            >
              <div className="col-span-12 md:col-span-5 flex flex-col gap-[4px]">
                <label className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Layanan
                </label>
                <input
                  type="text"
                  className="rounded-lg border-outline-variant text-[14px] py-[4px]"
                  placeholder="cth: UI Design"
                  value={item.service}
                  onChange={(e) => handleItemChange(index, "service", e.target.value)}
                />
              </div>
              <div className="col-span-12 md:col-span-4 flex flex-col gap-[4px]">
                <label className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  className="rounded-lg border-outline-variant text-[14px] py-[4px]"
                  placeholder="0"
                  value={item.price || ""}
                  onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="col-span-12 md:col-span-3 pt-[16px] flex justify-end">
                {formData.items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="text-error hover:bg-error-container/20 p-[4px] rounded"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
              <div className="col-span-12 flex flex-col gap-[4px]">
                <label className="text-[12px] leading-[1.4] text-on-surface-variant">
                  Deskripsi
                </label>
                <textarea
                  className="rounded-lg border-outline-variant text-[14px] py-[4px] h-16 resize-none"
                  placeholder="Detail pekerjaan..."
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Pembayaran */}
      <div className="space-y-[16px]">
        <div className="flex items-center gap-[8px] text-primary">
          <span className="material-symbols-outlined">payments</span>
          <h2 className="text-[18px] font-semibold">Metode & DP</h2>
        </div>
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Down Payment (%)
            </label>
            <input
              type="number"
              className="rounded-lg border-outline-variant focus:border-primary focus:ring-primary-container text-[16px] leading-[1.5] py-[8px]"
              value={formData.dpPercent}
              onChange={(e) => handleChange("dpPercent", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
              Metode
            </label>
            <select
              className="rounded-lg border-outline-variant focus:border-primary focus:ring-primary-container text-[16px] leading-[1.5] py-[8px]"
              value={formData.payMethod}
              onChange={(e) => handleChange("payMethod", e.target.value)}
            >
              <option>Transfer Bank</option>
              <option>E-Wallet</option>
              <option>Lainnya</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-[16px]">
        <button className="w-full bg-primary text-on-primary py-[16px] rounded-xl text-[14px] leading-[1.4] tracking-[0.05em] font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-[16px]">
          <span className="material-symbols-outlined">save</span>
          Simpan Penawaran
        </button>
      </div>
    </div>
  );
}
