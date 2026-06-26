# FreelanceDocs - Generator Dokumen Project Freelance

Website generator dokumen profesional untuk freelancer Indonesia. Bikin Quotation, Timeline, BAST, dan Kontrak dalam hitungan menit.

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Material Design 3** (Color System + Icons)
- **Google Fonts** (Inter + Space Grotesk + Noto Serif)
- **jsPDF** + **html2canvas** (PDF export)
- **xlsx** (Excel export/import)

## 📁 Struktur Project

```
freelance-docs/
├── app/
│   ├── components/
│   │   ├── Header.tsx            # Navbar dengan navigasi
│   │   ├── Footer.tsx            # Footer dengan links
│   │   ├── Logo.tsx              # SVG logo (document + checkmark)
│   │   ├── ThemeProvider.tsx     # Theme context + localStorage
│   │   ├── HeroSection.tsx       # Hero section home
│   │   ├── FeatureBento.tsx      # 4 kartu fitur dokumen
│   │   ├── QuotationForm.tsx     # Form + state management
│   │   ├── QuotationPreview.tsx  # Live preview dokumen
│   │   ├── TimelineForm.tsx
│   │   ├── TimelinePreview.tsx
│   │   ├── KontrakForm.tsx
│   │   ├── KontrakPreview.tsx
│   │   ├── BastForm.tsx
│   │   └── BastPreview.tsx
│   ├── lib/
│   │   ├── pdf.ts                # Multi-page PDF export + page numbers
│   │   └── excel.ts              # Export/import Excel (.xlsx)
│   ├── quotation/page.tsx
│   ├── timeline/page.tsx
│   ├── kontrak/page.tsx
│   ├── bast/page.tsx
│   ├── favicon.ico
│   ├── globals.css               # Material Design 3 + global styles
│   ├── layout.tsx                # Root layout + fonts + metadata
│   ├── page.tsx                  # Home page
│   ├── icon.tsx                  # 32x32 favicon (generated PNG)
│   └── apple-icon.tsx            # 180x180 iOS icon (generated PNG)
├── referensi/                    # Template dokumen referensi
└── public/
```

## 🎨 Fitur

### ✅ Home Page
- Hero section dengan animasi floating cards
- 4 kartu fitur dokumen (Quotation, Timeline, Kontrak, BAST)
- Breadcrumbs di semua halaman generator
- Logo dengan document + checkmark SVG

### ✅ Quotation Generator
- Form lengkap: No. Quotation, Tanggal, Nama Project, Developer, Client, Perusahaan, Masa Berlaku
- Dynamic platform & fitur (tambah/hapus baris)
- Detail penawaran: Teknologi, Harga per Jam, Jam Kerja/Hari, Termin, Maintenance, Bonus
- Kalkulasi otomatis: Total Jam, Estimasi Hari, Total Harga
- Live preview format surat penawaran
- **Download Excel (.xlsx)** - format sesuai form dengan 4 section
- **Import Excel (.xlsx)** - parse balik ke form
- Data otomatis dipakai halaman Timeline (developer name) & BAST (nomor)

### ✅ Timeline Generator
- Form: info project + fase kerja (add/remove dynamic)
- Nama Developer - bisa "Ambil dari Quotation"
- Status tracking: Selesai, Dalam Proses, Belum Mulai
- Live preview timeline dengan signature
- Navigasi: Kembali ke Kontrak / Lanjut ke BAST

### ✅ Kontrak Generator
- Form: identitas pihak, lingkup kerja, durasi, pembayaran
- Klausul: hak cipta, kerahasiaan, revisi (checkbox)
- Tanggal otomatis dari Quotation
- Multi-page PDF export dengan page numbers
- Navigasi: Kembali ke Quotation / Lanjut ke Timeline

### ✅ BAST Generator
- Form lengkap: BAST No, tanggal, client, project, deliverables
- Auto-fill BAST number dari Quotation (`BAST/<quotationNo>`)
- Warranty period & notes
- QA checkmarks (green)
- Multi-page PDF export (compact CSS otomatis pas export)
- Page numbers di semua PDF
- Navigasi: Kembali ke Timeline

### ✅ PDF Export (Semua Dokumen)
- jsPDF + html2canvas
- Multi-page support (break di `<section>` boundaries)
- Page numbers: `X / Y` (bottom-right, tiny font)
- Quality: 0.92
- Compact CSS otomatis untuk BAST agar fit 2 halaman

### ✅ Excel Export/Import (Quotation)
- Export: 4 section (Informasi Project, Platform & Fitur, Detail Penawaran, Ringkasan)
- Import: parse dari file Excel balik ke form
- All fields termasuk Jam Kerja/Hari, Bonus, Maintenance

### ✅ UI Consistency
- Semua halaman: layout flex form-preview, breadcrumbs, h1 seragam
- Form: card `bg-surface-container-lowest`, input styling konsisten
- Sticky form sidebar (desktop)
- Material Symbols icons

## 🎯 Cara Pakai

### Development
```bash
npm run dev
```
Server jalan di: http://localhost:3000

### Build Production
```bash
npm run build
npm start
```

### Lint & Type Check
```bash
npm run lint
npm run typecheck
```

## 🎨 Design System

### Colors (Material Design 3)
- **Primary**: `#3525cd` (Indigo/Purple)
- **Secondary**: `#712ae2` (Purple)
- **Tertiary**: `#7e3000` (Orange)
- **Surface**: `#f8f9ff` (Light gray-blue)
- **Error**: `#ba1a1a` (Red)

### Typography
- **Sans-serif (UI)**: Inter + Space Grotesk
- **Serif (document preview)**: Noto Serif
- **Icons**: Material Symbols Outlined

## 📝 Future Improvements

- [ ] Dark Mode
- [ ] Save/load drafts from backend
- [ ] User Authentication
- [ ] Template Library
- [ ] Multi-language (EN)
- [ ] Email Integration
- [ ] Digital Signature (e-signature)
- [ ] Invoice Generator
- [ ] Gantt chart visual timeline

## 📱 Responsive

- ✅ Mobile-friendly (responsive grid, flex)
- ✅ Tablet optimized
- ✅ Desktop-first approach

## 🙏 Credits

Created by **Trisno Sanjaya** © 2026

Based on PRD: freelance_docs MVP

---

**Happy Generating! 🚀📄**
