"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuotationForm, { QuotationData } from "../components/QuotationForm";
import QuotationPreview from "../components/QuotationPreview";
import { saveDraft, loadDraft } from "../lib/storage";
import DraftControls from "../components/DraftControls";

const emptyData: QuotationData = {
  quotationNo: "",
  date: new Date().toISOString().split("T")[0],
  projectName: "",
  clientName: "",
  clientCompany: "",
  freelancerName: "",
  validUntil: "",
  platforms: [
    {
      name: "",
      items: [{ title: "", estimatedHours: 0, details: "" }],
    },
  ],
  technology: "",
  hourlyRate: 0,
  workHoursPerDay: 8,
  paymentTerms: "",
  maintenance: "",
  bonus: "",
};

export default function QuotationPage() {
  const [quotationData, setQuotationData] = useState<QuotationData>(emptyData);

  useEffect(() => {
    const draft = loadDraft<QuotationData>("quotation");
    if (draft) {
      setQuotationData(prev => ({ ...prev, ...draft }));
    }
  }, []);

  const isFirstRender = useRef(true);
  const latestQuotation = useRef(quotationData);
  latestQuotation.current = quotationData;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveDraft("quotation", latestQuotation.current);
  }, [quotationData]);

  useEffect(() => {
    return () => {
      if (!isFirstRender.current) {
        saveDraft("quotation", latestQuotation.current);
      }
    };
  }, []);

  const handleImport = (data: QuotationData) => {
    setQuotationData(data);
  };

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DraftControls type="quotation" data={quotationData} onReset={() => setQuotationData(emptyData)} />
        </div>
        <section className="w-full max-w-[1280px] mx-auto px-[24px] py-[16px]">
          <nav className="flex items-center gap-[4px] text-on-surface-variant mb-[4px]">
            <span className="text-[12px] leading-[1.4]">Home</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[12px] leading-[1.4] font-semibold text-primary">
              Quotation
            </span>
          </nav>
          <div>
            <h1 className="text-[24px] leading-[1.4] font-semibold text-on-surface">
              Buat Penawaran Baru
            </h1>
            <p className="text-[16px] leading-[1.5] text-on-surface-variant">
              Mari buat dokumen Anda dengan mudah dan profesional.
            </p>
          </div>
        </section>

        <div className="flex-grow flex flex-col lg:flex-row w-full max-w-[1280px] mx-auto px-[24px] pb-[40px] gap-[40px] items-start">
          <QuotationForm onUpdate={setQuotationData} data={quotationData} />
          <QuotationPreview data={quotationData} onImport={handleImport} />
        </div>
      </main>
      <Footer />
    </>
  );
}
