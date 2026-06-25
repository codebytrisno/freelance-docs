/**
 * PDF export utility using jsPDF and html2canvas
 * Converts document preview to PDF file
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PDFOptions {
  filename?: string;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
  quality?: number;
}

/**
 * Export HTML element to PDF
 */
export async function exportToPDF(
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<boolean> {
  try {
    const {
      filename = "document.pdf",
      format = "a4",
      orientation = "portrait",
      quality = 0.95,
    } = options;

    // Capture element as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Calculate PDF dimensions
    const imgWidth = format === "a4" ? 210 : 215.9; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: "mm",
      format,
    });

    const imgData = canvas.toDataURL("image/jpeg", quality);
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    // Save PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Failed to export PDF:", error);
    return false;
  }
}

/**
 * Export document preview to PDF with proper formatting
 */
export async function exportDocumentToPDF(
  type: "quotation" | "timeline" | "kontrak" | "bast",
  customFilename?: string
): Promise<boolean> {
  const element = document.querySelector(".document-canvas") as HTMLElement;
  
  if (!element) {
    console.error("Document canvas not found");
    return false;
  }

  const timestamp = new Date().toISOString().split("T")[0];
  const defaultFilenames = {
    quotation: `Quotation_${timestamp}.pdf`,
    timeline: `Timeline_${timestamp}.pdf`,
    kontrak: `Kontrak_${timestamp}.pdf`,
    bast: `BAST_${timestamp}.pdf`,
  };

  return exportToPDF(element, {
    filename: customFilename || defaultFilenames[type],
    format: "a4",
    orientation: "portrait",
    quality: 0.95,
  });
}
