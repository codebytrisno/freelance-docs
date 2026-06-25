"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TimelineForm, { TimelineData } from "../components/TimelineForm";
import TimelinePreview from "../components/TimelinePreview";

export default function TimelinePage() {
  const [timelineData, setTimelineData] = useState<TimelineData>({
    projectName: "",
    startDate: "",
    endDate: "",
    phases: [
      { name: "", description: "", timeframe: "Minggu 1", status: "Dalam Proses" },
      { name: "", description: "", timeframe: "Minggu 2", status: "Dalam Proses" },
      { name: "", description: "", timeframe: "Minggu 3", status: "Dalam Proses" },
    ],
  });

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 px-[24px] md:px-[40px] max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
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
      </main>
      <Footer />
    </>
  );
}
