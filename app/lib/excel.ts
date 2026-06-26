import * as XLSX from "xlsx";
import { QuotationData } from "../components/QuotationForm";

export function exportToExcel(data: QuotationData, filename?: string): void {
  const wb = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = {};

  const cols = [
    { wch: 16 },
    { wch: 40 },
    { wch: 16 },
    { wch: 40 },
  ];
  ws["!cols"] = cols;

  let r = 0;

  function write(rowIdx: number, colIdx: number, value: string | number) {
    const cell = XLSX.utils.encode_cell({ r: rowIdx, c: colIdx });
    ws[cell] = { t: typeof value === "number" ? "n" : "s", v: value };
  }

  function merge(startR: number, startC: number, endR: number, endC: number) {
    ws["!merges"] = ws["!merges"] || [];
    ws["!merges"].push({ s: { r: startR, c: startC }, e: { r: endR, c: endC } });
  }

  const totalHours = data.platforms.reduce(
    (s, p) => s + p.items.reduce((s2, it) => s2 + (it.estimatedHours || 0), 0),
    0
  );
  const estimatedDays = data.workHoursPerDay > 0 ? Math.ceil(totalHours / data.workHoursPerDay) : 0;
  const totalHarga = totalHours * data.hourlyRate;

  // ── Title ──
  write(r, 0, "SYSTEM DEVELOPMENT QUOTATION");
  merge(r, 0, r, 3);
  r++; r++;

  // ── Informasi Project ──
  write(r, 0, "Informasi Project");
  merge(r, 0, r, 3);
  r++;

  const infoRows: [string, string][] = [
    ["No. Quotation", data.quotationNo],
    ["Tanggal", data.date ? new Date(data.date + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""],
    ["Nama Project", data.projectName],
    ["Nama Developer", data.freelancerName],
    ["Perusahaan / Instansi", data.clientCompany],
    ["Diwakili oleh", data.clientName],
    ["Masa Berlaku", data.validUntil ? new Date(data.validUntil + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""],
  ];

  for (const [label, value] of infoRows) {
    write(r, 0, label);
    write(r, 1, value);
    merge(r, 1, r, 3);
    r++;
  }
  r++;

  // ── Platform & Fitur ──
  write(r, 0, "Platform & Fitur");
  merge(r, 0, r, 3);
  r++;

  const headers = ["Platform", "Fitur Utama", "Jam", "Detail"];
  for (let c = 0; c < headers.length; c++) {
    write(r, c, headers[c]);
  }
  r++;

  for (const platform of data.platforms) {
    const platformStartRow = r;
    for (const item of platform.items) {
      write(r, 0, platform.name);
      write(r, 1, item.title);
      write(r, 2, item.estimatedHours || 0);
      const details = item.details ? item.details.split("\n").filter((d) => d.trim()) : [];
      write(r, 3, details.join("\n"));
      r++;
    }
    if (platform.items.length > 1) {
      merge(platformStartRow, 0, r - 1, 0);
    }
  }

  write(r, 0, "Total");
  merge(r, 0, r, 1);
  write(r, 2, totalHours);
  r++; r++;

  // ── Detail Penawaran ──
  write(r, 0, "Detail Penawaran");
  merge(r, 0, r, 3);
  r++;

  const summaryRows: [string, string][] = [
    ["Teknologi", data.technology],
    ["Harga per Jam", `Rp ${data.hourlyRate.toLocaleString("id-ID")}`],
    ["Jam Kerja / Hari", `${data.workHoursPerDay} jam`],
    ["Termin Pembayaran", data.paymentTerms],
    ["Maintenance", data.maintenance],
    ["Bonus", data.bonus],
  ];

  for (const [label, value] of summaryRows) {
    write(r, 0, label);
    write(r, 1, value);
    merge(r, 1, r, 3);
    r++;
  }
  r++;

  // ── Ringkasan ──
  write(r, 0, "Ringkasan");
  merge(r, 0, r, 3);
  r++;

  const ringkasanRows: [string, string][] = [
    ["Total Jam", `${totalHours} jam`],
    ["Estimasi Hari", `${estimatedDays} hari`],
    ["Total Harga", `Rp ${totalHarga.toLocaleString("id-ID")}`],
  ];

  for (const [label, value] of ringkasanRows) {
    write(r, 0, label);
    write(r, 1, value);
    merge(r, 1, r, 3);
    r++;
  }

  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r - 1, c: 3 } });
  XLSX.utils.book_append_sheet(wb, ws, "Quotation");

  const defaultName = data.projectName
    ? `Quotation_${data.projectName.replace(/\s+/g, "_")}.xlsx`
    : "Quotation.xlsx";
  XLSX.writeFile(wb, filename || defaultName);
}

