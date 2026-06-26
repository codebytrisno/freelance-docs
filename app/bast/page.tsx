"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BastForm, { BastData } from "../components/BastForm";
import BastPreview from "../components/BastPreview";
import { saveDraft, loadDraft } from "../lib/storage";
import DraftControls from "../components/DraftControls";

const emptyData: BastData = {
  bastNo: "",
  bastDate: "",
  freelancerName: "",
  freelancerAddress: "",
  clientName: "",
  clientCompany: "",
  clientAddress: "",
  projectName: "",
  quotationNo: "",
  quotationDate: "",
  systemUrl: "",
  appUrl: "",
  warrantyPeriod: 30,
  notes: "",
};

export default function BastPage() {
  const router = useRouter();
  const [bastData, setBastData] = useState<BastData>(emptyData);

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft<BastData>("bast");
    if (draft) {
      setBastData(prev => ({ ...prev, ...draft }));
    }
  }, []);

  // Auto-save on data change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft("bast", bastData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [bastData]);

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DraftControls type="bast" data={bastData} onReset={() => setBastData(emptyData)} />
        </div>
        <section className="w-full max-w-[1280px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[4px] text-on-surface-variant mb-[4px]">
            <span className="text-[12px] leading-[1.4]">Home</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[12px] leading-[1.4] font-semibold text-primary">
              BAST
            </span>
          </nav>
          <div>
            <h1 className="text-[24px] leading-[1.4] font-semibold text-on-surface">
              Buat Berita Acara Serah Terima
            </h1>
            <p className="text-[16px] leading-[1.5] text-on-surface-variant">
              Dokumentasikan penyelesaian proyek Anda secara profesional.
            </p>
          </div>
        </section>

        {/* Main Content Area: Split Screen */}
        <div className="flex-grow flex flex-col lg:flex-row w-full max-w-[1280px] mx-auto px-[24px] pb-[40px] gap-[40px] items-start">
          <BastForm onUpdate={setBastData} />
          <BastPreview data={bastData} />
        </div>

        <div className="max-w-[1280px] mx-auto w-full px-[24px] pb-[40px]">
          <div className="p-[24px] bg-surface border border-outline-variant flex justify-between items-center rounded-lg">
            <button
              onClick={() => router.push("/timeline")}
              className="flex items-center gap-[8px] text-primary font-medium hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Kembali ke Timeline
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
