import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export interface PDFOptions {
  filename?: string;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
  quality?: number;
}

interface PDFOptionsInternal extends PDFOptions {
  multiPage?: boolean;
  breakSelector?: string;
  compactCSS?: string;
}

const PAGE_DIMS: Record<string, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
};

const LIGHT_MODE_CSS = `:root {
  --color-primary: #3525cd !important;
  --color-on-primary: #ffffff !important;
  --color-primary-container: #4f46e5 !important;
  --color-on-primary-container: #dad7ff !important;
  --color-secondary: #712ae2 !important;
  --color-on-secondary: #ffffff !important;
  --color-surface: #f8f9ff !important;
  --color-on-surface: #121c28 !important;
  --color-surface-variant: #d9e3f4 !important;
  --color-on-surface-variant: #464555 !important;
  --color-surface-dim: #d1dbec !important;
  --color-surface-bright: #f8f9ff !important;
  --color-surface-container-lowest: #ffffff !important;
  --color-surface-container-low: #eef4ff !important;
  --color-surface-container: #e5eeff !important;
  --color-surface-container-high: #dfe9fa !important;
  --color-surface-container-highest: #d9e3f4 !important;
  --color-background: #f8f9ff !important;
  --color-on-background: #121c28 !important;
  --color-outline: #777587 !important;
  --color-outline-variant: #c7c4d8 !important;
}`;

async function captureCanvas(
  element: HTMLElement,
  breakSelector: string,
  compactCSS = ""
): Promise<{
  canvas: HTMLCanvasElement;
  bounds: { start: number; end: number }[];
}> {
  const scale = 2;
  let bounds: { start: number; end: number }[] = [];

  await document.fonts.ready;
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    height: element.scrollHeight,
    windowHeight: element.scrollHeight,
    onclone: (clonedDoc) => {
      const light = clonedDoc.createElement("style");
      light.textContent = LIGHT_MODE_CSS;
      clonedDoc.head.appendChild(light);
      if (compactCSS) {
        const compact = clonedDoc.createElement("style");
        compact.textContent = compactCSS;
        clonedDoc.head.appendChild(compact);
      }
      const clonedRoot = clonedDoc.querySelector(".document-canvas") as HTMLElement;
      if (clonedRoot) {
        const rootRect = clonedRoot.getBoundingClientRect();
        const sections = Array.from(clonedRoot.querySelectorAll(breakSelector)) as HTMLElement[];
        bounds = sections.map(el => {
          const rect = el.getBoundingClientRect();
          return {
            start: (rect.top - rootRect.top) * scale,
            end: (rect.bottom - rootRect.top) * scale,
          };
        });
      }
    },
  });

  return { canvas, bounds };
}

export async function exportToPDF(
  element: HTMLElement,
  options: PDFOptionsInternal = {}
): Promise<boolean> {
  try {
    const {
      filename = "document.pdf",
      format = "a4",
      orientation = "portrait",
      quality = 0.95,
      multiPage = false,
      breakSelector = "section",
      compactCSS = "",
    } = options;

    const { width: pageWidth, height: pageHeight } = PAGE_DIMS[format];

    const { canvas, bounds } = await captureCanvas(element, breakSelector, compactCSS);

    if (multiPage) {
      return multiPageExport(canvas, bounds, { pageWidth, pageHeight, filename, orientation, format, quality });
    }

    // Single page — scale to fit
    const imgWidth = pageWidth;
    const fullImgHeight = (canvas.height * imgWidth) / canvas.width;
    const scale = Math.min(1, pageHeight / fullImgHeight);
    const fitWidth = imgWidth * scale;
    const fitHeight = fullImgHeight * scale;
    const offsetX = (pageWidth - fitWidth) / 2;

    const pdf = new jsPDF({ orientation, unit: "mm", format });
    const imgData = canvas.toDataURL("image/jpeg", quality);
    pdf.addImage(imgData, "JPEG", offsetX, 0, fitWidth, fitHeight);
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Failed to export PDF:", error);
    return false;
  }
}

function multiPageExport(
  canvas: HTMLCanvasElement,
  bounds: { start: number; end: number }[],
  opts: {
    pageWidth: number;
    pageHeight: number;
    filename: string;
    orientation: "portrait" | "landscape";
    format: string;
    quality: number;
  }
): boolean {
  const { pageWidth, pageHeight, filename, orientation, format, quality } = opts;

  const pxPerMm = canvas.width / pageWidth;
  const pagePx = pageHeight * pxPerMm;

  // Group sections into pages, breaking only at section boundaries
  const pageSlices: { start: number; end: number }[] = [];
  let pageStart = 0;

  for (const b of bounds) {
    const wouldOverflow = b.end - pageStart > pagePx;
    if (wouldOverflow) {
      const hasContent = b.start - pageStart > 1;
      if (hasContent) {
        // Close current page at this section boundary
        pageSlices.push({ start: pageStart, end: b.start });
        pageStart = b.start;
      }
      // If the section itself is taller than a page, force-break within it
      if (b.end - pageStart > pagePx) {
        const slicesNeeded = Math.ceil((b.end - pageStart) / pagePx);
        for (let i = 0; i < slicesNeeded - 1; i++) {
          const sliceEnd = pageStart + pagePx;
          pageSlices.push({ start: pageStart, end: sliceEnd });
          pageStart = sliceEnd;
        }
      }
    }
  }

  // Last page
  if (pageStart < canvas.height) {
    pageSlices.push({ start: pageStart, end: canvas.height });
  }

  const pdf = new jsPDF({ orientation, unit: "mm", format });

  for (let i = 0; i < pageSlices.length; i++) {
    if (i > 0) pdf.addPage();

    const { start, end } = pageSlices[i];
    const sliceHeight = end - start;
    const imgHeightMm = sliceHeight / pxPerMm;

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const ctx = pageCanvas.getContext("2d")!;
    ctx.drawImage(canvas, 0, start, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    const imgData = pageCanvas.toDataURL("image/jpeg", quality);
    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeightMm);
  }

  pdf.save(filename);
  return true;
}

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
  const defaultFilenames: Record<string, string> = {
    quotation: `Quotation_${timestamp}.pdf`,
    timeline: `Timeline_${timestamp}.pdf`,
    kontrak: `Kontrak_${timestamp}.pdf`,
    bast: `BAST_${timestamp}.pdf`,
  };

  const useMultiPage = type === "kontrak" || type === "bast";

  const BAST_COMPACT_CSS = `.document-canvas { font-size: 11px !important; line-height: 1.4 !important; }
.document-canvas { padding-bottom: 40px !important; }
[class*="mb-[36px]"] { margin-bottom: 18px !important; }
[class*="mb-[28px]"] { margin-bottom: 14px !important; }
[class*="mb-[64px]"] { margin-bottom: 30px !important; }
[class*="mb-[72px]"] { margin-bottom: 34px !important; }
[class*="h-[40px]"] { height: 18px !important; }
[class*="mt-[10px]"] { margin-top: 4px !important; }
[class*="mt-[6px]"] { margin-top: 3px !important; }
[class*="pt-[32px]"] { padding-top: 16px !important; }
[class*="py-[2px]"] { padding-top: 1px !important; padding-bottom: 1px !important; }`;

  return exportToPDF(element, {
    filename: customFilename || defaultFilenames[type],
    format: "a4",
    orientation: "portrait",
    quality: useMultiPage ? 0.92 : 0.95,
    multiPage: useMultiPage,
    breakSelector: "section",
    compactCSS: type === "bast" ? BAST_COMPACT_CSS : "",
  });
}
