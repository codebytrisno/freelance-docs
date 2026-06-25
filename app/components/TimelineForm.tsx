"use client";

import { useState } from "react";

interface TimelineFormProps {
  onUpdate: (data: TimelineData) => void;
}

export interface TimelineData {
  projectName: string;
  startDate: string;
  endDate: string;
  phases: TimelinePhase[];
}

export interface TimelinePhase {
  name: string;
  description: string;
  timeframe: string;
  status: "Selesai" | "Dalam Proses" | "Belum Mulai";
}

export default function TimelineForm({ onUpdate }: TimelineFormProps) {
  const [formData, setFormData] = useState<TimelineData>({
    projectName: "",
    startDate: "",
    endDate: "",
    phases: [
      { name: "", description: "", timeframe: "Minggu 1", status: "Dalam Proses" },
      { name: "", description: "", timeframe: "Minggu 2", status: "Dalam Proses" },
      { name: "", description: "", timeframe: "Minggu 3", status: "Dalam Proses" },
    ],
  });

  const handleChange = (field: keyof TimelineData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handlePhaseChange = (index: number, field: keyof TimelinePhase, value: any) => {
    const newPhases = [...formData.phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    handleChange("phases", newPhases);
  };

  const addPhase = () => {
    const newPhaseNumber = formData.phases.length + 1;
    handleChange("phases", [
      ...formData.phases,
      { name: "", description: "", timeframe: `Minggu ${newPhaseNumber}`, status: "Dalam Proses" },
    ]);
  };

  const removePhase = (index: number) => {
    const newPhases = formData.phases.filter((_, i) => i !== index);
    handleChange("phases", newPhases);
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
          <h2 className="text-[24px] leading-[1.4] font-semibold mb-[16px] flex items-center gap-[8px]">
            <span className="material-symbols-outlined text-primary">info</span>
            Informasi Proyek
          </h2>
          <div className="space-y-[16px]">
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                Nama Proyek
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="cth: Jasa Desain UI/UX Mobile App"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[4px]">
                <label className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant">
                  Estimasi Selesai
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Phases Section */}
        <div className="bg-surface-container-lowest border border-outline-variant p-[24px] rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-[16px]">
            <h2 className="text-[24px] leading-[1.4] font-semibold flex items-center gap-[8px]">
              <span className="material-symbols-outlined text-primary">list_alt</span>
              Fase Kerja
            </h2>
          </div>
          <div className="space-y-[16px]">
            {formData.phases.map((phase, index) => (
              <div
                key={index}
                className="p-[16px] border border-outline-variant rounded-lg bg-surface relative group"
              >
                {formData.phases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhase(index)}
                    className="absolute -top-2 -right-2 bg-error text-on-error w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
                <div className="grid grid-cols-1 gap-[16px]">
                  <input
                    type="text"
                    placeholder="Nama Fase (cth: Research & Briefing)"
                    className="w-full rounded-lg border-outline-variant focus:border-primary text-[16px] leading-[1.5]"
                    value={phase.name}
                    onChange={(e) => handlePhaseChange(index, "name", e.target.value)}
                  />
                  <textarea
                    placeholder="Deskripsi singkat kegiatan..."
                    className="w-full rounded-lg border-outline-variant focus:border-primary text-[16px] leading-[1.5] h-20 resize-none"
                    value={phase.description}
                    onChange={(e) => handlePhaseChange(index, "description", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-[16px]">
                    <input
                      type="text"
                      placeholder="Waktu (cth: Minggu 1)"
                      className="w-full rounded-lg border-outline-variant focus:border-primary text-[16px] leading-[1.5]"
                      value={phase.timeframe}
                      onChange={(e) => handlePhaseChange(index, "timeframe", e.target.value)}
                    />
                    <select
                      className="w-full rounded-lg border-outline-variant focus:border-primary text-[16px] leading-[1.5]"
                      value={phase.status}
                      onChange={(e) =>
                        handlePhaseChange(
                          index,
                          "status",
                          e.target.value as TimelinePhase["status"]
                        )
                      }
                    >
                      <option value="Selesai">Selesai</option>
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Belum Mulai">Belum Mulai</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPhase}
            className="mt-[16px] w-full py-[16px] border-2 border-dashed border-primary/30 text-primary text-[14px] leading-[1.4] tracking-[0.05em] font-medium rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-[8px]"
          >
            <span className="material-symbols-outlined">add</span>
            Tambah Fase Baru
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
