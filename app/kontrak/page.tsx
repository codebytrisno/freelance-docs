"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KontrakForm, { KontrakData } from "../components/KontrakForm";
import KontrakPreview from "../components/KontrakPreview";
import { saveDraft, loadDraft } from "../lib/storage";
import DraftControls from "../components/DraftControls";

const emptyData: KontrakData = {
  quotationNo: "",
  quotationDate: "",
  freelancerName: "",
  clientName: "",
  clientCompany: "",
  projectTitle: "",
  projectDescription: "",
  contractValue: "",
  startDate: "",
  deadline: "",
  city: "",
  bankName: "",
  bankAccount: "",
  bankHolder: "",
  includeCopyright: true,
  includeConfidentiality: true,
  includeRevisionLimit: false,
};

export default function KontrakPage() {
  const [kontrakData, setKontrakData] = useState<KontrakData>(emptyData);

  useEffect(() => {
    const draft = loadDraft<KontrakData>("kontrak");
    if (draft) {
      setKontrakData(prev => ({ ...prev, ...draft }));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft("kontrak", kontrakData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [kontrakData]);

  return (
    <>
      <Header />
      <main className="h-[calc(100vh-72px)] flex flex-col md:flex-row overflow-hidden">
        <div className="fixed bottom-[24px] right-[24px] z-50">
          <DraftControls type="kontrak" data={kontrakData} onReset={() => setKontrakData(emptyData)} />
        </div>
        <KontrakForm onUpdate={setKontrakData} data={kontrakData} />
        <KontrakPreview data={kontrakData} />
      </main>
      <Footer />
    </>
  );
}
