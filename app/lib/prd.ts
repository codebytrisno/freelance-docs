import { QuotationData } from "../components/QuotationForm";

export function generatePrd(data: QuotationData): string {
  const features = data.platforms.flatMap((p) =>
    p.items
      .filter((i) => i.title)
      .map((i) => {
        const details = i.details
          ? i.details
              .split("\n")
              .filter((d) => d.trim())
              .map((d) => `    - ${d}`)
              .join("\n")
          : "";
        return `  - ${i.title}${details ? "\n" + details : ""}`;
      })
  );

  const platformList = data.platforms
    .filter((p) => p.name)
    .map((p) => `  - ${p.name}`);

  const now = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `# Product Requirements Document (PRD)

**Project** : ${data.projectName || "-"}  
**Client** : ${data.clientName || "-"}  
**Tanggal** : ${now}  
**Teknologi** : ${data.technology || "-"}

---

## 1. Ringkasan Eksekutif

Dokumen ini mendefinisikan kebutuhan produk untuk **${data.projectName || "proyek ini"}** yang akan dikembangkan untuk **${data.clientName || "klien"}**.

---

## 2. Tujuan & Ruang Lingkup

**Tujuan**
- Mengembangkan sistem sesuai kebutuhan yang telah disepakati.
- Memastikan semua fitur berjalan sesuai spesifikasi.
- Memberikan pengalaman pengguna yang optimal.

**Ruang Lingkup**
${data.platforms && data.platforms.length > 0 && data.platforms[0]?.name
  ? platformList.map((p) => p).join("\n")
  : "  - Pengembangan sistem sesuai dengan spesifikasi yang tercantum dalam quotation."}

---

## 3. Fitur & Fungsionalitas

${features.length > 0
  ? features.join("\n")
  : "  - Fitur akan ditentukan lebih lanjut selama proses pengembangan."}

---

## 4. Tech Stack

- **Teknologi** : ${data.technology || "Akan ditentukan"}
- **Estimasi Pengerjaan** : ${Math.ceil(
    data.platforms.reduce(
      (s, p) => s + p.items.reduce((s2, it) => s2 + (it.estimatedHours || 0), 0),
      0
    ) / (data.workHoursPerDay || 8)
  )} hari kerja

---

## 5. Ketentuan Pembayaran

- **Total** : Rp ${(
    data.platforms.reduce(
      (s, p) => s + p.items.reduce((s2, it) => s2 + (it.estimatedHours || 0), 0),
      0
    ) * (data.hourlyRate || 0)
  ).toLocaleString("id-ID")}
- **Termin** : ${data.paymentTerms || "Akan disepakati"}
- **Maintenance** : ${data.maintenance || "-"}
- **Bonus** : ${data.bonus || "-"}

---

## 6. Kriteria Penerimaan (Acceptance Criteria)

- Semua fitur utama berfungsi sesuai spesifikasi.
- Sistem responsif dan dapat diakses di perangkat yang ditentukan.
- Performa sistem memenuhi standar yang telah disepakati.

---

## 7. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Perubahan scope | Dokumentasi perubahan dan negosiasi ulang |
| Keterlambatan | Komunikasi rutin dan progress report |
| Miskomunikasi teknis | Dokumentasi teknis dan review berkala |

---

> **Catatan**: Dokumen ini dibuat berdasarkan quotation yang telah disepakati. Perubahan scope akan disepakati melalui change order terpisah.
`;
}

export function downloadPrd(data: QuotationData) {
  const markdown = generatePrd(data);
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PRD_${(data.projectName || "project").replace(/\s+/g, "_")}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
