"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BastForm, { BastData } from "../components/BastForm";
import BastPreview from "../components/BastPreview";
import { saveDraft, loadDraft } from "../lib/storage";

export default function BastPage() {
  const [bastData, setBastData] = useState<BastData>({
    freelancerName: "",
    freelancerAddress: "",
    clientName: "",
    clientCompany: "",
    projectName: "",
    contractNumber: "",
    completionDate: "",
    deliverables: "",
    notes: "",
  });

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft<BastData>("bast");
    if (draft) {
      setBastData(draft);
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
      <main className="min-h-screen flex flex-col">
        {/* Breadcrumbs & Header */}
        <section className="w-full max-w-[1280px] mx-auto px-[24px] pt-[24px]">
          <nav className="flex items-center gap-[8px] text-on-surface-variant mb-[16px]">
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-medium">Home</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[14px] leading-[1.4] tracking-[0.05em] font-semibold text-primary">
              BAST
            </span>
          </nav>
          <h1 className="text-[32px] leading-[1.3] font-bold text-on-surface">
            Buat Berita Acara Serah Terima
          </h1>
          <p className="text-[16px] leading-[1.5] text-on-surface-variant max-w-2xl mt-[4px]">
            Dokumentasikan penyelesaian proyek Anda secara profesional untuk perlindungan hukum
            dan kejelasan administrasi.
          </p>
        </section>

        {/* Main Content Area: Split Screen */}
        <section className="flex flex-col lg:flex-row flex-1 w-full max-w-[1280px] mx-auto gap-[24px] px-[24px] py-[40px]">
          <BastForm onUpdate={setBastData} />
          <BastPreview data={bastData} />
        </section>
      </main>
      <Footer />
    </>
  );
}
