"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TimelineForm, { TimelineData } from "../components/TimelineForm";
import TimelinePreview from "../components/TimelinePreview";
import { saveDraft, loadDraft } from "../lib/storage";
import DraftControls from "../components/DraftControls";

const emptyData: TimelineData = {
  quotationNo: "",
  projectName: "",
  clientName: "",
  features: [],
  totalWeeks: 4,
};

export default function TimelinePage() {
  const router = useRouter();
  const [timelineData, setTimelineData] = useState<TimelineData>(emptyData);

  useEffect(() => {
    const draft = loadDraft<any>("timeline");
    if (draft && draft.features) {
      setTimelineData(draft as TimelineData);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft("timeline", timelineData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timelineData]);

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 px-[24px] md:px-[40px] max-w-[1280px] mx-auto">
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DraftControls type="timeline" data={timelineData} onReset={() => setTimelineData(emptyData)} />
        </div>
        <nav className="flex items-center gap-[8px] mb-[24px] text-on-surface-variant">
          <a className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium hover:text-primary">
            Home
          </a>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-semibold text-primary">
            Timeline
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px]">
          <TimelineForm onUpdate={setTimelineData} />
          <TimelinePreview data={timelineData} />
        </div>

        <div className="mt-[40px] p-[24px] bg-surface border-t border-outline-variant flex justify-between items-center rounded-lg">
          <button
            onClick={() => router.push("/kontrak")}
            className="flex items-center gap-[8px] text-primary font-medium hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Kontrak
          </button>
          <button
            onClick={() => router.push("/bast")}
            className="flex items-center gap-[8px] bg-primary text-white px-[40px] py-[16px] rounded-xl font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
          >
            Lanjut ke BAST
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
