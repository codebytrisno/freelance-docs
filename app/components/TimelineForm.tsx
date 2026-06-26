"use client";

import { useState } from "react";
import { loadDraft } from "../lib/storage";

interface TimelineFormProps {
  onUpdate: (data: TimelineData) => void;
}

export interface TimelineFeature {
  name: string;
  weeks: number[];
}

export interface TimelineData {
  quotationNo: string;
  projectName: string;
  clientName: string;
  features: TimelineFeature[];
  totalWeeks: number;
}

export default function TimelineForm({ onUpdate }: TimelineFormProps) {
  const [formData, setFormData] = useState<TimelineData>({
    quotationNo: "",
    projectName: "",
    clientName: "",
    features: [],
    totalWeeks: 4,
  });

  const loadFromQuotation = () => {
    const quotation = loadDraft<any>("quotation");
    if (!quotation) {
      alert("Belum ada data Quotation. Buat Quotation terlebih dahulu.");
      return;
    }

    const platforms = quotation.platforms || [];
    const features: TimelineFeature[] = platforms
      .flatMap((p: any) => p.items?.filter((i: any) => i.title) || [])
      .map((i: any) => ({
        name: i.title,
        weeks: [],
      }));

    const estimatedDays = quotation.hourlyRate && quotation.hourlyRate > 0 && quotation.workHoursPerDay
      ? Math.ceil(
          platforms.reduce(
            (s: number, p: any) => s + p.items.reduce((s2: number, it: any) => s2 + (it.estimatedHours || 0), 0),
            0
          ) / (quotation.workHoursPerDay || 8)
        )
      : 0;

    const totalWeeks = estimatedDays > 0 ? Math.ceil(estimatedDays / 7) : 4;

    const newData: TimelineData = {
      quotationNo: quotation.quotationNo || "",
      projectName: quotation.projectName || "",
      clientName: quotation.clientName || "",
      features,
      totalWeeks,
    };

    setFormData(newData);
    onUpdate(newData);
  };

  const handleChange = (field: keyof TimelineData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const toggleWeek = (fi: number, week: number) => {
    const newFeatures = formData.features.map((f, i) => {
      if (i !== fi) return f;
      const weeks = f.weeks.includes(week)
        ? f.weeks.filter((w) => w !== week)
        : [...f.weeks, week].sort((a, b) => a - b);
      return { ...f, weeks };
    });
    handleChange("features", newFeatures);
  };

  const addFeature = () => {
    handleChange("features", [
      ...formData.features,
      { name: "", weeks: [] },
    ]);
  };

  const removeFeature = (index: number) => {
    handleChange("features", formData.features.filter((_, i) => i !== index));
  };

  const updateFeatureName = (index: number, name: string) => {
    const newFeatures = formData.features.map((f, i) =>
      i === index ? { ...f, name } : f
    );
    handleChange("features", newFeatures);
  };

  return (
    <section className="lg:col-span-5 space-y-[40px]">
      <header>
        <h1 className="text-[32px] leading-[1.3] font-bold text-on-surface mb-[4px]">
          Buat Timeline Proyek
        </h1>
        <p className="text-on-surface-variant">
          Mari buat dokumen timeline profesional untuk klien Anda.
        </p>
      </header>

      <form className="space-y-[24px]">
        {/* Project Info Card */}
        <div className="bg-surface-container-lowest border border-outline-variant p-[24px] rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-[16px]">
            <h2 className="text-[24px] leading-[1.4] font-semibold flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">info</span>
              Informasi Proyek
            </h2>
            <button
              type="button"
              onClick={loadFromQuotation}
              className="flex items-center gap-[4px] text-[12px] leading-[1.4] tracking-[0.05em] font-medium text-primary hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[16px]">file_copy</span>
              Ambil dari Quotation
            </button>
          </div>
          <div className="space-y-[16px]">
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Nomor Quotation
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="cth: 082025/1"
                value={formData.quotationNo}
                onChange={(e) => handleChange("quotationNo", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Nama Proyek
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="cth: Pembuatan Sistem Blog"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Client
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="cth: Mas Aji"
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Total Pekan
              </label>
              <input
                type="number"
                min={1}
                max={52}
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                value={formData.totalWeeks}
                onChange={(e) => handleChange("totalWeeks", Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-surface-container-lowest border border-outline-variant p-[24px] rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-[16px]">
            <h2 className="text-[24px] leading-[1.4] font-semibold flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">list_alt</span>
              Fitur / Pekerjaan
            </h2>
          </div>

          {formData.features.length === 0 ? (
            <div className="text-center py-[40px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-[8px]">playlist_add</span>
              <p className="text-[14px]">Belum ada fitur. Klik "Ambil dari Quotation" atau tambah manual.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] leading-[1.5] border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="text-left py-[8px] px-[4px] font-semibold text-on-surface-variant w-[8px]">No</th>
                    <th className="text-left py-[8px] px-[4px] font-semibold text-on-surface-variant">FITUR</th>
                    {Array.from({ length: formData.totalWeeks }, (_, w) => (
                      <th key={w} className="text-center py-[8px] px-[4px] font-semibold text-on-surface-variant w-[60px]">
                        Pekan {w + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formData.features.map((feature, fi) => (
                    <tr key={fi} className="border-b border-outline-variant/50 group">
                      <td className="py-[6px] px-[4px] text-on-surface-variant text-center">{fi + 1}</td>
                      <td className="py-[6px] px-[4px]">
                        <input
                          type="text"
                          className="w-full bg-transparent border-none outline-none text-on-surface"
                          placeholder="Nama fitur..."
                          value={feature.name}
                          onChange={(e) => updateFeatureName(fi, e.target.value)}
                        />
                      </td>
                      {Array.from({ length: formData.totalWeeks }, (_, w) => (
                        <td key={w} className="text-center py-[6px] px-[4px]">
                          <button
                            type="button"
                            onClick={() => toggleWeek(fi, w)}
                            className={`w-[28px] h-[28px] rounded-full flex items-center justify-center mx-auto transition-colors ${
                              feature.weeks.includes(w)
                                ? "bg-primary text-on-primary"
                                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                            }`}
                          >
                            {feature.weeks.includes(w) ? "✓" : ""}
                          </button>
                        </td>
                      ))}
                      <td className="py-[6px] px-[4px]">
                        <button
                          type="button"
                          onClick={() => removeFeature(fi)}
                          className="opacity-0 group-hover:opacity-100 text-error text-[16px] transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove_circle</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            type="button"
            onClick={addFeature}
            className="mt-[16px] w-full py-[12px] border-2 border-dashed border-primary/30 text-primary text-[14px] leading-[1.4] tracking-[0.05em] font-medium rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-[8px]"
          >
            <span className="material-symbols-outlined">add</span>
            Tambah Fitur Baru
          </button>
        </div>

        <div className="flex items-center gap-[16px] pt-[16px]">
          <button
            type="button"
            className="flex-1 py-[16px] border border-primary text-primary rounded-lg text-[14px] leading-[1.4] tracking-[0.05em] font-medium hover:bg-primary/5 transition-all"
          >
            Simpan Draft
          </button>
          <button
            type="button"
            className="flex-[2] py-[16px] bg-primary text-on-primary rounded-lg text-[14px] leading-[1.4] tracking-[0.05em] font-medium shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            Unduh PDF
          </button>
        </div>
      </form>
    </section>
  );
}
