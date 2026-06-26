"use client";

import { useState, useEffect, useRef } from "react";
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
  developerName: "",
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

  const isFirstRender = useRef(true);
  const latestTimeline = useRef(timelineData);
  latestTimeline.current = timelineData;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveDraft("timeline", latestTimeline.current);
  }, [timelineData]);

  useEffect(() => {
    return () => {
      if (!isFirstRender.current) {
        saveDraft("timeline", latestTimeline.current);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DraftControls type="timeline" data={timelineData} onReset={() => setTimelineData(emptyData)} />
        </div>
        <section className="w-full max-w-[1280px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[4px] text-on-surface-variant mb-[4px]">
            <span className="text-[12px] leading-[1.4]">Home</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[12px] leading-[1.4] font-semibold text-primary">
              Timeline
            </span>
          </nav>
          <div>
            <h1 className="text-[24px] leading-[1.4] font-semibold text-on-surface">
              Buat Timeline Proyek
            </h1>
            <p className="text-[16px] leading-[1.5] text-on-surface-variant">
              Mari buat dokumen Anda dengan mudah dan profesional.
            </p>
          </div>
        </section>
        <div className="flex-grow flex flex-col lg:flex-row w-full max-w-[1280px] mx-auto px-[24px] pb-[40px] gap-[40px] items-start">
          <TimelineForm onUpdate={setTimelineData} />
          <TimelinePreview data={timelineData} />
        </div>
        <div className="max-w-[1280px] mx-auto w-full px-[24px] pb-[40px]">
          <div className="p-[24px] bg-surface border border-outline-variant flex justify-between items-center rounded-lg">
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
        </div>
      </main>
      <Footer />
    </>
  );
}