export async function importFromExcel(file: File): Promise<QuotationData> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<any>(ws, { header: 1 });

  let quotationNo = "",
    date = "",
    projectName = "",
    clientName = "",
    clientCompany = "",
    freelancerName = "",
    validUntil = "";

  const platforms: { name: string; items: { title: string; estimatedHours: number; details: string }[] }[] = [];

  let technology = "",
    hourlyRate = 0,
    workHoursPerDay = 8,
    paymentTerms = "",
    maintenance = "",
    bonus = "";

  let inTable = false;
  let currentPlatform: typeof platforms[0] | null = null;

  for (const row of rows) {
    const a = String(row[0] || "").trim();
    const b = String(row[1] || "").trim();
    const c = String(row[2] || "").trim();
    const d = String(row[3] || "").trim();

    if (!a && !b && !c && !d) continue;

    // Skip section headers
    if (a === "Informasi Project") continue;
    if (a === "Platform & Fitur") continue;
    if (a === "Detail Penawaran") continue;
    if (a === "Ringkasan") continue;

    // Detect info rows
    if (a === "No. Quotation") { quotationNo = b; continue; }
    if (a === "Tanggal") { date = b; continue; }
    if (a === "Nama Project") { projectName = b; continue; }
    if (a === "Nama Developer") { freelancerName = b; continue; }
    if (a === "Perusahaan / Instansi") { clientCompany = b; continue; }
    if (a === "Diwakili oleh") { clientName = b; continue; }
    if (a === "Masa Berlaku") { validUntil = b; continue; }

    // Detect header
    if (a === "Platform" && b === "Fitur Utama") { inTable = true; continue; }

    // Detect Total row
    if (a === "Total" && inTable) { inTable = false; continue; }

    if (inTable) {
      if (a) {
        currentPlatform = { name: a, items: [] };
        platforms.push(currentPlatform);
      }
      if (b) {
        const hours = parseFloat(c.replace(/[^0-9.]/g, "")) || 0;
        const details = d.replace(/\n/g, "\n");
        if (currentPlatform) {
          currentPlatform.items.push({ title: b, estimatedHours: hours, details });
        }
      }
      continue;
    }

    // Summary section
    if (a === "Teknologi") { technology = b; continue; }
    if (a === "Harga per Jam") {
      hourlyRate = parseFloat(b.replace(/[^0-9]/g, "")) || 0;
      continue;
    }
    if (a === "Jam Kerja / Hari") {
      workHoursPerDay = parseFloat(b.replace(/[^0-9.]/g, "")) || 8;
      continue;
    }
    if (a === "Termin Pembayaran") { paymentTerms = b; continue; }
    if (a === "Maintenance") { maintenance = b; continue; }
    if (a === "Bonus") { bonus = b; continue; }

    // Ringkasan rows
    if (a === "Total Jam") continue;
    if (a === "Estimasi Hari") continue;
    if (a === "Total Harga") continue;
  }

  return {
    quotationNo,
    date,
    projectName,
    clientName,
    clientCompany,
    freelancerName,
    validUntil,
    platforms: platforms.length > 0 ? platforms : [{ name: "", items: [{ title: "", estimatedHours: 0, details: "" }] }],
    technology,
    hourlyRate,
    workHoursPerDay,
    paymentTerms,
    maintenance,
    bonus,
  };
}
