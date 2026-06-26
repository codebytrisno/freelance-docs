***

## 1. Overview

**Nama produk**  
freelance_docs – website yang bantu freelancer bikin 4 dokumen wajib project: quotation, timeline, BAST, kontrak secara cepat dan rapi.

**Tujuan utama**  
- Bikin proses dokumentasi project freelance jadi sederhana, terstruktur, dan kelihatan profesional di mata klien.  
- Ngurangin risiko miskomunikasi (scope, deadline, pembayaran) karena semua hal penting selalu tertulis di dokumen. [odoo](https://www.odoo.com/id_ID/blog/business-hacks-1/apa-itu-quotation-contoh-dan-cara-buat-dengan-mudah-1734)

**Scope versi awal (MVP)**  
- Web app (desktop‑first, mobile‑friendly).  
- 4 generator dokumen: Quotation, Timeline, BAST, Kontrak.  
- Output: view di layar + opsi copy/paste; PDF export bisa ditandai sebagai next phase (bukan P0). [ungrammary](https://www.ungrammary.com/post/guide-to-create-saas-prd)

***

## 2. Target user & persona

**Persona 1 – Freelancer pemula kreatif**  
- Usia 18–30, kerja sebagai desain, social media, content, UI/UX, web dev.  
- Masalah: belum punya template dokumen, bingung nulis quotation & kontrak, sering project berantakan.  
- Kebutuhan UX: simple, bahasa Indonesia santai, minim istilah legal, step‑by‑step jelas. [monday](https://monday.com/blog/project-management/project-management-for-freelancers/)

**Persona 2 – Freelancer semi‑pro**  
- Sudah beberapa kali handle klien, punya basic template tapi berantakan.  
- Kebutuhan UX: bisa bikin dokumen lebih rapi & konsisten, bisa reuse data, bisa menyesuaikan detail kontrak dan timeline. [monday](https://monday.com/blog/project-management/project-management-for-freelancers/)

***

## 3. User goals & key journeys

**Goal utama user**  
“Dalam waktu kurang dari 10 menit, user bisa bikin dokumen project yang layak dikirim ke klien tanpa harus ngerti bahasa legal.”

**User journey inti (MVP)**  
1. User masuk ke freelance_docs (landing / home).  
2. User pilih jenis dokumen (Quotation, Timeline, BAST, Kontrak).  
3. User isi form sederhana (field inti saja).  
4. Website generate tampilan dokumen dengan format rapi.  
5. User review, edit ringan, lalu copy teks atau simpan (PDF export nanti). [productschool](https://productschool.com/blog/product-strategy/product-template-requirements-document-prd)

***

## 4. Information architecture & pages

**Halaman utama (P0)**  
- Home / Dashboard sederhana  
  - Header: logo “freelance_docs”, navbar minimal (Dokumen, Tentang, Bantuan).  
  - Hero section: copy singkat tentang “4 dokumen wajib project freelance”.  
  - 4 kartu fitur: Quotation, Timeline, BAST, Kontrak (masing‑masing ada icon + deskripsi pendek).  

- Halaman generator per dokumen  
  - Quotation Generator  
  - Timeline Generator  
  - BAST Generator  
  - Kontrak Generator  

- Halaman Bantuan / FAQ pendek (boleh P1, bisa semi static). [altexsoft](https://www.altexsoft.com/blog/product-requirements-document/)

**Struktur navigasi (UX)**  
- Top navigation sederhana: Home | Dokumen | Bantuan.  
- Dari Home user bisa klik “Mulai Quotation”, “Mulai Timeline”, dll.  
- Breadcrumb minimal di tiap halaman dokumen (misal: Home / Quotation). [miro](https://miro.com/product-development/what-is-a-prd/)

***

## 5. UX requirements per fitur (MVP)

### 5.1 Quotation Generator (P0)

**Tujuan UX**  
- Bikin user bisa bikin penawaran project yang jelas (klien, scope, harga, syarat pembayaran) dengan form linear. [ukirama](https://ukirama.com/blogs/langkah-langkah-membuat-quotation-yang-profesional-untuk-usaha-kecil-di-indonesia)

**Input utama**  
- Data klien: Nama klien, perusahaan (optional), email.  
- Data project: Nama project, deskripsi singkat, tanggal penawaran, masa berlaku.  
- Item pekerjaan: bisa ada beberapa baris (nama layanan, deskripsi, harga).  
- Pembayaran: total, DP (% atau nominal), termin, metode pembayaran.  

**UI pattern**  
- Form multi‑section, satu halaman:  
  - Section 1: Info klien & project.  
  - Section 2: Item pekerjaan (dengan tombol “Tambah baris”).  
  - Section 3: Ringkasan & pembayaran.  
- Button utama: “Generate Quotation”.  
- Setelah klik, dokumen tampil di panel kanan / halaman baru dengan format mirip surat penawaran. [altexsoft](https://www.altexsoft.com/blog/product-requirements-document/)

**Output view**  
- Layout dokumen seperti surat penawaran: header (data klien), body (deskripsi dan tabel harga), footer (syarat pembayaran & tanda tangan).  
- Tombol: “Copy teks”, “Download sebagai .docx” (bisa P1). [odoo](https://www.odoo.com/id_ID/blog/business-hacks-1/apa-itu-quotation-contoh-dan-cara-buat-dengan-mudah-1734)

***

### 5.2 Timeline Generator (P0)

**Tujuan UX**  
- Bantu user memecah project jadi beberapa fase dengan tanggal, supaya dia dan klien punya ekspektasi jelas. [hashmicro](https://www.hashmicro.com/id/blog/7-langkah-pembuatan-project-timeline-beserta-contohnya/)

**Input utama**  
- Info project: nama project, start date, end date (opsional).  
- Fase kerja: nama fase, deskripsi singkat, tanggal mulai, tanggal selesai, status default “Belum mulai”.  
- Opsional: jumlah revisi per fase.  

**UI pattern**  
- Form dengan repeatable list “Fase”: table / card list dengan tombol “Tambah fase”.  
- Tampilan hasil:  
  - View linear (list fase + tanggal).  
  - Versi timeline horizontal sederhana (bisa P1 untuk visual). [weefer.co](https://www.weefer.co.id/id/blog/contoh-timeline-project/)

**Output view**  
- Teks terstruktur:  
  - “Week 1 – Research & Brief, tanggal XX–XX”  
  - “Week 2 – Design Draft”  
- Fokus: mudah dibaca klien, bisa di‑copy ke email / WhatsApp / Notion. [hashmicro](https://www.hashmicro.com/id/blog/7-langkah-pembuatan-project-timeline-beserta-contohnya/)

***

### 5.3 BAST Generator (P0)

**Tujuan UX**  
- Memudahkan user bikin dokumen berita acara serah terima yang resminya cukup untuk bukti pekerjaan sudah selesai. [id.scribd](https://id.scribd.com/document/888499171/BAST-UIUX-Design-Freelance)

**Input utama**  
- Info pihak: nama freelancer, nama klien / perusahaan, jabatan (opsional).  
- Info project: nama pekerjaan, nomor project (opsional), tanggal selesai.  
- Detail serah terima: jenis deliverable (file desain, website, campaign, dll.), jumlah, catatan.  

**UI pattern**  
- Form single page dengan beberapa field wajib.  
- Tombol: “Generate BAST”.  

**Output view**  
- Format BAST standar:  
  - Judul “Berita Acara Serah Terima Pekerjaan”.  
  - Paragraf identitas pihak.  
  - Paragraf pernyataan serah terima.  
  - Tabel/daftar deliverable.  
  - Tanda tangan dua pihak (space di bawah). [sialim.radenfatah.ac](http://sialim.radenfatah.ac.id/download/VH3Nt)

***

### 5.4 Kontrak / Surat Perjanjian (P0)

**Tujuan UX**  
- Bantu user punya kontrak dasar yang mencakup pihak, ruang lingkup kerja, durasi, pembayaran, dan hal penting seperti revisi dan hak cipta. [gadjian](https://www.gadjian.com/blog/2025/08/11/contoh-kontrak-kerja-freelance/)

**Input utama (disederhanakan)**  
- Pihak: data freelancer (nama, alamat opsional), data klien / perusahaan.  
- Scope pekerjaan: deskripsi pekerjaan / layanan.  
- Durasi kerja: tanggal mulai, tanggal selesai / atau “selesai project”.  
- Pembayaran: nilai, skema (DP, pelunasan), metode bayar.  
- Klausul utama (checklist): jumlah revisi, hak penggunaan karya, kewajiban kerahasiaan.  

**UI pattern**  
- Form dengan beberapa section: Pihak, Scope, Durasi, Pembayaran, Klausul.  
- Bisa pakai toggle sederhana untuk hal‑hal seperti “Include klausul kerahasiaan?” atau “Include klausul hak cipta?”.  

**Output view**  
- Format surat perjanjian kerja lepas:  
  - Pembukaan.  
  - Pasal‑pasal bernomor (Pasal 1: Ruang Lingkup, Pasal 2: Jangka Waktu, Pasal 3: Pembayaran, dll.).  
  - Penutup + tanda tangan. [abhitech.co](https://www.abhitech.co.id/blog/recruitment/surat-perjanjian-kerja-lepas-freelance-penjelasan-keuntungan-konsekuensi-dan-4-contohnya/)

***

## 6. Visual design & tone (UI)

**Desain visual (arah awal)**  
- Warna utama: biru / ungu soft (kesan profesional tapi friendly).  
- Typography: sans‑serif simpel untuk keterbacaan (misal Inter / Poppins).  
- Layout: banyak whitespace, card‑based untuk pilihan dokumen, form tertata dengan label jelas. [ungrammary](https://www.ungrammary.com/post/guide-to-create-saas-prd)

**Tone & language**  
- Bahasa Indonesia santai tapi sopan, contoh:  
  - “Yuk mulai dari quotation dulu.”  
  - “Tambahkan fase kerja biar timeline kamu makin jelas.”  
- Hindari istilah legal berat; pakai istilah umum dan tooltip kecil kalau perlu. [fintalent](https://fintalent.com/blog/how-to-name-your-freelance-business/)

***

## 7. Prioritas fitur (UI/UX)

- P0 (wajib di versi pertama):  
  - Home dengan hero + 4 kartu dokumen.  
  - Form generator untuk Quotation, Timeline, BAST, Kontrak.  
  - Tampilan dokumen hasil dengan tombol “Copy”.  

- P1 (value tambahan):  
  - Simpan dokumen sebagai draft (akun / session).  
  - Export ke PDF / DOCX.  
  - Bantuan / FAQ lebih lengkap.  

- P2 (nice to have):  
  - Visual timeline (gantt sederhana).  
  - Tema/branding custom di dokumen (logo user).  
  - Multi bahasa. [productschool](https://productschool.com/blog/product-strategy/product-template-requirements-document-prd)

***

## 8. Non‑goals (buat batasan UI/UX awal)

- Belum fokus ke manajemen tugas / to‑do list per fase project (itu next product / modul lain).  
- Belum ada e‑signature / tanda tangan digital.  
- Belum ada kolaborasi multi‑user dalam satu dokumen. [ungrammary](https://www.ungrammary.com/post/guide-to-create-saas-prd)

***
