# FreelanceDocs - Generator Dokumen Project Freelance

Website generator dokumen profesional untuk freelancer Indonesia. Bikin Quotation, Timeline, BAST, dan Kontrak dalam hitungan menit.

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Material Design 3** (Color System + Icons)
- **Google Fonts** (Inter + Noto Serif)

## 📁 Struktur Project

```
freelance-docs/
├── app/
│   ├── components/          # Shared components
│   │   ├── Header.tsx       # Navigation bar dengan dropdown
│   │   ├── Footer.tsx       # Footer dengan links
│   │   ├── HeroSection.tsx  # Hero section untuk home
│   │   ├── FeatureBento.tsx # 4 kartu fitur dokumen
│   │   ├── PreviewSection.tsx
│   │   ├── QuotationForm.tsx    # Form + state management
│   │   ├── QuotationPreview.tsx # Live preview dokumen
│   │   ├── TimelineForm.tsx
│   │   ├── TimelinePreview.tsx
│   │   ├── KontrakForm.tsx
│   │   ├── KontrakPreview.tsx
│   │   ├── BastForm.tsx
│   │   └── BastPreview.tsx
│   ├── quotation/
│   │   └── page.tsx         # Quotation generator page
│   ├── timeline/
│   │   └── page.tsx         # Timeline generator page
│   ├── kontrak/
│   │   └── page.tsx         # Kontrak generator page
│   ├── bast/
│   │   └── page.tsx         # BAST generator page
│   ├── globals.css          # Global styles + Material Design 3 colors
│   ├── layout.tsx           # Root layout dengan fonts
│   └── page.tsx             # Home page
```

## 🎨 Fitur

### ✅ Home Page
- Hero section dengan animasi floating cards
- 4 kartu fitur dokumen (Quotation, Timeline, Kontrak, BAST)
- Preview section dengan screenshot

### ✅ Quotation Generator
- Form: data klien, item pekerjaan (dynamic rows), pembayaran
- Live preview: format surat penawaran profesional
- Kalkulasi otomatis: total, DP, subtotal

### ✅ Timeline Generator
- Form: info project, fase kerja (add/remove dynamic)
- Live preview: timeline visual dengan status icons
- Status tracking: Selesai, Dalam Proses, Belum Mulai

### ✅ Kontrak Generator
- Form: identitas pihak, lingkup kerja, durasi, pembayaran
- Klausul: hak cipta, kerahasiaan, revisi (checkbox)
- Live preview: format surat perjanjian resmi

### ✅ BAST Generator
- Form: freelancer, klien, project, deliverables
- Live preview: berita acara serah terima resmi
- Format: sesuai standar Indonesia

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
```

## 🎨 Design System

### Colors (Material Design 3)
- **Primary**: #3525cd (Indigo/Purple)
- **Secondary**: #712ae2 (Purple)
- **Tertiary**: #7e3000 (Orange)
- **Surface**: #f8f9ff (Light gray-blue)
- **Error**: #ba1a1a (Red)

### Typography
- **Sans-serif**: Inter (UI, body text)
- **Serif**: Noto Serif (document preview)
- **Icons**: Material Symbols Outlined

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 40px
- gutter: 24px
- section: 80px

## 📝 Fitur Yang Bisa Ditambah (Future)

- [ ] PDF Export (jsPDF / react-pdf)
- [ ] Save to LocalStorage / Backend
- [ ] User Authentication (optional)
- [ ] Template Library
- [ ] Dark Mode
- [ ] Multi-language (EN)
- [ ] Email Integration
- [ ] Digital Signature (e-signature)
- [ ] Invoice Generator

## 📱 Responsive

- ✅ Mobile-friendly (responsive grid, flex)
- ✅ Tablet optimized
- ✅ Desktop-first approach

## 🙏 Credits

Created by **Trisno Sanjaya** © 2026

Based on PRD: freelance_docs MVP

---

**Happy Generating! 🚀📄**
