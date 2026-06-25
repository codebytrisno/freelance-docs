"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KontrakForm, { KontrakData } from "../components/KontrakForm";
import KontrakPreview from "../components/KontrakPreview";
import { saveDraft, loadDraft } from "../lib/storage";

export default function KontrakPage() {
  const [kontrakData, setKontrakData] = useState<KontrakData>({
    freelancerName: "",
    clientName: "",
    projectTitle: "",
    projectDescription: "",
    contractValue: "",
    deadline: "",
    includeCopyright: true,
    includeConfidentiality: true,
    includeRevisionLimit: false,
  });

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft<KontrakData>("kontrak");
    if (draft) {
      setKontrakData(draft);
    }
  }, []);

  // Auto-save on data change (debounced)
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
        <KontrakForm onUpdate={setKontrakData} />
        <KontrakPreview data={kontrakData} />
      </main>
      <Footer />
    </>
  );
}
