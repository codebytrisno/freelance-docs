"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuotationForm, { QuotationData } from "../components/QuotationForm";
import QuotationPreview from "../components/QuotationPreview";
import { saveDraft, loadDraft } from "../lib/storage";

export default function QuotationPage() {
  const [quotationData, setQuotationData] = useState<QuotationData>({
    clientName: "",
    clientEmail: "",
    projectName: "",
    items: [{ service: "", description: "", price: 0 }],
    dpPercent: 50,
    payMethod: "Transfer Bank",
  });

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft<QuotationData>("quotation");
    if (draft) {
      setQuotationData(draft);
    }
  }, []);

  // Auto-save on data change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft("quotation", quotationData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [quotationData]);

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        {/* Breadcrumbs & Title */}
        <section className="w-full max-w-[1280px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[4px] text-on-surface-variant mb-[4px]">
            <span className="text-[12px] leading-[1.4]">Home</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[12px] leading-[1.4] font-semibold text-primary">
              Quotation
            </span>
          </nav>
          <h1 className="text-[24px] leading-[1.4] font-semibold text-on-surface">
            Buat Penawaran Baru
          </h1>
          <p className="text-[16px] leading-[1.5] text-on-surface-variant">
            Mari buat dokumen Anda dengan mudah dan profesional.
          </p>
        </section>

        {/* Split Screen Layout */}
        <div className="flex-grow flex flex-col lg:flex-row w-full max-w-[1280px] mx-auto px-[24px] pb-[40px] gap-[40px] items-start">
          <QuotationForm onUpdate={setQuotationData} />
          <QuotationPreview data={quotationData} />
        </div>
      </main>
      <Footer />
    </>
  );
}
