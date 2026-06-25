"use client";

import { TimelineData } from "./TimelineForm";

interface TimelinePreviewProps {
  data: TimelineData;
}

export default function TimelinePreview({ data }: TimelinePreviewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Selesai":
        return { icon: "check_circle", color: "text-primary" };
      case "Dalam Proses":
        return { icon: "pending", color: "text-secondary" };
      case "Belum Mulai":
        return { icon: "radio_button_unchecked", color: "text-on-surface-variant" };
      default:
        return { icon: "radio_button_unchecked", color: "text-on-surface-variant" };
    }
  };

  return (
    <section className="lg:col-span-7 sticky top-24 self-start">
      <div className="flex justify-between items-center mb-[16px] px-[16px]">
        <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-on-surface-variant flex items-center gap-[4px]">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          Live Preview
        </span>
        <div className="flex gap-[8px]">
          <button className="p-[4px] hover:bg-surface-container-high rounded transition-colors">
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <button className="p-[4px] hover:bg-surface-container-high rounded transition-colors">
            <span className="material-symbols-outlined">zoom_out</span>
          </button>
        </div>
      </div>

      {/* Document Paper */}
      <div className="document-canvas bg-white p-[40px] rounded-sm mx-auto overflow-hidden">
        <div className="max-w-[600px] mx-auto font-serif">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-primary/20 pb-[24px] mb-[40px]">
            <div>
              <h2 className="text-[28px] font-bold text-on-surface mb-[4px]">
                {data.projectName || "Timeline Proyek"}
              </h2>
              <p className="text-on-surface-variant not-italic font-sans italic">
                {data.startDate || data.endDate
                  ? `${data.startDate} sampai ${data.endDate}`
                  : "Periode Kerja Belum Ditentukan"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary text-[14px] uppercase tracking-widest">
                freelance_docs
              </p>
              <p className="text-[12px] text-on-surface-variant">Dokumen #TL-2024-001</p>
            </div>
          </div>

          {/* Timeline Phases */}
          <div className="space-y-[40px]">
            {data.phases.length === 0 || data.phases.every((p) => !p.name) ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-outline-variant text-[64px] block mb-[16px]">
                  pending_actions
                </span>
                <p className="text-on-surface-variant italic">
                  Klik tombol &quot;Tambah Fase Baru&quot; untuk memulai.
                </p>
              </div>
            ) : (
              data.phases.map((phase, index) => {
                const statusInfo = getStatusIcon(phase.status);
                return (
                  <div key={index} className="timeline-item relative pl-[16px] timeline-line">
                    <div className="flex items-start gap-[16px]">
                      <div className="mt-1 bg-white relative z-10">
                        <span
                          className={`material-symbols-outlined ${statusInfo.color} text-[22px]`}
                        >
                          {statusInfo.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-[4px]">
                          <h3 className="text-[18px] font-bold text-on-surface">
                            {phase.name || "Fase Baru"}
                          </h3>
                          <span className="text-[13px] font-bold text-primary/80 italic">
                            {phase.timeframe || `Minggu ${index + 1}`}
                          </span>
                        </div>
                        <p className="text-[14px] text-on-surface-variant leading-relaxed">
                          {phase.description || "Deskripsi belum ditambahkan."}
                        </p>
                        <p
                          className={`text-[11px] font-bold uppercase tracking-wider mt-[8px] ${statusInfo.color}`}
                        >
                          {phase.status}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Signature Section */}
          <div className="mt-[80px] pt-[40px] border-t border-outline-variant/30 grid grid-cols-2 gap-[40px]">
            <div>
              <p className="text-[14px] font-bold mb-[16px]">Pemberi Kerja</p>
              <div className="h-16 w-32 border-b border-on-surface/20"></div>
              <p className="text-[12px] text-on-surface-variant mt-[8px]">(Tanda Tangan)</p>
            </div>
            <div>
              <p className="text-[14px] font-bold mb-[16px]">Freelancer</p>
              <div className="h-16 w-32 border-b border-on-surface/20"></div>
              <p className="text-[12px] text-on-surface-variant mt-[8px]">(Tanda Tangan)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
