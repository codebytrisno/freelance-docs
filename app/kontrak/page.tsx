"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import KontrakForm, { KontrakData } from "../components/KontrakForm";
import KontrakPreview from "../components/KontrakPreview";

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
